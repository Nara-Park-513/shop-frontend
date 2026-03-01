export default function SupportNoticePage() {
  return (
    <main className="container py-5">
      <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm">
        <h1 className="h4 fw-black mb-2">공지사항</h1>
        <p className="text-secondary mb-4">운영 공지/점검 안내를 보여주는 영역입니다. (준비중)</p>

        <div className="list-group">
          {[
            { title: "서비스 오픈 안내", date: "2026-02-19" },
            { title: "배송 정책 안내", date: "2026-02-19" },
            { title: "개인정보 처리방침 업데이트", date: "2026-02-19" },
          ].map((n, idx) => (
            <div className="list-group-item d-flex align-items-center justify-content-between" key={idx}>
              <div className="fw-semibold">{n.title}</div>
              <div className="small text-secondary">{n.date}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

