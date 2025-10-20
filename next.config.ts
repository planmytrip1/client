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

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['amanatoursandtravels.com'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'amanatoursandtravels.com',
//         pathname: '/api/images/**', // port remove kore dilam
//       },
//     ],
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'https://amanatoursandtravels.com/api/:path*',
//       },
//     ];
//   },
// };

export default nextConfig;

