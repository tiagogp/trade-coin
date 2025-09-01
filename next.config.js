/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'coin-images.coingecko.com' },
    ],
  },
  reactStrictMode: true,
}
