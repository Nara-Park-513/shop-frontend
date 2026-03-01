"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_BASE = "/api";

export default function KakaoSuccessPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const [msg, setMsg] = useState("결제 승인 처리 중...");

  useEffect(() => {
    const pg_token = sp.get("pg_token");
    const orderId = sp.get("orderId"); // 우리가 successUrl에 같이 붙여줄 값

    if (!pg_token || !orderId) {
      setMsg("필수 값이 없습니다. (pg_token/orderId)");
      return;
    }

    (async () => {
      const res = await fetch(`${API_BASE}/payments/kakaopay/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ orderId, pg_token }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        setMsg(`결제 승인 실패\n${t}`);
        return;
      }

      // 승인 성공
      setMsg("결제 완료! 주문 내역으로 이동합니다...");
      // 장바구니 비우기(원하면)
      localStorage.removeItem("cart");
      setTimeout(() => router.replace("/orders"), 800);
    })();
  }, [sp, router]);

  return (
    <div style={{ padding: 24 }}>
      <h2>카카오페이 결제</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{msg}</pre>
    </div>
  );
}