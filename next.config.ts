import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_ADMIN_EMAIL: process.env.AUTH_ADMIN_EMAIL,
    AUTH_ADMIN_PASSWORD: process.env.AUTH_ADMIN_PASSWORD,
  },
};

export default nextConfig;