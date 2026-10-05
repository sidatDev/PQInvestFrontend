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
      {
        protocol: 'https',
        hostname: 'minio-s3-bucket-staging-api.srv130826.sidat.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
