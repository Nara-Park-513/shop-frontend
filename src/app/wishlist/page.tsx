export default function WishlistPage() {
  return (
    <main className="container py-5">
      <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm">
        <h1 className="h4 fw-black mb-2">찜</h1>
        <p className="text-secondary mb-4">
          찜(관심 상품) 기능은 프론트에서 먼저 UI를 구성하고, 추후 백엔드(회원별 저장)로 확장할 수 있어요.
        </p>

        <div className="alert alert-light border mb-0">
          아직 찜한 상품이 없습니다. 상품 목록에서 “찜”을 추가할 수 있게 확장 예정입니다.
        </div>
      </div>
    </main>
  );
}

