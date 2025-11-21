/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'meraki-green': '#C9F2B4',
        'meraki-blue': '#B7E3FF',
        'meraki-yellow': '#FFE9A7',
        'meraki-pink': '#FFBEDD',
        'meraki-cream': '#FFF9F2',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};




                                                                                    
                              

