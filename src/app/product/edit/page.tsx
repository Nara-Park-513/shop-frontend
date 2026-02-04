"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Container } from "react-bootstrap";
import ProductModal from "@/modal/ProductModal";

const API_ROOT = "http://localhost:9999";
const API_BASE = `${API_ROOT}/api`;

export default function ProductEditPage() {
  const params = useParams();
  const productId = Number(params.id);
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<"consumer" | "developer" | null>(null);

  //로그인 상태 및 사용자 역할 체크
  const checkUserRole = async () => {
    try{
      const res = await fetch(`${API_BASE}/auth/me`, {credentials:"include"});
      if(!res.ok) throw new Error("로그인 체크 실패");
      const data = await res.json();
      setIsLogin(true);
      setUserRole(data.role); //소비자 또는 개발자 역할 정보를 받아옴
    }catch(err){
      setIsLogin(false); 
      setUserRole("consumer"); //기본값으로 소비자 역할 설정
    }
  }
 
  //상품정보 가져오기
  const fetchProductDetails = async () => {
    try{
      const res = await fetch(`${API_BASE}/products/${productId}`);
      if (!res.ok) throw new Error("상품 정보 불러오기 실패");
      const data = await res.json();
      setProduct(data);
    }catch(err) {
      console.error("상품 정보 불러오기 실패", err);
    }
  };

  //장바구니에 상품 추가
  const handleAddToCart = () => {
    alert("장바구니에 상품을 추가했습니다.");
  }

  //결제처리
  const handleCheckout = () => {
    router.push("/checkout");
  };

  useEffect(() => {
    fetchProductDetails();
    checkUserRole();
  },[productId]);

  if (isNaN(productId)) return <div>잘못된 상품 ID입니다.</div>;

  return (
    <ProductModal
      show={showModal}
      onClose={() => router.push("/")}
      onSaved={() => router.push("/")}
      productId={productId}
      mode="view"
    />
  );
}