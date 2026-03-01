"use client";

import Link from "next/link";

const MES_ITEMS = [
  {
    id: "plan",
    title: "생산 계획",
    desc: "주문 기반 생산 일정 수립",
    image: "/img/생산계획.jpg",
    href: "/mes/plan",
  },
  {
    id: "work-order",
    title: "작업 지시",
    desc: "공정별 작업 지시 전달",
    image: "/img/작업지시.jpg",
    href: "/mes/work-order",
  },
  {
    id: "result",
    title: "생산 실적",
    desc: "실제 생산 결과 기록",
    image: "/img/생산실적.jpg",
    href: "/mes/result",
  },
  {
    id: "process",
    title: "공정 상태",
    desc: "공정 진행 상태 확인",
    image: "/img/공정상태.jpg",
    href: "/mes/process",
  },
  {
    id: "complete",
    title: "생산 완료",
    desc: "완료 처리 및 ERP 연계",
    image: "/img/생산완료.jpg",
    href: "/mes/complete",
  },
];

export default function MESProductionSection() {
  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "38px 40px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "38px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}
        >
          MES 생산 관리
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            fontWeight: 400,
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          주문부터 완료까지 전 과정을 체계적으로 관리합니다
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "38px",
        }}
      >
        {MES_ITEMS.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <article
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  margin: "0 auto",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  background: "#f9fafb",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/img/undraw_rocket.svg";
                    (e.target as HTMLImageElement).style.objectFit = "contain";
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: "12px",
                  textAlign: "center",
                  maxWidth: "900px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    color: "#111827",
                    margin: "0 0 8px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#6b7280",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
