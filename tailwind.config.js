/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { extend: { colors: { gray: Object.fromEntries(
    [100, 200, 300, 400, 500, 600, 700, 800].map(shade =>
      [shade, `rgb(var(--gray-${shade}) / <alpha-value>)`])
  ) } } },
  plugins: [],
};
