import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // 권장 옵션
  compiler: {
    styledComponents: true, // ✅ styled-components SSR 활성화
  },
  // API/업로드/OAuth2 프록시 (동일 오리진처럼 사용)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:9999/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://127.0.0.1:9999/uploads/:path*",
      },
      {
        source: "/oauth2/:path*",
        destination: "http://127.0.0.1:9999/oauth2/:path*",
      },
      {
        source: "/login/oauth2/:path*",
        destination: "http://127.0.0.1:9999/login/oauth2/:path*",
      },
    ];
  },
};

export default nextConfig;
