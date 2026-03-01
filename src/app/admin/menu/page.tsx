"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Header from "@/include/Header";
import SideBar from "../include/SideBar";
import {
  PageWrapper,
  MainContentWrapper,
  Content,
  H1,
  H5,
  ContentInner,
  P,
} from "@/styled/Admin.styles";

const MENU_LS_KEY = "nav_menus";

type MenuNode = {
  id: number;
  name: string;
  path?: string; // 3차 메뉴에서 사용
  children?: MenuNode[];
};

const loadMenusLS = (): MenuNode[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MENU_LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const saveMenusLS = (menus: MenuNode[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(MENU_LS_KEY, JSON.stringify(menus));
};

const nextMenuIdFrom = (menus: MenuNode[]) => {
  let max = 0;
  const walk = (nodes: MenuNode[]) => {
    for (const n of nodes) {
      max = Math.max(max, n.id);
      if (n.children?.length) walk(n.children);
    }
  };
  walk(menus);
  return max + 1;
};

const API_BASE = `/api`;

export default function NavMenuPage() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [menuList, setMenuList] = useState<MenuNode[]>([]);

  // ✅ 입력값 (1/2/3차)
  const [menu1Name, setMenu1Name] = useState("");
  const [menu2Name, setMenu2Name] = useState("");
  const [menu3Name, setMenu3Name] = useState("");
  const [menu3Path, setMenu3Path] = useState("");

  // ✅ 선택값
  const [selectedMenu1Id, setSelectedMenu1Id] = useState<number | "">("");
  const [selectedMenu2Id, setSelectedMenu2Id] = useState<number | "">("");

  const selectedMenu1 = useMemo(
    () => menuList.find((m) => m.id === Number(selectedMenu1Id)),
    [menuList, selectedMenu1Id]
  );

  const selectedMenu2 = useMemo(
    () => selectedMenu1?.children?.find((m) => m.id === Number(selectedMenu2Id)),
    [selectedMenu1, selectedMenu2Id]
  );

  const checkLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
      setIsLogin(res.ok);
    } catch (err) {
      console.error("로그인 체크 실패", err);
      setIsLogin(false);
    }
  };

  const fetchMenus = () => {
    const ls = loadMenusLS();
    setMenuList(ls);
  };

  const createMenu1 = () => {
    const name = menu1Name.trim();
    if (!name) return alert("1차 메뉴명을 입력하세요.");

    setMenuList((prev) => {
      const id = nextMenuIdFrom(prev);
      const next = [...prev, { id, name, children: [] }];
      saveMenusLS(next);
      return next;
    });
    setMenu1Name("");
  };

  const createMenu2 = () => {
    const name = menu2Name.trim();
    if (!name) return alert("2차 메뉴명을 입력하세요.");
    if (selectedMenu1Id === "") return alert("1차 메뉴를 선택하세요.");

    const parentId = Number(selectedMenu1Id);

    setMenuList((prev) => {
      const id = nextMenuIdFrom(prev);
      const next = prev.map((m1) => {
        if (m1.id !== parentId) return m1;
        const children = m1.children ?? [];
        return { ...m1, children: [...children, { id, name, children: [] }] };
      });
      saveMenusLS(next);
      return next;
    });
    setMenu2Name("");
  };

  const createMenu3 = () => {
    const name = menu3Name.trim();
    const path = menu3Path.trim();
    if (!name) return alert("3차 메뉴명을 입력하세요.");
    if (!path) return alert("3차 메뉴 경로(path)를 입력하세요.");
    if (!path.startsWith("/")) return alert("경로는 '/' 로 시작해야 합니다. 예: /admin");
    if (selectedMenu1Id === "") return alert("1차 메뉴를 선택하세요.");
    if (selectedMenu2Id === "") return alert("2차 메뉴를 선택하세요.");

    const menu1Id = Number(selectedMenu1Id);
    const menu2Id = Number(selectedMenu2Id);

    setMenuList((prev) => {
      const id = nextMenuIdFrom(prev);
      const next = prev.map((m1) => {
        if (m1.id !== menu1Id) return m1;
        const children = m1.children ?? [];
        return {
          ...m1,
          children: children.map((m2) => {
            if (m2.id !== menu2Id) return m2;
            const grandchildren = m2.children ?? [];
            return { ...m2, children: [...grandchildren, { id, name, path }] };
          }),
        };
      });
      saveMenusLS(next);
      return next;
    });

    setMenu3Name("");
    setMenu3Path("");
  };

  const deleteMenu1 = (menu1Id: number) => {
    if (!confirm("1차 메뉴를 삭제할까요? (하위 메뉴도 함께 삭제됩니다)")) return;
    setMenuList((prev) => {
      const next = prev.filter((m) => m.id !== menu1Id);
      saveMenusLS(next);
      return next;
    });
    setSelectedMenu1Id((prev) => (prev === menu1Id ? "" : prev));
    setSelectedMenu2Id("");
  };

  const deleteMenu2 = (menu1Id: number, menu2Id: number) => {
    if (!confirm("2차 메뉴를 삭제할까요? (하위 3차도 함께 삭제됩니다)")) return;
    setMenuList((prev) => {
      const next = prev.map((m1) => {
        if (m1.id !== menu1Id) return m1;
        return { ...m1, children: (m1.children ?? []).filter((m2) => m2.id !== menu2Id) };
      });
      saveMenusLS(next);
      return next;
    });
    setSelectedMenu2Id((prev) => (prev === menu2Id ? "" : prev));
  };

  const deleteMenu3 = (menu1Id: number, menu2Id: number, menu3Id: number) => {
    if (!confirm("3차 메뉴를 삭제할까요?")) return;
    setMenuList((prev) => {
      const next = prev.map((m1) => {
        if (m1.id !== menu1Id) return m1;
        return {
          ...m1,
          children: (m1.children ?? []).map((m2) => {
            if (m2.id !== menu2Id) return m2;
            return { ...m2, children: (m2.children ?? []).filter((m3) => m3.id !== menu3Id) };
          }),
        };
      });
      saveMenusLS(next);
      return next;
    });
  };

  useEffect(() => {
    fetchMenus();
    checkLogin();
  }, []);

  return (
    <PageWrapper className="admin-theme">
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <MainContentWrapper>
        <Header
          onOpenModal={() => {}}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <Content>
          <H1>메뉴 관리</H1>

          <ContentInner style={{ display: "grid", gap: 12 }}>
            {/* 1차 등록 */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <H5 style={{ margin: 0 }}>1차 메뉴 등록</H5>
              <Form.Control
                style={{ maxWidth: 320 }}
                value={menu1Name}
                onChange={(e) => setMenu1Name(e.target.value)}
                placeholder="예: 쇼핑, 고객센터, 이벤트..."
              />
              <Button variant="primary" onClick={createMenu1}>
                1차 추가
              </Button>
              <Button variant="outline-secondary" onClick={fetchMenus}>
                새로고침
              </Button>
            </div>

            {/* 2차 등록 */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <H5 style={{ margin: 0 }}>2차 메뉴 등록</H5>
              <Form.Select
                style={{ maxWidth: 260 }}
                value={selectedMenu1Id}
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedMenu1Id(v === "" ? "" : Number(v));
                  setSelectedMenu2Id("");
                }}
              >
                <option value="">부모(1차) 선택</option>
                {menuList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Control
                style={{ maxWidth: 320 }}
                value={menu2Name}
                onChange={(e) => setMenu2Name(e.target.value)}
                placeholder="예: 상품, 카테고리, 공지사항..."
              />
              <Button variant="success" onClick={createMenu2}>
                2차 추가
              </Button>
            </div>

            {/* 3차 등록 */}
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <H5 style={{ margin: 0 }}>3차 메뉴 등록</H5>
              <Form.Select
                style={{ maxWidth: 260 }}
                value={selectedMenu1Id}
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedMenu1Id(v === "" ? "" : Number(v));
                  setSelectedMenu2Id("");
                }}
              >
                <option value="">1차 선택</option>
                {menuList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                style={{ maxWidth: 260 }}
                value={selectedMenu2Id}
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedMenu2Id(v === "" ? "" : Number(v));
                }}
                disabled={!selectedMenu1}
              >
                <option value="">2차 선택</option>
                {(selectedMenu1?.children ?? []).map((m2) => (
                  <option key={m2.id} value={m2.id}>
                    {m2.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Control
                style={{ maxWidth: 240 }}
                value={menu3Name}
                onChange={(e) => setMenu3Name(e.target.value)}
                placeholder="3차 메뉴명"
              />
              <Form.Control
                style={{ maxWidth: 260 }}
                value={menu3Path}
                onChange={(e) => setMenu3Path(e.target.value)}
                placeholder="경로 예: /admin/menu"
              />
              <Button variant="warning" onClick={createMenu3}>
                3차 추가
              </Button>
            </div>

            {/* 목록 */}
            <div style={{ display: "grid", gap: 10 }}>
              {menuList.length === 0 ? (
                <P>등록된 메뉴가 없습니다. 위에서 1차/2차/3차를 추가하세요.</P>
              ) : (
                menuList.map((m1) => (
                  <div
                    key={m1.id}
                    style={{
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 10,
                      padding: 12,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <H5 style={{ margin: 0 }}>{m1.name}</H5>
                      <P style={{ margin: 0, opacity: 0.7 }}>({m1.id})</P>

                      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => {
                            setSelectedMenu1Id(m1.id);
                            setSelectedMenu2Id("");
                          }}
                        >
                          선택
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => deleteMenu1(m1.id)}>
                          1차 삭제
                        </Button>
                      </div>
                    </div>

                    <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                      {(m1.children ?? []).length === 0 ? (
                        <P style={{ margin: 0 }}>2차 메뉴가 없습니다.</P>
                      ) : (
                        (m1.children ?? []).map((m2) => (
                          <div
                            key={m2.id}
                            style={{
                              border: "1px solid rgba(0,0,0,0.06)",
                              borderRadius: 10,
                              padding: 10,
                            }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}
                            >
                              <strong style={{ fontSize: 14 }}>{m2.name}</strong>
                              <span style={{ fontSize: 12, opacity: 0.6 }}>({m2.id})</span>

                              <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={() => {
                                    setSelectedMenu1Id(m1.id);
                                    setSelectedMenu2Id(m2.id);
                                  }}
                                >
                                  3차 추가 대상 선택
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => deleteMenu2(m1.id, m2.id)}
                                >
                                  2차 삭제
                                </Button>
                              </div>
                            </div>

                            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                              {(m2.children ?? []).length === 0 ? (
                                <P style={{ margin: 0 }}>3차 메뉴가 없습니다.</P>
                              ) : (
                                (m2.children ?? []).map((m3) => (
                                  <div
                                    key={m3.id}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 8,
                                      padding: "6px 10px",
                                      border: "1px solid rgba(0,0,0,0.08)",
                                      borderRadius: 999,
                                    }}
                                  >
                                    <span style={{ fontSize: 14 }}>{m3.name}</span>
                                    <span style={{ fontSize: 12, opacity: 0.7 }}>{m3.path}</span>
                                    <Button
                                      size="sm"
                                      variant="outline-danger"
                                      onClick={() => deleteMenu3(m1.id, m2.id, m3.id)}
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
                  </div>
                ))
              )}
            </div>

            {/* 현재 선택 정보 */}
            <div style={{ marginTop: 6 }}>
              <P style={{ margin: 0, opacity: 0.75 }}>
                현재 선택:{" "}
                {selectedMenu1 ? (
                  <>
                    1차 <strong>{selectedMenu1.name}</strong>
                  </>
                ) : (
                  "1차 없음"
                )}
                {" / "}
                {selectedMenu2 ? (
                  <>
                    2차 <strong>{selectedMenu2.name}</strong>
                  </>
                ) : (
                  "2차 없음"
                )}
              </P>
            </div>
          </ContentInner>
        </Content>
      </MainContentWrapper>
    </PageWrapper>
  );
}
