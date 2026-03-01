export default function MyPage() {
  return (
    <main className="container py-5">
      <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm">
        <h1 className="h4 fw-black mb-2">마이페이지</h1>
        <p className="text-secondary mb-4">주문/배송/프로필/문의 내역을 모아보는 영역입니다. (준비중)</p>

        <div className="row g-3">
          {[
            { title: "내 주문", desc: "주문 내역/상태 확인" },
            { title: "배송 조회", desc: "배송 진행 상태 확인" },
            { title: "내 문의", desc: "1:1 문의/답변 확인" },
            { title: "프로필", desc: "연락처/주소/비밀번호 관리" },
          ].map((x) => (
            <div className="col-12 col-md-6" key={x.title}>
              <div className="p-3 border rounded-4 h-100">
                <div className="fw-extrabold">{x.title}</div>
                <div className="small text-secondary mt-1">{x.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

