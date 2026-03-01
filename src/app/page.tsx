"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/include/Header";
import ProductModal from "@/modal/ProductModal";
import HeroVideo from "@/components/HeroVideo";
import MainVideo from "./common/MainVideo";
import TEXTBanner from "./common/TEXTBanner";
import ScrollBanner from "./common/ScrollBanner";
import SpotBanner from "./common/SpotBanner";
import MESProductionSection from "./common/MESProductionSection";

const API_BASE = `/api`;

type Product = {
  id: number;
  title: string;
  desc: string;
  price: number;
  primaryCategory?: number;
  secondaryCategory?: number;
  imageUrl?: string;
};

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create");
  const [currentProductId, setCurrentProductId] = useState<number | undefined>(undefined);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [categoryList, setCategoryList] = useState<{ id: number; name: string; children?: any[] }[]>([]);

  // 상품 리스트 조회
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
      if (!res.ok) throw new Error("상품 리스트 불러오기 실패");
      const data = await res.json();
      console.log(data); // 상품 데이터 로깅
      setProducts(data);
    } catch (err) {
      console.error("상품 로딩 실패", err);
    }
  };

  // 삭제 처리
  const handleDelete = async (id: number) => {
    if (!confirm("삭제할까요?")) return;
    try {
      await fetch(`${API_BASE}/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (err) {
      console.error("삭제 실패", err);
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

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/nav-menus/tree`, { cache: "no-store" });
      if (!res.ok) throw new Error("카테고리 로딩 실패");
      const data = await res.json();
      setCategoryList(data);
    } catch (err) {
      console.error("카테고리 로딩 실패", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    checkLogin();
  }, []);

  // 모달 열기
  const openModal = (mode: "create" | "edit" | "view", productId?: number) => {
    setModalMode(mode);
    setCurrentProductId(productId);
    setShowModal(true);
  };

  return (
    <>
      <Header
        onOpenModal={() => openModal("create")}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />

      {/* 메인 히어로 영상 - 5개 슬라이드 넘어가는 */}
      <div style={{ height: "calc(100vh - 72px)", overflow: "hidden" }}>
        <HeroVideo />
      </div>

      <TEXTBanner />
      <MainVideo />
      <ScrollBanner />
      <MESProductionSection />
      <SpotBanner />

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
