/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPTIMIZELY_CMS_URL: process.env.OPTIMIZELY_CMS_URL,
    GRAPH_SINGLE_KEY: process.env.GRAPH_SINGLE_KEY,
  },
  images: {
      remotePatterns: []
  }
};

// Add the configured Optimizely CMS URL to the image domains
const optimizelyCmsUrl = process.env.OPTIMIZELY_CMS_URL
if (optimizelyCmsUrl) {
    const optimizelyCmsHost = new URL(optimizelyCmsUrl)

    nextConfig.images.remotePatterns.push({
        protocol: optimizelyCmsHost.protocol.replace(":",""),
        hostname: optimizelyCmsHost.hostname,
        port: optimizelyCmsHost.port,
        pathname: (optimizelyCmsHost.pathname || '/') + '**'
    })
}

export default nextConfig;
