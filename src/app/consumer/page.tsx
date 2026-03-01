"use client";

import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "@/include/Header";
import ProductModal from "@/modal/ProductModal";

const API_BASE = `/api`;

type CategoryNode = {
  id: number;
  name: string;
  children?: CategoryNode[];
};

type Product = {
  id: number;
  title: string;
  desc: string;
  price: number;
  imageUrl?: string;
  categoryId?: number;

  // 프론트에서 매핑된 카테고리 구조
  primaryCategory?: { id: number; name: string };
  secondaryCategory?: { id: number; name: string };

  // 서버에서 id 형태로 내려오는 경우를 대비
  primaryCategoryId?: number;
  secondaryCategoryId?: number;
};

export default function ConsumerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<CategoryNode[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [currentProductId, setCurrentProductId] = useState<number | undefined>(undefined);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const onOpenModal = () => openModal("create");

  // 카테고리 리스트 조회
  const fetchCategories = async () => {
  const res = await fetch(`${API_BASE}/nav-menus/tree`, { cache: "no-store" });
  const data = await res.json();
  setCategoryList(data);
};

  const findCategoryPath = (categoryId?: number) => {
  if (!categoryId) return "카테고리 없음";

  for (const m1 of categoryList) {
    if (m1.id === categoryId) return m1.name;

    for (const m2 of m1.children ?? []) {
      if (m2.id === categoryId) return `${m1.name} / ${m2.name}`;

      for (const m3 of m2.children ?? []) {
        if (m3.id === categoryId) return `${m1.name} / ${m2.name} / ${m3.name}`;
      }
    }
  }
  return "카테고리 없음";
};

  /* -----------------------------
    ✅ 상품 리스트 조회 수정
----------------------------- */
const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("상품 리스트 불러오기 실패");
    const data = await res.json();
    setProducts(data); // ✅ 이걸로 끝
  } catch (err) {
    console.error("상품 로딩 실패", err);
  }
};

  // 로그인 상태 체크
  const checkLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
      setIsLogin(res.ok);
    } catch (err) {
      console.error("로그인 체크 실패", err);
      setIsLogin(false);
    }
  };

  // 카테고리 이름 표시
  const getCategoryName = (primaryId?: number, secondaryId?: number) => {
    const primary = categoryList.find(c => c.id === primaryId);
    const secondary = primary?.children?.find(c => c.id === secondaryId);

    if (!primary || !secondary) return "카테고리 없음";
    return `${primary.name} / ${secondary.name}`;
  };

  useEffect(() => {
    fetchCategories();
    checkLogin();
  }, []);

  // 카테고리 로딩 후 상품 재조회
  useEffect(() => {
    if (categoryList.length > 0) {
      fetchProducts();
    }
  }, [categoryList]);

  // 모달 열기
  const openModal = (mode: "create" | "edit" | "view", productId?: number) => {
    setModalMode(mode);
    setCurrentProductId(productId);
    setShowModal(true);
  };

  // 장바구니 담기
  const addToCart = (p: Product) => {
    const saved = localStorage.getItem("cart");
    const cart: { id: number; title: string; price: number; imageUrl?: string; qty: number }[] = saved ? JSON.parse(saved) : [];
    const existing = cart.find((x) => x.id === p.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: p.id, title: p.title, price: p.price, imageUrl: p.imageUrl, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 담았습니다.");
  };

  // 검색어 필터
  const filteredProducts = q.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(q.toLowerCase()) ||
          (p.primaryCategory?.name ?? "").toLowerCase().includes(q.toLowerCase()) ||
          (p.secondaryCategory?.name ?? "").toLowerCase().includes(q.toLowerCase())
      )
    : products;

  return (
    <>
      <Header
        onOpenModal={() => openModal("create")}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />

      <Container className="py-5">
        <h2 className="mb-4">주문 채널</h2>
        {q && (
          <p className="text-muted mb-4">검색어: &quot;{q}&quot;</p>
        )}

        <Row className="g-4">
          {filteredProducts.map((p) => (
            <Col key={p.id} md={6} lg={4}>
              <Card className="h-100">
                {p.imageUrl ? (
                  <Card.Img variant="top" src={p.imageUrl} alt={p.title} style={{ height: 200, objectFit: "cover" }} />
                ) : (
                  <div style={{ height: 200, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    이미지 없음
                  </div>
                )}
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <p style={{ fontSize: 12, marginBottom: 4 }}>
                    {findCategoryPath(p.categoryId)}
                  </p>
                  <p className="fw-bold mb-3">{p.price.toLocaleString()}원</p>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => openModal("view", p.id)}>
                      보기
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => addToCart(p)}>
                      장바구니
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredProducts.length === 0 && (
          <p className="text-muted text-center py-5">상품이 없습니다.</p>
        )}
      </Container>

      {/* 상품 모달 */}
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSaved={() => {
          setShowModal(false);
          fetchProducts();
        }}
        productId={currentProductId}
        mode={modalMode}
        isLogin={!!isLogin}
        categoryList={categoryList}
      />
    </>
  );
}
