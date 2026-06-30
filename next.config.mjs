/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Single canonical convention: no trailing slash (Next 301s "/path/" → "/path").
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 301 legacy URLs that no longer have a 1:1 page so they don't 404.
  async redirects() {
    return [
      { source: "/style-guide", destination: "/", permanent: true },
      { source: "/thank-you", destination: "/book-appointment", permanent: true },
      // Legacy URL scheme → new routes (preserve ranking equity).
      { source: "/contact-us", destination: "/book-appointment", permanent: true },
      { source: "/contact", destination: "/book-appointment", permanent: true },
      { source: "/about/:slug", destination: "/about-us/meet-the-team", permanent: true },
      { source: "/canadian-care-dental-plan", destination: "/new-patient", permanent: true },
    ];
  },
};

export default nextConfig;
