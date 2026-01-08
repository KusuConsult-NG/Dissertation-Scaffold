/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable static optimization for dashboard routes to prevent manifest issues
    experimental: {
        optimizePackageImports: ['lucide-react', 'next-auth'],
    },
    // Ensure proper client/server boundaries
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
            };
        }
        return config;
    },
};

export default nextConfig;
