/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // "About Us" ka koi alag page nahi hai - breadcrumbs/menu ka "about-us" link pehle page par bheje
      {
        source: '/about-us',
        destination: '/about-us/the-company',
        permanent: false,
      },
    ];
  },
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
