import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // SSR 환경에서 styled-components 클래스 불일치를 해결합니다.
    styledComponents: true,
  },
};

export default nextConfig