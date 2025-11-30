/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // ============================================
      // FONTES MASTERCLASS
      // ============================================
      fontFamily: {
        'mc': ['Sohne', 'Helvetica', 'Arial', 'sans-serif'],
        'display': ['Sohne', 'Helvetica', 'Arial', 'sans-serif'],
        'heading': ['Sohne', 'Helvetica', 'Arial', 'sans-serif'],
        'body': ['Sohne', 'Helvetica', 'Arial', 'sans-serif'],
        'sans': ['Sohne', 'Helvetica', 'Arial', 'sans-serif'],
        'logo': ['Playfair Display', 'EB Garamond', 'Libre Baskerville', 'Times New Roman', 'Times', 'Georgia', 'serif'],
        'serif': ['Playfair Display', 'EB Garamond', 'Libre Baskerville', 'Times New Roman', 'Times', 'Georgia', 'serif'],
      },
      
      // ============================================
      // CORES MASTERCLASS
      // ============================================
      colors: {
        // Cores primárias
        'mc-black': '#000000',
        'mc-white': '#FFFFFF',
        'mc-red': '#DC2626',
        
        // Cores neutras (grayscale)
        'mc-gray': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
        
        // Cores de texto
        'mc-text': {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.8)',
          tertiary: 'rgba(255, 255, 255, 0.6)',
          disabled: 'rgba(255, 255, 255, 0.4)',
        },
        
        // Cores de background
        'mc-bg': {
          primary: '#000000',
          secondary: '#171717',
          tertiary: '#262626',
        },
        
        // Cores de botões
        'mc-button': {
          'primary-bg': '#DC2626',
          'primary-hover': '#B91C1C',
          'primary-text': '#FFFFFF',
          'secondary-bg': 'transparent',
          'secondary-border': '#FFFFFF',
          'secondary-hover': '#FFFFFF',
          'secondary-text': '#FFFFFF',
          'secondary-text-hover': '#000000',
        },
        
        // Compatibilidade com nomes antigos
        'premium-black': '#000000',
        'premium-white': '#FFFFFF',
        'premium-gray': '#171717',
      },
      
      // ============================================
      // TAMANHOS DE FONTE MASTERCLASS
      // ============================================
      fontSize: {
        'mc-xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],      // 12px
        'mc-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],    // 14px
        'mc-base': ['1rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],      // 16px
        'mc-lg': ['1.125rem', { lineHeight: '1.3', letterSpacing: '0.03em' }],  // 18px
        'mc-xl': ['1.5rem', { lineHeight: '1.2', letterSpacing: '0.04em' }],      // 24px
        'mc-2xl': ['1.75rem', { lineHeight: '1.2', letterSpacing: '0.04em' }],  // 28px
        'mc-3xl': ['2rem', { lineHeight: '1.1', letterSpacing: '0.05em' }],      // 32px
        'mc-4xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '0.05em' }],   // 36px
        'mc-5xl': ['3rem', { lineHeight: '1.05', letterSpacing: '0.05em' }],     // 48px
        'mc-6xl': ['4rem', { lineHeight: '1.05', letterSpacing: '0.05em' }],     // 64px
      },
      
      // ============================================
      // PESOS DE FONTE
      // ============================================
      fontWeight: {
        'mc-regular': '400',
        'mc-medium': '500',
        'mc-semibold': '600',
        'mc-bold': '700',
      },
      
      // ============================================
      // ESPAÇAMENTOS MASTERCLASS
      // Baseado em múltiplos de 4px
      // ============================================
      spacing: {
        'mc-1': '0.25rem',   // 4px
        'mc-2': '0.5rem',    // 8px
        'mc-3': '0.75rem',   // 12px
        'mc-4': '1rem',      // 16px
        'mc-5': '1.25rem',   // 20px
        'mc-6': '1.5rem',    // 24px
        'mc-8': '2rem',      // 32px
        'mc-10': '2.5rem',   // 40px
        'mc-12': '3rem',     // 48px
        'mc-16': '4rem',     // 64px
        'mc-20': '5rem',     // 80px
        'mc-24': '6rem',     // 96px
      },
      
      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        'mc-sm': '0.25rem',   // 4px
        'mc-md': '0.5rem',    // 8px
        'mc-lg': '0.75rem',   // 12px
        'mc-xl': '1rem',      // 16px
        'mc-full': '9999px',
      },
      
      // ============================================
      // SHADOWS MASTERCLASS
      // ============================================
      boxShadow: {
        'mc-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'mc-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'mc-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
        'mc-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        'mc-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      },
      
      // ============================================
      // TRANSITIONS
      // ============================================
      transitionDuration: {
        'mc-fast': '150ms',
        'mc-base': '200ms',
        'mc-slow': '300ms',
        'mc-slower': '500ms',
      },
    },
  },
  plugins: [],
}

