import {
  FooterBottom,
} from "@/styled/Component.styles";

export default function Footer() {
  return (
    <FooterBottom>
        <p>
          (주)다온테크 <br />
          대표 : 이기창 | 경기도 화성시 동탄 <br />
          사업자등록번호 712-17-02297 | 통신판매업신고번호 2026-경기00-0001호
        </p>

        <p>
          고객센터 : 031-011-1234 | FAX : 031-0000-1111 <br />
          이메일 : lgc83@naver.com
        </p>

        <p>
          본 사이트는 전자상거래법을 준수합니다. <br />
          기업 간 거래(B2B) 특성상 일부 상품은 견적 및 계약 후 진행됩니다.
        </p>

        <p>
          <a href="#">콘텐츠산업진흥법에 의한 콘텐츠 보호 안내 자세히 보기</a>
        </p>
    </FooterBottom>
  );
}