"use client";

import { useEffect, useMemo, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Header from "@/include/Header";
import { useRouter } from "next/navigation";

const API_BASE = `/api`;

declare global {
  interface Window {
    daum: any;
  }
}

type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl?: string | null;
  qty: number;
};

type OrderDetails = {
  address: string;
  detailAddress: string;
  paymentMethod: "kakao" | "card";
};

export default function OrderPage() {

  const startKakaoPay = async () => {
  if (cart.length === 0) {
    alert("장바구니가 비어있습니다.");
    return;
  }
  if (!orderDetails.address) {
    alert("주소를 입력해주세요.");
    return;
  }

  // 백엔드로 보낼 최소 데이터 (서버에서 order 생성/금액 검증 권장)
  const payload = {
    items: cart.map((x) => ({ productId: x.id, qty: x.qty })),
    address: orderDetails.address,
    detailAddress: orderDetails.detailAddress,
  };

  const res = await fetch("http://localhost:9999/api/payments/kakaopay/ready", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: totalPrice }), // ✅ 이게 핵심
});

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    alert(`카카오페이 결제 준비 실패\n${msg}`);
    return;
  }

  const data = await res.json();
  // data.redirectUrl 같은 형태로 받는다고 가정
  if (!data?.redirectUrl) {
    alert("redirectUrl이 응답에 없습니다.");
    return;
  }

  // 카카오 결제창으로 이동
  window.location.href = data.redirectUrl;
};

  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    address: "",
    detailAddress: "",
    paymentMethod: "card",
  });

  // 이미지 경로 보정 함수
 const API_ROOT = "http://localhost:9999";

const resolveImageSrc = (url?: string | null) => {
  if (!url) return "/no-image.png";
  if (url.startsWith("http")) return url;

  // ✅ /api로 시작하면 제거 (이미지는 보통 /uploads에 있음)
  const normalized = url.startsWith("/api/") ? url.replace(/^\/api/, "") : url;

  return `${API_ROOT}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
};

  // 장바구니 로드
  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) {
      setCart([]);
      return;
    }
    try {
      const parsed = JSON.parse(savedCart);
      const normalized: CartItem[] = (Array.isArray(parsed) ? parsed : []).map((item: any) => ({
        id: Number(item.id),
        title: String(item.title ?? ""),
        price: Number(item.price ?? 0),
        imageUrl: item.imageUrl ?? null,
        qty: Math.max(1, Number(item.qty ?? 1)),
      }));
      setCart(normalized);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // 결제 수단 쿼리 파라미터 체크
  useEffect(() => {
    const url = new URL(window.location.href);
    const pm = url.searchParams.get("pm");
    if (pm === "kakao" || pm === "card") {
      setOrderDetails((prev) => ({ ...prev, paymentMethod: pm }));
    }
  }, []);

  useEffect(() => {
  const scriptId = "daum-postcode-script";
  if (document.getElementById(scriptId)) return;

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  script.async = true;
  document.body.appendChild(script);
}, []);

  // 총 금액 계산
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  // 입력 핸들러
  const handleChange: React.ChangeEventHandler<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> = (e) => {
  const { name, value } = e.target;
  setOrderDetails((prev) => ({ ...prev, [name]: value }));
};

  // 함수 선언 (빨간줄 방지)
  const handleAddressSearch = () => {
  if (!window.daum?.Postcode) {
    alert("주소 검색 로딩 중입니다. 잠시 후 다시 시도해주세요.");
    return;
  }

  new window.daum.Postcode({
    oncomplete: (data: any) => {
      // 도로명/지번 주소
      const baseAddress = data.roadAddress || data.jibunAddress || "";

      setOrderDetails((prev) => ({
        ...prev,
        address: baseAddress,
      }));

      // 상세주소 입력으로 포커스 이동 (선택)
      setTimeout(() => {
        const el = document.querySelector<HTMLInputElement>('input[name="detailAddress"]');
        el?.focus();
      }, 0);
    },
  }).open();
};

  const handlePlaceOrder = async () => {
  if (orderDetails.paymentMethod === "kakao") {
    await startKakaoPay();
    return;
  }

  // 카드(임시): 기존처럼 완료 처리
  alert("주문이 완료되었습니다. (카드 결제는 추후 구현)");
};

  const handleOpenModal = () => {};
  const handleSetIsLogin = (v: boolean) => setIsLogin(v);

  //삭제
  const removeFromCart = (id: number) => {
  const next = cart.filter((x) => x.id !== id);
  setCart(next);
  localStorage.setItem("cart", JSON.stringify(next));
};



  return (
    <>
      {/* Header 필수 Props 전달 */}
      <Header 
        isLogin={isLogin} 
        setIsLogin={handleSetIsLogin} 
        onOpenModal={handleOpenModal} 
      />

      <Container className="py-4">
        <h1>주문 정보</h1>

        {cart.map((item) => (
          <div key={item.id} className="border p-3 mb-3 d-flex gap-3 align-items-center">
            <img
              src={resolveImageSrc(item.imageUrl)}
              alt={item.title}
              style={{ width: 80, height: 80, objectFit: "cover" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/no-image.png";
              }}
            />
            <div className="flex-grow-1">
              <div>{item.title}</div>
              <div>
                {item.price.toLocaleString()}원 x {item.qty}
              </div>
            </div>
             <Button
      className="ms-auto"
    variant="outline-danger"
    size="sm"
    type="button"
    onClick={() => removeFromCart(item.id)}
    >
      제거
    </Button>
          </div>
        ))}

        <h4 className="text-end">총 금액: {totalPrice.toLocaleString()}원</h4>

        <Form>
          <Form.Group className="mt-3">
            <Form.Label>주소</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control readOnly value={orderDetails.address} />
              <Button type="button" onClick={handleAddressSearch}>
                주소검색
              </Button>
            </div>
          </Form.Group>

          <Form.Control
  className="mt-2"
  placeholder="상세주소"
  name="detailAddress"
  value={orderDetails.detailAddress}
  onChange={handleChange}
/>

          <Form.Select
            className="mt-3"
            name="paymentMethod"
            value={orderDetails.paymentMethod}
            onChange={(e: any) => handleChange(e)}
          >
            <option value="card">신용카드</option>
            <option value="kakao">카카오페이</option>
          </Form.Select>

          <Button className="mt-4" type="button" onClick={handlePlaceOrder}>
            주문하기
          </Button>
        </Form>
      </Container>
    </>
  );
}