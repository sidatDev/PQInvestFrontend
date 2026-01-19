/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pqinvest-backend.sidattech.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'pqi-bucket.sidattech.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
