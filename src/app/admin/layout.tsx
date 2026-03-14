"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  // ✅ 개발환경이면 그냥 통과
  if (process.env.NODE_ENV === "development") {
    return <>{children}</>;
  }

  useEffect(() => {
    const token = localStorage.getItem("token"); // 너희 키로 수정
    setIsLogin(!!token);
  }, []);

  useEffect(() => {
    if (isLogin === null) return;
    if (!isLogin) router.replace("/login?next=" + encodeURIComponent(pathname ?? "/admin"));
  }, [isLogin, router, pathname]);

  if (isLogin === null) return <div style={{ padding: 24 }}>로딩중…</div>;
  return <>{children}</>;
}