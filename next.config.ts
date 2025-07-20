import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'example.com',
      'localhost',              // ✅ صحيح
      'th.bing.com',
      'res.cloudinary.com',     // ✅ هذا هو المطلوب
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
