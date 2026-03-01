export default function SupportQnaPage() {
  return (
    <main className="container py-5">
      <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm">
        <h1 className="h4 fw-black mb-2">1:1 문의</h1>
        <p className="text-secondary mb-4">
          문의 접수 UI는 먼저 만들고, 백엔드(티켓/댓글/알림)로 연동하면 실무처럼 확장됩니다.
        </p>

        <div className="row g-3">
          <div className="col-12 col-lg-7">
            <div className="p-3 border rounded-4">
              <div className="fw-extrabold mb-2">문의 작성 (준비중)</div>
              <div className="text-secondary small">
                제목/문의유형/내용/첨부파일 업로드를 추가할 수 있어요.
              </div>
              <div className="mt-3">
                <div className="mb-2">
                  <label className="form-label small text-secondary">제목</label>
                  <input className="form-control" placeholder="문의 제목을 입력하세요" disabled />
                </div>
                <div className="mb-2">
                  <label className="form-label small text-secondary">내용</label>
                  <textarea className="form-control" rows={6} placeholder="문의 내용을 입력하세요" disabled />
                </div>
                <button className="btn btn-secondary" disabled>
                  문의 등록
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="p-3 border rounded-4 h-100">
              <div className="fw-extrabold mb-2">내 문의 내역</div>
              <div className="alert alert-light border mb-0">아직 문의 내역이 없습니다.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

