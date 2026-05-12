const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Tree-shake only imported symbols — reduces bundle of gsap and framer-motion
    optimizePackageImports: ['gsap', 'framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
