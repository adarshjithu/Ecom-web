// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        tab: '1125px',
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  future: {},
  experimental: {},

  // 👇 add this to disable oklch/lab
  safelist: [],
  plugins: [],
}
