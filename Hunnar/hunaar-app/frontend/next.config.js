/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use 'export' for GitHub Pages, 'standalone' for other deployments
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : 'standalone',
  
  // Required for GitHub Pages
  trailingSlash: process.env.GITHUB_PAGES === 'true',
  basePath: process.env.GITHUB_PAGES === 'true' ? '/hunaar-app' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/hunaar-app/' : '',
  
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  images: {
    domains: ['images.unsplash.com', 'api.dicebear.com'],
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    // Skip rewrites for static export (GitHub Pages)
    if (process.env.GITHUB_PAGES === 'true') {
      return [];
    }
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
      }
    ];
  }
};

module.exports = nextConfig;