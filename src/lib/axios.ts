import axios from "axios";

const api = axios.create({
  // ✅ Next.js rewrites로 /api 를 백엔드로 프록시 (next.config.ts)
  baseURL: "",
  withCredentials: true, // ⭐ 세션 쿠키 필수
});

export default api;
