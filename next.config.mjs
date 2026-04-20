/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
