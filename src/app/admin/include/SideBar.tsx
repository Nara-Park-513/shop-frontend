"use client";

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarBrand,
  SidebarNav,
  SidebarLink,
  SidebarSectionTitle,
  SidebarOverlay,
  SidebarTopRow,
  SidebarCloseButton,
  SidebarLinkLeft,
  SidebarLinkLabel,
  SidebarBadge,
} from "@/styled/Admin.styles";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export default function SideBar({ open = false, onClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      <SidebarOverlay $open={open} onClick={onClose} />
      <Sidebar $open={open}>
        <SidebarTopRow>
          <SidebarBrand href="/admin" onClick={onClose}>
            Shop Admin
          </SidebarBrand>
          <SidebarCloseButton type="button" onClick={onClose} aria-label="사이드바 닫기">
            닫기
          </SidebarCloseButton>
        </SidebarTopRow>

        <SidebarSectionTitle>관리</SidebarSectionTitle>
        <SidebarNav>
          <li>
            <SidebarLink
              href="/admin"
              $active={pathname === "/admin"}
              onClick={onClose}
            >
              <SidebarLinkLeft>
                <SidebarLinkLabel>대시보드</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
          <li>
            <SidebarLink
              href="/admin/cate"
              $active={pathname?.startsWith("/admin/cate")}
              onClick={onClose}
            >
              <SidebarLinkLeft>
                <SidebarLinkLabel>카테고리 등록</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
          <li>
            <SidebarLink
              href="/admin/menu"
              $active={pathname?.startsWith("/admin/menu")}
              onClick={onClose}
            >
              <SidebarLinkLeft>
                <SidebarLinkLabel>메뉴 등록</SidebarLinkLabel>
              </SidebarLinkLeft>
              <SidebarBadge>NEW</SidebarBadge>
            </SidebarLink>
          </li>
        </SidebarNav>

        <SidebarSectionTitle>바로가기</SidebarSectionTitle>
        <SidebarNav>
          <li>
            <SidebarLink href="/" $active={pathname === "/"} onClick={onClose}>
              <SidebarLinkLeft>
                <SidebarLinkLabel>메인</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
          <li>
            <SidebarLink
              href="/consumer"
              $active={pathname?.startsWith("/consumer")}
              onClick={onClose}
            >
              <SidebarLinkLeft>
                <SidebarLinkLabel>상품(소비자)</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
          <li>
            <SidebarLink href="/cart" $active={pathname?.startsWith("/cart")} onClick={onClose}>
              <SidebarLinkLeft>
                <SidebarLinkLabel>장바구니</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
          <li>
            <SidebarLink
              href="/orders"
              $active={pathname?.startsWith("/orders")}
              onClick={onClose}
            >
              <SidebarLinkLeft>
                <SidebarLinkLabel>주문</SidebarLinkLabel>
              </SidebarLinkLeft>
            </SidebarLink>
          </li>
        </SidebarNav>
      </Sidebar>
    </>
  );
}