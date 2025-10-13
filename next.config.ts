/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5005',
        pathname: '/api/images/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5005/api/:path*',
      },
    ];
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['admin.amanatoursandtravels.com'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'admin.amanatoursandtravels.com',
//         port: 443,  // HTTPS e port lagbe na
//         pathname: '/api/images/**',
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://admin.amanatoursandtravels.com/api/:path*',
//       },
//     ];
//   },
// };

// export default nextConfig;
