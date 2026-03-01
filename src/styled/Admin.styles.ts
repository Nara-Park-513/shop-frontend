import styled from "styled-components";
import Link from "next/link";

/* 사이드바 컨테이너 */
export const Sidebar = styled.aside<{ $open?: boolean }>`
  width: 260px;
  min-width: 260px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1040;
  transition: transform 0.25s ease;
  overflow-y: auto;
  padding-bottom: 24px;

  @media (max-width: 991px) {
    transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  }
`;

export const SidebarOverlay = styled.div<{ $open?: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1035;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.25s ease;

  @media (max-width: 991px) {
    display: block;
  }
`;

export const SidebarTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const SidebarBrand = styled(Link)`
  font-size: 1.1rem;
  font-weight: 800;
  color: #fff;
  text-decoration: none;
  letter-spacing: -0.02em;

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const SidebarCloseButton = styled.button`
  all: unset;
  cursor: pointer;
  padding: 8px 12px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

export const SidebarNav = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
`;

export const SidebarSectionTitle = styled.div`
  padding: 12px 10px 6px 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(229, 231, 235, 0.6);
`;

export const SidebarLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 10px;
  border-radius: 10px;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(229,231,235,0.86)")};
  text-decoration: none;
  background: ${({ $active }) =>
    $active ? "rgba(59,130,246,0.18)" : "transparent"};
  border: 1px solid
    ${({ $active }) => ($active ? "rgba(59,130,246,0.35)" : "transparent")};
  transition: background 0.15s ease, border-color 0.15s ease,
    transform 0.08s ease;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 8px;
    bottom: 8px;
    width: 3px;
    border-radius: 999px;
    background: ${({ $active }) =>
      $active ? "linear-gradient(180deg, #60a5fa 0%, #a78bfa 100%)" : "transparent"};
    opacity: ${({ $active }) => ($active ? 1 : 0)};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const SidebarLinkLeft = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

export const SidebarLinkLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SidebarBadge = styled.span`
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 3px 7px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(16, 185, 129, 0.22);
  border: 1px solid rgba(16, 185, 129, 0.35);
`;

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const MainContentWrapper = styled.main`
  flex: 1;
  margin-left: 260px;
  background-color: #f4f6f9;
  padding: 20px;

  @media (max-width: 991px) {
    margin-left: 0;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const ContentInner = styled.div`
display:flex;
flex-wrap:wrap;
gap:48px;
margin-top:48px;
`;

export const ProductCard = styled.div`
  width: 200px;
  height: 320px;
  border: 1px solid #ddd;
  padding: 15px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

export const ProductDetails = styled.div`
  h5 {
    margin-top: 15px;
    font-size: 16px;
  }
  p {
    margin-bottom: 0;
    font-size: 12px;
    color: #555;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  font-size: 12px;
  border: none;
  cursor: pointer;
  &:first-child {
    background-color: #007bff;
    color: white;
  }
  &:last-child {
    background-color: #dc3545;
    color: white;
  }
`;

export const H1 = styled.h1`
font-size:24px;
font-weight:800;
letter-spacing:-3%;
margin:10px 0px;
`;
export const H2 = styled.h2`
font-size:22px;
font-weight:800;
letter-spacing:-3%;
margin:10px 0px;
`;
export const H3 = styled.h3`
font-size:20px;
font-weight:700;
letter-spacing:-3%;
margin:10px 0px;
`;
export const H4 = styled.h4`
font-size:18px;
font-weight:700;
letter-spacing:-3%;
margin:10px 0px;
`;
export const H5 = styled.h5`
font-size:16px;
font-weight:600;
letter-spacing:-3%;
margin:10px 0px;
`;
export const H6 = styled.h6`
font-size:14px;
font-weight:500;
letter-spacing:-3%;
margin:10px 0px;
`;

export const P = styled.p`
font-size:12px;
font-weight:400;
letter-spacing:-3%;
`;

export const Pprice = styled.p`
font-size:12px;
font-weight:600;
letter-spacing:-3%;
`;