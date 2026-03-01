# DAON – Integrated Commerce Platform (Frontend)

Next.js 기반 통합 쇼핑몰 프론트엔드 프로젝트입니다.  
Spring Boot 백엔드(ERP/MES/결제 시스템)와 연동되어 주문 및 카카오페이 가결제 흐름을 처리합니다.

단순 쇼핑몰 구현이 아닌,  
ERP 및 MES 확장을 고려한 통합 상거래 플랫폼을 목표로 개발되었습니다.

---

## 🚀 Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- React
- React-Bootstrap
- LocalStorage 기반 장바구니 관리
- 카카오페이 결제 연동
- 다음(카카오) 우편번호 API

---

## ✨ 주요 기능

### 🛍 상품 & 주문
- 상품 목록 조회
- 장바구니 추가 / 삭제
- 수량 기반 총 금액 자동 계산
- 주소 검색(다음 우편번호 API)
- 주문 정보 입력 및 결제 요청

### 💳 카카오페이 가결제 연동
- Ready → Redirect → Approve 흐름 구현
- 결제 성공 시 백엔드 승인 처리
- 결제 실패 / 취소 대응 구조 설계

### 🔗 백엔드 연동
- `/api/payments/kakaopay/ready` 호출
- redirectUrl 수신 후 카카오 결제창 이동
- success 페이지에서 `pg_token` 전달 후 승인 처리

---

## 🔄 결제 처리 흐름

1. 사용자가 주문하기 클릭
2. 백엔드 ready API 호출
3. 카카오 결제창으로 리다이렉트
4. 결제 완료 시 success 페이지 이동
5. pg_token을 백엔드 approve API로 전달
6. 결제 승인 완료

---

## 🛠 실행 방법

```bash
npm install
npm run dev

기본 실행 주소:

http://localhost:3000

백엔드 서버(http://localhost:9999)가 실행 중이어야 결제가 정상 동작합니다.

📂 주요 폴더 구조
app/
 ├─ consumer/            # 상품 목록
 ├─ order/               # 주문 페이지
 ├─ payment/kakao/       # 결제 성공/실패 처리
include/
 ├─ Header.tsx
 ├─ Footer.tsx
🧠 개발 중 해결한 이슈

카카오페이 400 BAD_REQUEST (도메인 미등록 문제 해결)

결제 amount 누락 오류 디버깅

Next.js ↔ Spring Boot API 연동 문제 해결

환경변수 설정 오류 해결

모듈 설정 및 실행 환경 문제 해결

📌 프로젝트 목적

쇼핑몰 + ERP/MES 확장이 가능한 통합 구조 설계

외부 결제 API 연동 경험 축적

실제 상용 서비스 흐름과 유사한 결제 프로세스 구현

🔮 확장 방향

주문 내역 조회 페이지 추가

결제 상태 UI 개선

출고/재고 관리 화면과 연동

다국어 지원(한국어/영어)