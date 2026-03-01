export default function EventPage() {
  return (
    <main className="container py-5">
      <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm">
        <h1 className="h4 fw-black mb-2">이벤트</h1>
        <p className="text-secondary mb-4">진행 중인 프로모션/기획전 영역입니다. (준비중)</p>

        <div className="row g-3">
          {[
            { title: "신규 가입 혜택", badge: "준비중" },
            { title: "대량 구매 문의", badge: "B2B" },
            { title: "기간 한정 특가", badge: "준비중" },
          ].map((e) => (
            <div className="col-12 col-md-4" key={e.title}>
              <div className="p-3 border rounded-4 h-100 d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="fw-extrabold">{e.title}</div>
                  <span className="badge text-bg-secondary">{e.badge}</span>
                </div>
                <div className="small text-secondary">
                  백엔드 연동 후 이벤트/쿠폰/배너를 동적으로 노출할 수 있어요.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

