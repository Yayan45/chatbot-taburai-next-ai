/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*", // semua request ke /api
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // atau ganti sesuai IP kamu
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
