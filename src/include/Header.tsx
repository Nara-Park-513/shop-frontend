"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

type Props = {
  onOpenModal: () => void;
  isLogin: boolean | null; // 로그인 상태
  setIsLogin: (v: boolean) => void; // 상태 변경 함수
  onToggleSidebar?: () => void; // (admin) 모바일 사이드바 토글
  className?: string;
};

export default function Header({
  className,
  onOpenModal,
  isLogin,
  setIsLogin,
  onToggleSidebar,
}: Props) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // ✅ 추가: 로그인 상태를 명확히 분리 (여기 중요)
  const isAuthLoading = isLogin === null;
  const isAuthed = isLogin === true;

  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [megaMenuOrderOpen, setMegaMenuOrderOpen] = useState(false);
  const [megaMenuErpOpen, setMegaMenuErpOpen] = useState(false);
  const [megaMenuMesOpen, setMegaMenuMesOpen] = useState(false);
  const [megaMenuIntegrationOpen, setMegaMenuIntegrationOpen] = useState(false);
  const [megaMenuSupportOpen, setMegaMenuSupportOpen] = useState(false);
  const [megaMenuInquiryOpen, setMegaMenuInquiryOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLogin(false); // 로그아웃 후 상태 갱신
    } catch (err) {
      console.error("logout error:", err);
    }
  };

  useEffect(() => {
  if (isLogin !== null) return; // 이미 결정됐으면 스킵

  // 1) localStorage fallback (키 이름이 다르면 여기만 맞추면 됨)
  const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  if (user) {
    setIsLogin(true);
    return;
  }

  // 2) 쿠키 기반이면 서버 확인 API로 판별(있을 때만)
  (async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      setIsLogin(res.ok);
    } catch {
      setIsLogin(false);
    }
  })();
}, [isLogin, setIsLogin]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setCartOpen(false);
      }
    };

    if (cartOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cartOpen]);

  const goSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;
    window.location.href = `/consumer?q=${encodeURIComponent(query)}`;
  };

  const onBurgerClick = () => {
    if (isAdmin && onToggleSidebar) {
      onToggleSidebar();
      return;
    }
    setMenuOpen(true);
  };

  return (
    <Navbar
      bg="white"
      variant="light"
      expand="lg"
      className={`site-header ${className ?? ""}`}
      style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      <Container fluid className="site-header__container">
        <div className="site-header__bar">
          <Button
            variant="link"
            className="site-header__burger"
            onClick={onBurgerClick}
            aria-label={isAdmin ? "관리자 사이드바 열기/닫기" : "메뉴 열기"}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </Button>

          <Navbar.Brand as={Link} href="/" className="site-header__brand">
            <Image
              src="/img/daon-d.png"
              alt="DAON"
              width={28}
              height={28}
              className="site-header__logo-img"
            />
            <span className="site-header__logo">DAON</span>
          </Navbar.Brand>

          {/* ✅ 데스크톱 메뉴(네 기존 코드 그대로 유지하면 됨) */}
          <div className="site-header__desktop">
            <Nav className="site-header__center">
              {/* ---- 여기부터 아래 메가메뉴 블록은 네 기존 코드 그대로 두면 됨 ---- */}
              {/* 주문 채널 */}
              <div
                className="site-header__mega-trigger"
                onMouseEnter={() => setMegaMenuOrderOpen(true)}
                onMouseLeave={() => setMegaMenuOrderOpen(false)}
              >
                <Nav.Link
                  as={Link}
                  href="/consumer"
                  className="site-header__nav-item"
                >
                  주문 채널
                </Nav.Link>
                {megaMenuOrderOpen && (
                  <div className="site-header__mega-menu">
                    <div className="site-header__mega-inner">
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">주문 관리</div>
                        <Link href="/consumer" className="site-header__mega-link">
                          제품 주문
                        </Link>
                        <Link href="/orders" className="site-header__mega-link">
                          주문 등록
                        </Link>
                        <Link href="/orders" className="site-header__mega-link">
                          주문 내역
                        </Link>
                        <Link href="/orders" className="site-header__mega-link">
                          주문 상태
                        </Link>
                        <Link href="/orders" className="site-header__mega-link">
                          주문 조회
                        </Link>
                        <Link href="/orders" className="site-header__mega-link">
                          주문 현황 조회
                        </Link>
                        <Link href="/orders" className="site-header__mega-link">
                          주문 이력
                        </Link>
                        <Link href="/orders" className="site-header__mega-link">
                          주문 상태 확인
                        </Link>
                      </div>

                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">출하 관리</div>
                        <Link href="/delivery" className="site-header__mega-link">
                          출하 요청
                        </Link>
                        <Link href="/delivery" className="site-header__mega-link">
                          출하 상태 확인
                        </Link>
                        <Link href="/delivery" className="site-header__mega-link">
                          출하 완료
                        </Link>
                      </div>

                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">품절 · 재고</div>
                        <Link
                          href="/consumer?out=1"
                          className="site-header__mega-link"
                        >
                          품절 안내
                        </Link>
                        <Link
                          href="/consumer?out=1"
                          className="site-header__mega-link"
                        >
                          품절 상품 조회
                        </Link>
                        <Link href="/consumer" className="site-header__mega-link">
                          재입고 예정 안내
                        </Link>
                      </div>

                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">견적 (B2B)</div>
                        <Link href="/consumer" className="site-header__mega-link">
                          견적 요청
                        </Link>
                        <Link href="/consumer" className="site-header__mega-link">
                          견적 요청 등록
                        </Link>
                        <Link href="/consumer" className="site-header__mega-link">
                          견적 응답 확인
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ERP */}
              <div
                className="site-header__mega-trigger"
                onMouseEnter={() => setMegaMenuErpOpen(true)}
                onMouseLeave={() => setMegaMenuErpOpen(false)}
              >
                <Nav.Link as={Link} href="/erp" className="site-header__nav-item">
                  ERP
                </Nav.Link>
                {megaMenuErpOpen && (
                  <div className="site-header__mega-menu site-header__mega-menu--erp">
                    {/* 네 기존 코드 그대로 */}
                    <div className="site-header__mega-inner">
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">
                          기준정보 관리
                        </div>
                        <Link href="/erp/products" className="site-header__mega-link">
                          상품 마스터
                        </Link>
                        <Link href="/erp/partners" className="site-header__mega-link">
                          거래처 관리
                        </Link>
                        <Link href="/erp/pricing" className="site-header__mega-link">
                          가격 정책 관리
                        </Link>
                        <Link
                          href="/erp/categories"
                          className="site-header__mega-link"
                        >
                          품목 분류 관리
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">
                          영업 · 주문 관리
                        </div>
                        <Link href="/orders" className="site-header__mega-link">
                          주문 관리
                        </Link>
                        <Link href="/delivery" className="site-header__mega-link">
                          출고 지시
                        </Link>
                        <Link href="/erp/sales" className="site-header__mega-link">
                          매출 현황 조회
                        </Link>
                        <Link
                          href="/erp/transactions"
                          className="site-header__mega-link"
                        >
                          거래 내역 관리
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">재고 관리</div>
                        <Link
                          href="/erp/inventory"
                          className="site-header__mega-link"
                        >
                          재고 현황 조회
                        </Link>
                        <Link
                          href="/erp/receiving"
                          className="site-header__mega-link"
                        >
                          입고 관리
                        </Link>
                        <Link
                          href="/erp/adjustment"
                          className="site-header__mega-link"
                        >
                          재고 조정
                        </Link>
                        <Link
                          href="/erp/safety-stock"
                          className="site-header__mega-link"
                        >
                          안전 재고 설정
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">정산 · 관리</div>
                        <Link
                          href="/erp/settlement"
                          className="site-header__mega-link"
                        >
                          매출 정산
                        </Link>
                        <Link
                          href="/erp/tax-invoice"
                          className="site-header__mega-link"
                        >
                          세금계산서 관리
                        </Link>
                        <Link
                          href="/erp/reports"
                          className="site-header__mega-link"
                        >
                          운영 리포트
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* MES */}
              <div
                className="site-header__mega-trigger"
                onMouseEnter={() => setMegaMenuMesOpen(true)}
                onMouseLeave={() => setMegaMenuMesOpen(false)}
              >
                <Nav.Link as={Link} href="/mes" className="site-header__nav-item">
                  MES
                </Nav.Link>
                {megaMenuMesOpen && (
                  <div className="site-header__mega-menu">
                    {/* 네 기존 코드 그대로 */}
                    <div className="site-header__mega-inner">
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">생산 지시</div>
                        <Link
                          href="/mes/production"
                          className="site-header__mega-link"
                        >
                          생산 지시 등록
                        </Link>
                        <Link
                          href="/mes/work-order"
                          className="site-header__mega-link"
                        >
                          작업 지시 관리
                        </Link>
                        <Link href="/mes/plan" className="site-header__mega-link">
                          생산 계획 조회
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">작업 실행</div>
                        <Link
                          href="/mes/progress"
                          className="site-header__mega-link"
                        >
                          작업 진행 현황
                        </Link>
                        <Link
                          href="/mes/process"
                          className="site-header__mega-link"
                        >
                          공정 상태 관리
                        </Link>
                        <Link
                          href="/mes/complete"
                          className="site-header__mega-link"
                        >
                          작업 완료 처리
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">재고 · 품절 연계</div>
                        <Link
                          href="/mes/inventory"
                          className="site-header__mega-link"
                        >
                          생산 재고 반영
                        </Link>
                        <Link
                          href="/mes/out-of-stock"
                          className="site-header__mega-link"
                        >
                          품절 상태 전파
                        </Link>
                        <Link
                          href="/mes/restock"
                          className="site-header__mega-link"
                        >
                          재입고 처리
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">현장 모니터링</div>
                        <Link
                          href="/mes/performance"
                          className="site-header__mega-link"
                        >
                          생산 실적 조회
                        </Link>
                        <Link
                          href="/mes/history"
                          className="site-header__mega-link"
                        >
                          공정 이력 관리
                        </Link>
                        <Link
                          href="/mes/anomaly"
                          className="site-header__mega-link"
                        >
                          이상 상태 확인
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 시스템 연계 */}
              <div
                className="site-header__mega-trigger"
                onMouseEnter={() => setMegaMenuIntegrationOpen(true)}
                onMouseLeave={() => setMegaMenuIntegrationOpen(false)}
              >
                <Nav.Link
                  as={Link}
                  href="/integration"
                  className="site-header__nav-item"
                >
                  시스템 연계
                </Nav.Link>
                {megaMenuIntegrationOpen && (
                  <div className="site-header__mega-menu">
                    {/* 네 기존 코드 그대로 */}
                    <div className="site-header__mega-inner">
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">연계 현황</div>
                        <Link
                          href="/integration/systems"
                          className="site-header__mega-link"
                        >
                          연계 시스템 목록
                        </Link>
                        <Link
                          href="/integration/status"
                          className="site-header__mega-link"
                        >
                          연계 상태 모니터링
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">API 관리</div>
                        <Link
                          href="/integration/api"
                          className="site-header__mega-link"
                        >
                          API 목록
                        </Link>
                        <Link
                          href="/integration/logs"
                          className="site-header__mega-link"
                        >
                          연계 로그 조회
                        </Link>
                        <Link
                          href="/integration/errors"
                          className="site-header__mega-link"
                        >
                          오류 이력 관리
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">데이터 동기화</div>
                        <Link
                          href="/integration/order"
                          className="site-header__mega-link"
                        >
                          주문 데이터 연계
                        </Link>
                        <Link
                          href="/integration/inventory"
                          className="site-header__mega-link"
                        >
                          재고 · 생산 데이터 연계
                        </Link>
                        <Link
                          href="/integration/sync"
                          className="site-header__mega-link"
                        >
                          상태 동기화
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 고객지원 */}
              <div
                className="site-header__mega-trigger"
                onMouseEnter={() => setMegaMenuSupportOpen(true)}
                onMouseLeave={() => setMegaMenuSupportOpen(false)}
              >
                <Nav.Link
                  as={Link}
                  href="/support"
                  className="site-header__nav-item"
                >
                  고객지원
                </Nav.Link>
                {megaMenuSupportOpen && (
                  <div className="site-header__mega-menu">
                    {/* 네 기존 코드 그대로 */}
                    <div className="site-header__mega-inner">
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">문의 관리</div>
                        <Link
                          href="/support/inquiry"
                          className="site-header__mega-link"
                        >
                          문의 등록
                        </Link>
                        <Link href="/support/list" className="site-header__mega-link">
                          문의 내역 조회
                        </Link>
                        <Link
                          href="/support/status"
                          className="site-header__mega-link"
                        >
                          처리 상태 확인
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">운영 지원</div>
                        <Link
                          href="/support/guide"
                          className="site-header__mega-link"
                        >
                          시스템 이용 가이드
                        </Link>
                        <Link href="/support/faq" className="site-header__mega-link">
                          자주 묻는 질문(FAQ)
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">장애 · 이슈</div>
                        <Link
                          href="/support/incident"
                          className="site-header__mega-link"
                        >
                          장애 접수
                        </Link>
                        <Link
                          href="/support/incident-history"
                          className="site-header__mega-link"
                        >
                          조치 이력 조회
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 문의하기 */}
              <div
                className="site-header__mega-trigger"
                onMouseEnter={() => setMegaMenuInquiryOpen(true)}
                onMouseLeave={() => setMegaMenuInquiryOpen(false)}
              >
                <Nav.Link
                  as={Link}
                  href="/inquiry"
                  className="site-header__nav-item"
                >
                  문의하기
                </Nav.Link>
                {megaMenuInquiryOpen && (
                  <div className="site-header__mega-menu">
                    {/* 네 기존 코드 그대로 */}
                    <div className="site-header__mega-inner">
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">도입 문의</div>
                        <Link
                          href="/inquiry/erp-mes"
                          className="site-header__mega-link"
                        >
                          ERP · MES 도입 상담
                        </Link>
                        <Link
                          href="/inquiry/integration"
                          className="site-header__mega-link"
                        >
                          시스템 연계 상담
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">기술 문의</div>
                        <Link
                          href="/inquiry/feature"
                          className="site-header__mega-link"
                        >
                          기능 문의
                        </Link>
                        <Link
                          href="/inquiry/custom"
                          className="site-header__mega-link"
                        >
                          커스터마이징 문의
                        </Link>
                      </div>
                      <div className="site-header__mega-col">
                        <div className="site-header__mega-title">협업 제안</div>
                        <Link
                          href="/inquiry/partnership"
                          className="site-header__mega-link"
                        >
                          파트너십 제안
                        </Link>
                        <Link
                          href="/inquiry/other"
                          className="site-header__mega-link"
                        >
                          기타 문의
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* ---- 메가메뉴 끝 ---- */}
            </Nav>
          </div>

          {/* ✅ 오른쪽: 검색/언어/장바구니/로그인 */}
          <div className="site-header__actions">
            <Form
              className="site-header__search site-header__search--compact me-3"
              onSubmit={goSearch}
              role="search"
            >
              <InputGroup className="site-header__search-group">
                <InputGroup.Text className="site-header__search-icon">
                  <SearchIcon />
                </InputGroup.Text>
                <Form.Control
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="검색"
                  aria-label="검색"
                  className="site-header__search-input"
                />
              </InputGroup>
            </Form>

            <div className="site-header__lang me-2">
              <button
                type="button"
                className="site-header__lang-btn site-header__lang-btn--active"
              >
                KO
              </button>
              <button type="button" className="site-header__lang-btn">
                EN
              </button>
            </div>

            <div className="site-header__cart-wrap me-2" ref={cartRef}>
              <button
                type="button"
                className="site-header__cart"
                onClick={() => setCartOpen((v) => !v)}
                aria-label="장바구니"
                aria-expanded={cartOpen}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </button>

              {cartOpen && (
                <div className="site-header__cart-dropdown">
                  <div className="site-header__cart-dropdown-title">장바구니</div>
                  <Link
                    href="/cart"
                    className="site-header__cart-dropdown-link"
                    onClick={() => setCartOpen(false)}
                  >
                    → 주문 생성
                  </Link>
                  <Link
                    href="/orders"
                    className="site-header__cart-dropdown-link"
                    onClick={() => setCartOpen(false)}
                  >
                    → ERP 주문 등록
                  </Link>
                  <Link
                    href="/delivery"
                    className="site-header__cart-dropdown-link"
                    onClick={() => setCartOpen(false)}
                  >
                    → MES 출하/재고 연계
                  </Link>
                </div>
              )}
            </div>

            {/* ✅ 여기만 바뀐 핵심: 로그인/로그아웃 */}
            {isAuthLoading ? (
              <Button variant="outline-dark" disabled>
                로딩중…
              </Button>
            ) : isAuthed ? (
              <Button variant="outline-dark" onClick={logout}>
                로그아웃
              </Button>
            ) : (
              <>
                <a
                  href="/member"
                  className="btn btn-outline-dark site-header__btn-register"
                >
                  회원가입
                </a>
                <a href="/login" className="btn btn-dark site-header__btn-login">
                  로그인
                </a>
              </>
            )}
          </div>
        </div>

        {/* ✅ 사용자용 사이드 메뉴(모바일) */}
        {!isAdmin && (
          <Offcanvas
            placement="start"
            show={menuOpen}
            onHide={() => setMenuOpen(false)}
            className="site-drawer"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>DAON</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Form
                className="mb-3"
                onSubmit={(e) => {
                  goSearch(e);
                  setMenuOpen(false);
                }}
              >
                <InputGroup>
                  <Form.Control
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="검색: 상품명 / 자재명"
                    aria-label="검색"
                  />
                  <Button type="submit" variant="dark">
                    검색
                  </Button>
                </InputGroup>
              </Form>

              <div className="d-grid gap-2">
                <a
                  className="btn btn-outline-dark"
                  href="/"
                  onClick={() => setMenuOpen(false)}
                >
                  홈
                </a>
                <a
                  className="btn btn-outline-dark"
                  href="/consumer"
                  onClick={() => setMenuOpen(false)}
                >
                  주문 채널
                </a>
                <a
                  className="btn btn-outline-dark"
                  href="/erp"
                  onClick={() => setMenuOpen(false)}
                >
                  ERP
                </a>
                <a
                  className="btn btn-outline-dark"
                  href="/mes"
                  onClick={() => setMenuOpen(false)}
                >
                  MES
                </a>
                <a
                  className="btn btn-outline-dark"
                  href="/integration"
                  onClick={() => setMenuOpen(false)}
                >
                  시스템 연계
                </a>
                <a
                  className="btn btn-outline-dark"
                  href="/support"
                  onClick={() => setMenuOpen(false)}
                >
                  고객지원
                </a>
                <a
                  className="btn btn-outline-dark"
                  href="/inquiry"
                  onClick={() => setMenuOpen(false)}
                >
                  문의하기
                </a>

                <hr className="my-2" />

                {/* ✅ 모바일 로그인/로그아웃도 같은 로직으로 통일 */}
                {isAuthLoading ? (
                  <Button className="btn btn-outline-dark" disabled>
                    로딩중…
                  </Button>
                ) : isAuthed ? (
                  <>
                    <a
                      className="btn btn-dark"
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                    >
                      관리자
                    </a>
                    <button
                      className="btn btn-outline-dark"
                      type="button"
                      onClick={async () => {
                        await logout();
                        setMenuOpen(false);
                      }}
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      className="btn btn-dark"
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                    >
                      로그인
                    </a>
                    <a
                      className="btn btn-outline-dark"
                      href="/member"
                      onClick={() => setMenuOpen(false)}
                    >
                      회원가입
                    </a>
                  </>
                )}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        )}
      </Container>
    </Navbar>
  );
}