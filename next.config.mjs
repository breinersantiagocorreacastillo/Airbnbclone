/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iycgnukuhhxmpzdtllnj.supabase.co',
        pathname: '/storage/v1/object/public/property-images/**',
      },
    ],
  },
};

export default nextConfig;
