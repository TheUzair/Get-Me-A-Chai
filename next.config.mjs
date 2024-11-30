/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**', // Allow all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 'c10.patreonusercontent.com',
        pathname: '/4/patreon-media/p/**', // Allow paths for Patreon media
      },
    ],
  },
};

export default nextConfig;
