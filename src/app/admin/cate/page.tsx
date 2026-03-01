"use client";

import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Header from "@/include/Header";
import SideBar from "../include/SideBar";
// ProductModal이 다른 경로에 있다면 경로를 수정해주세요.
// import ProductModal from "./ProductModal"; 

type Product = {
  id: number;
  title: string;
  desc: string;
  price: number;
  primaryCategory?: number;
  secondaryCategory?: number;
  imageUrl?: string;
};

type CategoryNode = {
  id: number;
  name: string;
  children?: CategoryNode[];
};

const LS_KEY = "categories";

/** localStorage helpers */
const loadCategoriesLS = (): CategoryNode[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveCategoriesLS = (cats: CategoryNode[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(cats));
};

// --- 임시 스타일 컴포넌트 대체 (빨간줄 방지) ---
const PageWrapper = ({ children }: any) => <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>{children}</div>;
const MainContentWrapper = ({ children }: any) => (
  <div className="container-fluid" style={{ marginLeft: 260 }}>
    {children}
  </div>
);
const Content = ({ children }: any) => <div className="p-4">{children}</div>;
const ContentInner = ({ children, style }: any) => <div style={style}>{children}</div>;
const H1 = ({ children }: any) => <h1 className="mb-4 fw-bold">{children}</h1>;
const H5 = ({ children, style }: any) => <h5 style={style} className="fw-bold">{children}</h5>;
const P = ({ children, style }: any) => <p style={style}>{children}</p>;

// --- ProductModal 임시 컴포넌트 (실제 파일이 있으면 삭제하세요) ---
const ProductModal = (props: any) => null;

export default function Category() {
  const router = useRouter();

  // 1. 상태 선언
  const [categoryList, setCategoryList] = useState<CategoryNode[]>([]);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [primaryName, setPrimaryName] = useState("");
  const [secondaryName, setSecondaryName] = useState("");
  const [selectedPrimaryId, setSelectedPrimaryId] = useState<number | "">("");
  
  // 모달 및 사이드바 상태
  const [showModal, setShowModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<number | undefined>();
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 2. 초기 로드
  useEffect(() => {
    fetchCategories();
    const user = localStorage.getItem("user");
    setIsLogin(!!user);
  }, []);

  const fetchCategories = () => {
    const data = loadCategoriesLS();
    setCategoryList(data);
  };

  const fetchProducts = () => {
    console.log("상품 목록 새로고침");
  };

  // 3. ID 생성 로직
  const getNextId = (cats: CategoryNode[]) => {
    let max = 0;
    cats.forEach(p => {
      max = Math.max(max, p.id);
      p.children?.forEach(c => max = Math.max(max, c.id));
    });
    return max + 1;
  };

  // 4. 카테고리 액션
  const createPrimary = () => {
    if (!primaryName.trim()) return alert("이름을 입력하세요.");
    const newList = [...categoryList, { id: getNextId(categoryList), name: primaryName, children: [] }];
    setCategoryList(newList);
    saveCategoriesLS(newList);
    setPrimaryName("");
  };

  const createSecondary = () => {
    if (!selectedPrimaryId || !secondaryName.trim()) return alert("1차 카테고리 선택 및 이름을 입력하세요.");
    const newList = categoryList.map(p => {
      if (p.id === selectedPrimaryId) {
        return { ...p, children: [...(p.children || []), { id: getNextId(categoryList), name: secondaryName }] };
      }
      return p;
    });
    setCategoryList(newList);
    saveCategoriesLS(newList);
    setSecondaryName("");
  };

  const deletePrimary = (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return;
    const newList = categoryList.filter(p => p.id !== id);
    setCategoryList(newList);
    saveCategoriesLS(newList);
  };

  const deleteSecondary = (pId: number, cId: number) => {
    const newList = categoryList.map(p => {
      if (p.id === pId) {
        return { ...p, children: (p.children || []).filter(c => c.id !== cId) };
      }
      return p;
    });
    setCategoryList(newList);
    saveCategoriesLS(newList);
  };

  return (
    <>
      <Header 
        isLogin={isLogin} 
        setIsLogin={setIsLogin} 
        onOpenModal={() => {
          setModalMode("create");
          setCurrentProductId(undefined);
          setShowModal(true);
        }} 
      />

      <PageWrapper>
        <SideBar/>
        <MainContentWrapper>
          <Content>
            <H1>카테고리 관리</H1>

            <ContentInner style={{ display: "grid", gap: 24 }}>
              {/* 1차 등록 */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <H5 style={{ margin: 0 }}>1차 카테고리 등록</H5>
                <Form.Control
                  style={{ maxWidth: 320 }}
                  value={primaryName}
                  onChange={(e) => setPrimaryName(e.target.value)}
                  placeholder="예: 의류, 잡화, 생활용품..."
                />
                <Button variant="primary" onClick={createPrimary}>
                  1차 추가
                </Button>
                <Button variant="outline-secondary" onClick={fetchCategories}>
                  새로고침
                </Button>
              </div>

              {/* 2차 등록 */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <H5 style={{ margin: 0 }}>2차 카테고리 등록</H5>
                <Form.Select
                  style={{ maxWidth: 260 }}
                  value={selectedPrimaryId}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSelectedPrimaryId(v === "" ? "" : Number(v));
                  }}
                >
                  <option value="">부모(1차) 선택</option>
                  {categoryList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control
                  style={{ maxWidth: 320 }}
                  value={secondaryName}
                  onChange={(e) => setSecondaryName(e.target.value)}
                  placeholder="예: 티셔츠, 셔츠, 바지..."
                />

                <Button variant="success" onClick={createSecondary}>
                  2차 추가
                </Button>
              </div>

              {/* 카테고리 목록/삭제 */}
              <div style={{ display: "grid", gap: 10 }}>
                {categoryList.length === 0 ? (
                  <P>등록된 카테고리가 없습니다. 위에서 1차/2차를 추가하세요.</P>
                ) : (
                  categoryList.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        border: "1px solid rgba(0,0,0,0.08)",
                        borderRadius: 10,
                        padding: 12,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <H5 style={{ margin: 0 }}>{p.name}</H5>
                        <P style={{ margin: 0, opacity: 0.7 }}>({p.id})</P>

                        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => setSelectedPrimaryId(p.id)}
                          >
                            2차 추가 대상 선택
                          </Button>
                          <Button size="sm" variant="outline-danger" onClick={() => deletePrimary(p.id)}>
                            1차 삭제
                          </Button>
                        </div>
                      </div>

                      <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {(p.children ?? []).length === 0 ? (
                          <P style={{ margin: 0 }}>2차 카테고리가 없습니다.</P>
                        ) : (
                          (p.children ?? []).map((c) => (
                            <div
                              key={c.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "6px 10px",
                                border: "1px solid rgba(0,0,0,0.08)",
                                borderRadius: 999,
                              }}
                            >
                              <span style={{ fontSize: 14 }}>{c.name}</span>
                              <span style={{ fontSize: 12, opacity: 0.6 }}>({c.id})</span>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => deleteSecondary(p.id, c.id)}
                                style={{ padding: "2px 8px" }}
                              >
                                삭제
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ContentInner>
          </Content>

          <ProductModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSaved={() => {
              setShowModal(false);
              fetchProducts();
              fetchCategories();
            }}
            productId={currentProductId}
            mode={modalMode}
            isLogin={isLogin ?? false}
          />
        </MainContentWrapper>
      </PageWrapper>
    </>
  );
}