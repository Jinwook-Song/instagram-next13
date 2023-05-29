/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      keyframes: {
        fadeIn: {
          '0%': {
            transform: 'translateY(10%)',
            opacity: '0%',
          },
          '95%': {
            transform: 'translateY(-0.5%)',
            opacity: '100%',
          },
          '100%': {
            transform: 'translateY(0%)',
          },
        },
      },

      animation: {
        fadeIn: 'fadeIn 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
