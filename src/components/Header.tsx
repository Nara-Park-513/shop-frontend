"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/include/header.css";

const API_BASE = "http://localhost:9999/api";

const MEGA_CLOSE_DELAY = 150;

type MenuItem = {
  name: string;
  href: string;
  mega?: boolean;
};

const DEFAULT_MENUS: MenuItem[] = [
  { name: "주문 채널", href: "/order", mega: true },
  { name: "ERP", href: "/erp", mega: true },
  { name: "MES", href: "/mes", mega: true },
  { name: "시스템 연계", href: "/integration", mega: true },
  { name: "고객지원", href: "/support", mega: true },
  { name: "문의하기", href: "/contact", mega: true },
];

const menuLinkStyle: React.CSSProperties = {
  textDecoration: "none",
  color: "#111827",
  fontSize: "15px",
  fontWeight: 500,
};

const iconStyle = { width: 18, height: 18, display: "block" };

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [hoveredMega, setHoveredMega] = useState<string | null>(null);
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const [searchQuery, setSearchQuery] = useState("");
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const openMega = (menuName: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHoveredMega(menuName);
  };

  const closeMega = () => {
    closeTimerRef.current = setTimeout(() => setHoveredMega(null), MEGA_CLOSE_DELAY);
  };

  const cancelClose = (menuName: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setHoveredMega(menuName);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
        setIsLogin(res.ok);
      } catch {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsLogin(false);
      router.push("/");
    } catch (err) {
      console.error("logout error:", err);
    }
  };

  if (isLogin === null) return null;

  return (
    <header
      className="site-header"
      style={{
        position: "relative",
        zIndex: 1000,
        height: "64px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          padding: "0 12px 0 40px",
          color: "#111827",
        }}
      >
{/* 로고 */}
<div style={{ flexShrink: 0 }}>
  <Link
    href="/"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      textDecoration: "none",
      color: "#111827",
    }}
  >
    <Image
      src="/img/daon-d.png"
      alt="DAON"
      width={30}
      height={28}
      priority
    />
    <span style={{ fontWeight: 700, fontSize: "20px" }}>
      DAON
    </span>
  </Link>
