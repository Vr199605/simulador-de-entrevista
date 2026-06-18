/** @type {import('next').NextConfig} */
const nextConfig = {
  // Carregamos as fontes via <link> no layout; não dependemos do fetch em build-time.
  optimizeFonts: false,
};
export default nextConfig;
