import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { URL } from 'node:url';

function loadEnvFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const lines = raw.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      // strip optional surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // ignore missing/unreadable file
  }
}

// Load local env files for development (already gitignored by default .gitignore).
const cwd = process.cwd();
loadEnvFile(path.join(cwd, '.env.local'));
loadEnvFile(path.join(cwd, '.env'));
// Fallback names (some environments block writing .env* files)
loadEnvFile(path.join(cwd, 'openai.env.local'));
loadEnvFile(path.join(cwd, 'openai.env'));

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      // basic protection against huge payloads
      if (data.length > 1_000_000) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function setCors(res) {
  // For local dev. If you deploy this, restrict the Origin.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

function extractOutputText(openAiResponse) {
  // Responses API usually exposes output_text; keep fallbacks.
  if (typeof openAiResponse?.output_text === 'string') return openAiResponse.output_text;
  const output = openAiResponse?.output;
  if (Array.isArray(output)) {
    for (const item of output) {
      const content = item?.content;
      if (Array.isArray(content)) {
        for (const c of content) {
          if (typeof c?.text === 'string') return c.text;
          if (typeof c?.content === 'string') return c.content;
        }
      }
    }
  }
  return '';
}

function postJson(urlString, { headers = {}, bodyObj } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const body = JSON.stringify(bodyObj ?? {});

    const req = https.request(
      {
        method: 'POST',
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
          ...headers,
        },
      },
      (res) => {
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          let json = {};
          try {
            json = data ? JSON.parse(data) : {};
          } catch {
            json = { raw: data };
          }
          resolve({ status: res.statusCode || 0, json });
        });
      }
    );

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function callOpenAiSearch({ query, catalog, limit }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    const err = new Error('OPENAI_API_KEY is not set');
    err.statusCode = 500;
    throw err;
  }

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const maxResults = Math.min(Math.max(Number(limit || 8), 1), 20);

  const system = [
    'Você é um motor de busca de mentorias gravadas (catálogo fechado).',
    'Regras IMPORTANTES:',
    '- Retorne APENAS JSON válido, sem markdown e sem texto extra.',
    '- Selecione somente IDs existentes no catálogo fornecido.',
    '- Priorize itens diretamente relevantes ao pedido do usuário.',
    '- Se a consulta for vaga, ainda assim retorne até ' + maxResults + ' opções úteis.',
  ].join('\n');

  const user = [
    `Consulta do usuário: "${query}"`,
    '',
    'Catálogo (JSON):',
    JSON.stringify(catalog),
  ].join('\n');

  const jsonSchema = {
    name: 'MentoriaSearchResponse',
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        query: { type: 'string' },
        results: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              id: { type: 'string' },
              score: { type: 'number', minimum: 0, maximum: 100 },
              reason: { type: 'string' },
            },
            required: ['id', 'score', 'reason'],
          },
        },
      },
      required: ['query', 'results'],
    },
    strict: true,
  };

  const payload = {
    model,
    input: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: jsonSchema.name,
        schema: jsonSchema.schema,
        strict: jsonSchema.strict,
      },
    },
  };

  const { status, json: data } = await postJson('https://api.openai.com/v1/responses', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    bodyObj: payload,
  });

  if (status < 200 || status >= 300) {
    const err = new Error(data?.error?.message || `OpenAI error (${status})`);
    err.statusCode = 502;
    err.openai = data;
    throw err;
  }

  const text = extractOutputText(data);
  if (!text) {
    const err = new Error('OpenAI response had no output text');
    err.statusCode = 502;
    err.openai = data;
    throw err;
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    const err = new Error('OpenAI returned non-JSON output');
    err.statusCode = 502;
    err.openai = { output_text: text };
    throw err;
  }

  // Clamp + ensure limit on the server.
  if (Array.isArray(parsed?.results)) {
    parsed.results = parsed.results.slice(0, maxResults);
  }

  return parsed;
}

const port = Number(process.env.PORT || 8788);

const server = http.createServer(async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.url === '/api/openai/search' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      const query = String(body?.query || '').trim();
      const catalog = Array.isArray(body?.catalog) ? body.catalog : [];
      const limit = body?.limit;

      if (!query) {
        sendJson(res, 400, { ok: false, error: 'Missing query' });
        return;
      }
      if (!Array.isArray(catalog) || catalog.length === 0) {
        sendJson(res, 400, { ok: false, error: 'Missing catalog' });
        return;
      }

      const result = await callOpenAiSearch({ query, catalog, limit });
      sendJson(res, 200, { ok: true, ...result });
    } catch (e) {
      const debug = process.env.OPENAI_PROXY_DEBUG === '1';
      sendJson(res, e?.statusCode || 500, {
        ok: false,
        error: e?.message || 'Unknown error',
        details: debug
          ? { openai: e?.openai, stack: e?.stack }
          : e?.openai,
      });
    }
    return;
  }

  sendJson(res, 404, { ok: false, error: 'Not found' });
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[openai-proxy] listening on http://127.0.0.1:${port}`);
});


