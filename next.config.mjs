/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['192.168.68.54'],
  // the deck lived at /work briefly; send that URL home
  async redirects() {
    return [{ source: '/work', destination: '/', permanent: true }];
  },
};

export default nextConfig;
