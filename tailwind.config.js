module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        twitter: '#1d9bf0',
        trueDark: '#121212'
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },

      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0,100%,0)'
          },
          '100%': {
            opacity: 1,
            transform: 'none',
        
          },
        },
        'fade-out-down': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
            transform: 'translate3d(0,100%,0)'
          },
        },
        'fade': {
          '0%': {
            opacity: 0
          },
          '100%': {
            opacity: 1
          }
        },
      },
      animation: {
        'fade-out-down': 'fade-out-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      }
    },
  },
  variants: {
    extend: {
      display: ['dark'],
      transitionProperty: ['hover'],
      transitionDuration: ['hover'],
    },
  },
}
