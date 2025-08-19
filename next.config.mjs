/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Example existing option
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if some profile pics are on http, though unlikely
        hostname: 'lh3.googleusercontent.com',
        port: '', // Usually empty for default ports (80 or 443)
        pathname: '/**', // Allows any path under this hostname. You can be more specific if needed.
                        // Example: '/a/**' or '/a-/AAuE7m...' if you see a common pattern
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      // Add others if needed
    ],
  },
  // Add other configurations here if necessary
};

// Use export default for .mjs files
export default nextConfig;