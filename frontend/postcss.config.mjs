// postcss.config.mjs
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const tailwindcssPostcss = require('@tailwindcss/postcss')

export default {
  plugins: {
    '@tailwindcss/postcss': {
      content: [
        './src/app/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    },
  },
}