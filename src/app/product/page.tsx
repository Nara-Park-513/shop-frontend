"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Container } from "react-bootstrap";
import ProductModal from "@/modal/ProductModal";
import Header from "@/include/Header"; // Header 추가

const API_ROOT = "http://localhost:9999";
const API_BASE = `${API_ROOT}/api`;

// ✅ 메뉴 타입 정의
type MenuNode = {
  id: number;
  name: string;
  path?: string | null;
  children?: MenuNode[];
};

type Product = {
  id: number;
  title: string;
  desc: string;
  price: number;
  imageUrl: string;
};

export default function ProductDetail() {
  const router = useRouter();
  const { id: productId } = useParams(); // URL 파라미터에서 ID 가져오기

  // 1. 필요한 모든 상태 선언
  const [product, setProduct] = useState<Product | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("consumer");
  const [menus, setMenus] = useState<MenuNode[]>([]);
  const [showModal, setShowModal] = useState(false);

  // 2. 로그인 상태 및 사용자 역할 체크
  const checkUserRole = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
      if (!res.ok) throw new Error("로그인 체크 실패");

      const data = await res.json();
      console.log("🔥 auth/me 응답:", data);

      setIsLogin(true);
      setUserRole(data.role);

      localStorage.setItem("isLogin", JSON.stringify(true));
      localStorage.setItem("userRole", JSON.stringify(data.role));
    } catch (err) {
      console.log("❌ 로그인 안 됨");
      setIsLogin(false);
      setUserRole("consumer");
    }
  };

  // 3. 상품 정보 가져오기
  const fetchProductDetails = async () => {
    try {
      const res = await fetch(`${API_BASE}/products/${productId}`);
      if (!res.ok) throw new Error("상품 정보 불러오기 실패");
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("상품 정보 불러오기 실패", err);
    }
  };

  // 4. 메뉴 정보 가져오기 (누락된 함수 복구)
  const fetchMenus = async () => {
    try {
      const res = await fetch(`${API_BASE}/menus`);
      if (res.ok) {
        const data = await res.json();
        setMenus(data);
      }
    } catch (err) {
      console.error("메뉴 로드 실패", err);
    }
  };

  // 5. 장바구니 추가
  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: any) => item.id === product.id);

    if (existingProduct) {
      alert("이미 장바구니에 추가된 상품입니다.");
    } else {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("장바구니에 상품을 추가했습니다.");
    }
  };

  // 6. 결제 처리
  const handleCheckout = () => {
    if (isLogin) {
      router.push("/checkout");
    } else {
      alert("로그인이 필요합니다");
      router.push("/login");
    }
  };

  // 7. 초기 데이터 로드
  useEffect(() => {
    if (productId) {
      fetchProductDetails();
      checkUserRole();
      fetchMenus();
    }
  }, [productId]);

  if (!product) return <div className="text-center py-5">로딩 중...</div>;

  return (
    <>
      {/* Header 필수 Props 전달하여 빨간줄 해결 */}
      <Header 
        isLogin={isLogin} 
        setIsLogin={setIsLogin} 
        onOpenModal={() => setShowModal(true)} 
      />

      <Container className="py-4">
        <div className="d-flex flex-column align-items-center mt-3">
          <img
            src={`${API_ROOT}${product.imageUrl}`}
            alt={product.title}
            style={{ width: "100%", maxWidth: "500px", height: 300, objectFit: "cover" }}
          />
          <h3 className="mt-3">{product.title}</h3>
          <p>{product.desc}</p>
          <p>
            <strong>{product.price.toLocaleString()}원</strong>
          </p>

          {/* 로그인 여부에 따라 버튼 렌더링 */}
          {isLogin && (
            <div className="d-flex gap-2 mt-3">
              <Button variant="primary" onClick={handleAddToCart}>
                장바구니에 담기
              </Button>
              <Button variant="success" onClick={handleCheckout}>
                결제하기
              </Button>
            </div>
          )}

          {/* 개발자 역할일 경우 표시 */}
          {userRole === "developer" && (
            <div className="d-flex gap-2 mt-3">
              <Button
                variant="warning"
                onClick={() => router.push(`/products/edit/${product.id}`)}
              >
                상품 수정
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (confirm("정말 삭제하시겠습니까?")) {
                    // 삭제 API 연동 로직
                  }
                }}
              >
                상품 삭제
              </Button>
            </div>
          )}
        </div>

        {/* 모달 컴포넌트 */}
        <ProductModal 
  show={showModal} 
  onClose={() => setShowModal(false)} 
  // 만약 ProductModal이 아래 이름들을 사용한다면 이름을 맞춰줘야 합니다.
  onSaved={() => {
    setShowModal(false);
    fetchProductDetails(); 
  }}
  productId={Number(productId)} // 현재 페이지의 상품 ID 전달
  mode="edit"                   // 상세페이지에서는 보통 수정 모드로 사용
  isLogin={isLogin ?? false} 
/>
      </Container>
    </>
  );
}