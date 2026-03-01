export default function SupportFaqPage() {
  return (
    <main className="container py-5">
      <div className="p-4 p-md-5 bg-white border rounded-4 shadow-sm">
        <h1 className="h4 fw-black mb-2">자주 묻는 질문</h1>
        <p className="text-secondary mb-4">고객 문의를 줄이는 핵심 페이지입니다. (준비중)</p>

        <div className="d-grid gap-2">
          {[
            {
              q: "배송은 얼마나 걸리나요?",
              a: "기본적으로 영업일 기준 1~2일 내 출고를 목표로 합니다. (지역/상품에 따라 변동)",
            },
            {
              q: "세금계산서/견적서 발급이 가능한가요?",
              a: "B2B 기능으로 확장 예정입니다. 현재는 운영 정책 정리 단계입니다.",
            },
            {
              q: "반품/교환은 어떻게 하나요?",
              a: "고객센터(1:1 문의)로 접수 후 절차 안내 예정입니다.",
            },
          ].map((x) => (
            <details key={x.q} className="border rounded-4 p-3">
              <summary className="fw-semibold" style={{ cursor: "pointer" }}>
                {x.q}
              </summary>
              <div className="text-secondary mt-2">{x.a}</div>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}

