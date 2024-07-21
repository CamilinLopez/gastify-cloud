/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://localhost:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
