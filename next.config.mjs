/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com",'lh3.googleusercontent.com'], // Allows Firebase-hosted images
  },
};

export default nextConfig;
