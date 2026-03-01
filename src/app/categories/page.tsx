export default function CategoriesPage() {
  return (
    <main className="container py-5">
      <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm">
        <h1 className="h4 fw-black mb-2">카테고리</h1>
        <p className="text-secondary mb-4">
          카테고리 탐색 화면은 백엔드 카테고리 API 연동 후 더 풍부하게 구성할 예정입니다.
        </p>

        <div className="row g-3">
          {[
            { title: "산업자재", desc: "현장/설비 운영에 필요한 자재" },
            { title: "안전/보호구", desc: "장갑/보호장비 등" },
            { title: "전기/배선", desc: "케이블/단자/배선자재" },
            { title: "부품/모듈", desc: "PLC/레일/모듈류" },
          ].map((c) => (
            <div className="col-12 col-sm-6 col-lg-3" key={c.title}>
              <div className="p-3 border rounded-4 h-100">
                <div className="fw-extrabold">{c.title}</div>
                <div className="small text-secondary mt-1">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

