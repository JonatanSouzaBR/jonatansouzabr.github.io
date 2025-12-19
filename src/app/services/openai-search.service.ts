import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MentoriaCatalogItem {
  id: string;
  title: string;
  mentor: string;
  tagline?: string;
  maturity?: string;
  duration?: string;
  genres?: string[];
  tags?: string[];
}

export interface OpenAiSearchResultItem {
  id: string;
  score: number;
  reason: string;
}

export interface OpenAiSearchResponse {
  ok: boolean;
  query?: string;
  results?: OpenAiSearchResultItem[];
  error?: string;
  details?: any;
}

@Injectable({ providedIn: 'root' })
export class OpenAiSearchService {
  constructor(private http: HttpClient) {}

  searchMentorias(params: {
    query: string;
    catalog: MentoriaCatalogItem[];
    limit?: number;
  }): Observable<OpenAiSearchResponse> {
    const base = (environment.openAiProxyBaseUrl || '').replace(/\/+$/, '');
    const url = `${base}/api/openai/search`;
    return this.http.post<OpenAiSearchResponse>(url, params);
  }
}


