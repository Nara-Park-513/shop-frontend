"use client";
import Link from "next/link";

export default function KakaoCancelPage() {
  return (
    <div style={{ padding: 24 }}>
      <h2>결제가 취소되었습니다.</h2>
      <Link href="/order">주문 화면으로 돌아가기</Link>
    </div>
  );
}