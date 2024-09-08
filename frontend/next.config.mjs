/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://54.160.156.69:3001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