</div>

        {/* 네비게이션 메뉴 */}
        <nav
          className="header-nav"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            gap: "28px",
          }}
        >
          {DEFAULT_MENUS.map((menu) => (
            <div
              key={menu.name}
              style={{ position: "relative" }}
              onMouseEnter={() => menu.mega && openMega(menu.name)}
              onMouseLeave={() => menu.mega && closeMega()}
            >
              <Link href={menu.href} style={menuLinkStyle}>
                {menu.name}
              </Link>

              {menu.mega && hoveredMega === menu.name && (
                <div
                  className="mega-menu-dropdown"
                  onMouseEnter={() => cancelClose(menu.name)}
                  onMouseLeave={closeMega}
                  style={{
                    position: "fixed",
                    top: "64px",
                    left: 0,
                    right: 0,
                    width: "100%",
                    zIndex: 1000,
                    background: "#fff",
                    padding: "40px 80px",
                    borderTop: "1px solid #e5e7eb",
                    opacity: 1,
                    pointerEvents: "auto",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="mega-menu-content" style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
                  {menu.name === "주문 채널" && (
                    <div className="mega-menu-grid">
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>제품 주문</h4>
                        <Link href="/order" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>상품 목록</Link>
                        <Link href="/order/detail" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>상품 상세</Link>
                        <Link href="/order/register" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 등록</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>주문 현황 조회</h4>
                        <Link href="/order/status" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 내역</Link>
                        <Link href="/order/status/state" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 상태</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>출하 상태 확인</h4>
                        <Link href="/order/shipping" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 요청</Link>
                        <Link href="/order/shipping/complete" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 완료</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>품절 안내</h4>
                        <Link href="/order/soldout" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>품절 상품 조회</Link>
                        <Link href="/order/soldout/restock" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>재입고 예정 안내</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>견적 요청 (B2B)</h4>
                        <Link href="/order/quote" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>견적 요청 등록</Link>
                        <Link href="/order/quote/response" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>견적 응답 확인</Link>
                      </div>
                    </div>
                  )}
                  {menu.name === "ERP" && (
                    <div className="mega-menu-grid">
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>상품 관리</h4>
                        <Link href="/erp/products/code" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>상품 코드</Link>
                        <Link href="/erp/products/name" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>상품명</Link>
                        <Link href="/erp/products/spec" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>규격 / 단위</Link>
                        <Link href="/erp/products/status" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>사용 여부</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>재고 관리</h4>
                        <Link href="/erp/inventory" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>현재 재고</Link>
                        <Link href="/erp/inventory/soldout" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>품절 상태 관리</Link>
                        <Link href="/erp/inventory/history" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>재고 변동 이력</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>주문 관리</h4>
                        <Link href="/erp/orders/receive" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 접수</Link>
                        <Link href="/erp/orders/status" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 상태</Link>
                        <Link href="/erp/orders/shipping" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 요청</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>기준 정보 관리</h4>
                        <Link href="/erp/master/partners" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>거래처</Link>
                        <Link href="/erp/master/items" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>품목</Link>
                        <Link href="/erp/master/prices" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>단가</Link>
                      </div>
                    </div>
                  )}
                  {menu.name === "MES" && (
                    <div className="mega-menu-grid">
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>생산 계획</h4>
                        <Link href="/mes/plan" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>생산 계획 수립</Link>
                        <Link href="/mes/plan/list" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>계획 조회</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>작업 지시</h4>
                        <Link href="/mes/work-order" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>작업 지시 등록</Link>
                        <Link href="/mes/work-order/list" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>작업 지시 목록</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>생산 실적</h4>
                        <Link href="/mes/result" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>실적 등록</Link>
                        <Link href="/mes/result/list" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>실적 조회</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>공정 상태</h4>
                        <Link href="/mes/process" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>공정 진행 현황</Link>
                        <Link href="/mes/process/control" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>공정 중단 / 완료</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>생산 완료 처리</h4>
                        <Link href="/mes/complete" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>생산 완료 등록</Link>
                        <Link href="/mes/complete/erp" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>ERP 재고 반영</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>품질 결과</h4>
                        <Link href="/mes/quality" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>양품 수량</Link>
                        <Link href="/mes/quality/defect" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>불량 수량</Link>
                        <Link href="/mes/quality/reason" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>불량 사유</Link>
                        <Link href="/mes/quality/result" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>생산 실적 귀속</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>품질 이상</h4>
                        <Link href="/mes/quality/issue" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>품질 이상 등록</Link>
                        <Link href="/mes/quality/issue/process" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>발생 공정</Link>
                        <Link href="/mes/quality/issue/time" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>발생 시점</Link>
                        <Link href="/mes/quality/issue/stop" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>공정 중단 여부</Link>
                      </div>
                    </div>
                  )}
                  {menu.name === "시스템 연계" && (
                    <div className="mega-menu-grid">
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>주문 ↔ ERP 연계</h4>
                        <Link href="/integration/order-erp/receive" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 데이터 수신</Link>
                        <Link href="/integration/order-erp/register" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>ERP 주문 등록</Link>
                        <Link href="/integration/order-erp/sync" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 상태 동기화</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>ERP ↔ MES 연계</h4>
                        <Link href="/integration/erp-mes/request" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>생산 요청 생성</Link>
                        <Link href="/integration/erp-mes/work-order" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>작업 지시 전달</Link>
                        <Link href="/integration/erp-mes/result" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>생산 실적 수신</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>재고 동기화</h4>
                        <Link href="/integration/inventory/realtime" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>실시간 재고 반영</Link>
                        <Link href="/integration/inventory/production" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>생산 완료 재고 증가</Link>
                        <Link href="/integration/inventory/shipping" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 처리 재고 차감</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>상태 흐름 관리</h4>
                        <Link href="/integration/status/order" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 상태 흐름</Link>
                        <Link href="/integration/status/production" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>생산 상태 흐름</Link>
                        <Link href="/integration/status/shipping" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 상태 흐름</Link>
                      </div>
                    </div>
                  )}
                  {menu.name === "고객지원" && (
                    <div className="mega-menu-grid">
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>공지사항</h4>
                        <Link href="/support/notice/system" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>시스템 공지</Link>
                        <Link href="/support/notice/shipping" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 일정 공지</Link>
                        <Link href="/support/notice/maintenance" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>점검 안내</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>자주 묻는 질문 (FAQ)</h4>
                        <Link href="/support/faq/order" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 관련</Link>
                        <Link href="/support/faq/inventory" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>재고 / 품절 관련</Link>
                        <Link href="/support/faq/shipping" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 / 배송 관련</Link>
                        <Link href="/support/faq/system" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>시스템 이용</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>주문 / 출하 문의</h4>
                        <Link href="/support/inquiry/order" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 상태 문의</Link>
                        <Link href="/support/inquiry/delay" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 지연 문의</Link>
                        <Link href="/support/inquiry/soldout" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>품절 문의</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>시스템 이용 안내</h4>
                        <Link href="/support/guide/order" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 채널 이용 가이드</Link>
                        <Link href="/support/guide/integration" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>ERP / MES 연계 개요</Link>
                        <Link href="/support/guide/error" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>오류 발생 시 조치 방법</Link>
                      </div>
                    </div>
                  )}
                  {menu.name === "문의하기" && (
                    <div className="mega-menu-grid">
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>일반 문의</h4>
                        <Link href="/contact/general" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>서비스 / 회사 관련 문의</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>주문 관련 문의</h4>
                        <Link href="/contact/order/status" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 상태 문의</Link>
                        <Link href="/contact/order/shipping" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>출하 / 배송 문의</Link>
                        <Link href="/contact/order/soldout" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>품절 문의</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>시스템 도입 문의</h4>
                        <Link href="/contact/system/erp" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>ERP 도입 문의</Link>
                        <Link href="/contact/system/mes" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>MES 도입 문의</Link>
                        <Link href="/contact/system/integration" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>시스템 연계 문의</Link>
                      </div>
                      <div style={{ minWidth: "160px", textAlign: "center" }}>
                        <h4 style={{ fontWeight: 700, marginBottom: "16px", fontSize: "15px" }}>오류 신고</h4>
                        <Link href="/contact/error/order" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>주문 오류</Link>
                        <Link href="/contact/error/inventory" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>재고 불일치</Link>
                        <Link href="/contact/error/system" style={{ ...menuLinkStyle, display: "block", marginBottom: "10px" }}>시스템 오류</Link>
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 우측: 유틸리티 + 버튼 */}
        <div className="header-btns" style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "16px", marginLeft: "24px" }}>
          {/* 검색창 */}
          <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색"
              style={{
                width: "220px",
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
          </form>
          {/* 언어 전환 */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px" }}>
            <button
              type="button"
              onClick={() => setLang("ko")}
              style={{
                padding: "4px 8px",
                border: "none",
                background: lang === "ko" ? "#111827" : "transparent",
                color: lang === "ko" ? "#fff" : "#6b7280",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "inherit",
              }}
            >
              KO
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              style={{
                padding: "4px 8px",
                border: "none",
                background: lang === "en" ? "#111827" : "transparent",
                color: lang === "en" ? "#fff" : "#6b7280",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "inherit",
              }}
            >
              EN
            </button>
          </div>
          {/* 장바구니 아이콘 */}
          <Link href="/cart" style={{ color: "#111827", padding: "4px" }} title="장바구니">
            <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Link>
          <div style={{ width: "1px", height: "20px", background: "#e5e7eb", flexShrink: 0 }} />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginLeft: "8px" }}>
          {isLogin ? (
            <>
              <Link
                href="/cart"
                style={{
                  ...menuLinkStyle,
                  padding: "6px 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                장바구니
              </Link>
              <Link
                href="/orders"
                style={{
                  ...menuLinkStyle,
                  padding: "6px 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                주문
              </Link>
              <Link
                href="/admin"
                style={{
                  ...menuLinkStyle,
                  padding: "6px 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                }}
              >
                관리자
              </Link>
              <button
                type="button"
                onClick={logout}
                style={{
                  padding: "6px 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  background: "transparent",
                  color: "#111827",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/member"
                style={{
                  ...menuLinkStyle,
                  padding: "8px 16px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                }}
              >
                회원가입
              </Link>
              <Link
                href="/login"
                className="btn-primary"
                style={{
                  ...menuLinkStyle,
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                  background: "#111827",
                  color: "#fff",
                }}
              >
                로그인
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </header>
  );
}
