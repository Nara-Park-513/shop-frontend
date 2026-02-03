"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Link from "next/link";

type Props = {
  onOpenModal: () => void;
};

export default function Header({ onOpenModal }: Props) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // 1. 컴포넌트 마운트 시 로그인 상태 및 토큰 만료 확인
  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("firstName");
    const loginTime = localStorage.getItem("loginTime");
    
    if (token && loginTime) {
      const currentTime = new Date().getTime();
      const fortyEightHours = 48 * 60 * 60 * 1000; // 48시간을 밀리초로 환산

      // ✅ 현재 시간과 로그인 시간을 비교하여 48시간이 지났는지 확인
      if (currentTime - parseInt(loginTime) > fortyEightHours) {
        alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
        handleLogout(); // 만료되었으면 로그아웃 실행
      } else {
        setIsLoggedIn(true);
        setUserName(name || "사용자");
      }
    } else if (token) {
      // 기존에 loginTime 없이 저장된 토큰이 있을 경우 처리
      setIsLoggedIn(true);
      setUserName(name || "사용자");
    }
  }, []);

  // 2. 로그아웃 함수
  const handleLogout = () => {
    // 세션 만료로 인한 자동 로그아웃 시에는 confirm창을 띄우지 않기 위해 체크
    const token = localStorage.getItem("token");
    
    if (token) {
      localStorage.clear(); // 토큰, 이름, 로그인 시간 등 모든 정보 삭제
      setIsLoggedIn(false);
      setUserName("");
      router.push("/login"); // 로그인 페이지로 이동
    }
  };

  return (
    <Navbar bg="secondary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} href="/">My shop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} href="/products">상품</Nav.Link>
          <Nav.Link as={Link} href="/cart">장바구니</Nav.Link>
          <Nav.Link as={Link} href="/orders">주문</Nav.Link>
        </Nav>

        <Button
          variant="outline-light"
          className="me-2"
          onClick={onOpenModal}
        >
          상품 등록
        </Button>

        {isLoggedIn ? (
          <>
            <span className="text-white me-3 align-self-center">
              {userName}님
            </span>
            <Button variant="danger" onClick={() => {
              if(confirm("로그아웃 하시겠습니까?")) handleLogout();
            }}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Link href="/member" className="btn btn-outline-light mx-2">
              회원가입
            </Link>
            <Link href="/login" className="btn btn-outline-light">
              로그인
            </Link>
          </>
        )}
      </Container>
    </Navbar>
  );
}