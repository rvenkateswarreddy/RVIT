/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"], // Allows Firebase-hosted images
  },
};

export default nextConfig;
