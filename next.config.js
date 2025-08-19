/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve server-side modules on the client-side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        http2: false,
        child_process: false,
        dns: false,
        os: false,
        path: false,
        stream: false,
        util: false,
        zlib: false,
      };
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin'],
  },
  // Added image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;