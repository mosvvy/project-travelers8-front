import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [{ hostname: 'ftp.goit.study' }, { hostname: 'res.cloudinary.com' }],
  },
};

export default nextConfig;
