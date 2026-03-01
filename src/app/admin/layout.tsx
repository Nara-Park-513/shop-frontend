"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // ✅ 너희 프로젝트가 localStorage로 로그인 판단하는 방식이라면 이걸로 충분
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    // 로그인 판별: 너가 쓰는 키로 맞춰줘 (예: "user" or "token")
    const user = localStorage.getItem("user");
    setIsLogin(!!user);
  }, []);

  useEffect(() => {
    if (isLogin === null) return; // 로딩 중
    if (isLogin === false) {
      router.replace("/login?next=" + encodeURIComponent(pathname ?? "/admin"));
    }
  }, [isLogin, router, pathname]);

  // ✅ 로딩 중에는 admin 화면을 잠깐이라도 보여주지 않게 막음
  if (isLogin === null) {
    return <div style={{ padding: 24 }}>로딩중…</div>;
  }

  // 여기까지 왔다는 건 로그인 true
  return <>{children}</>;
}