"use client";

import { useState } from "react";
import Link from "next/link";
import * as S from "@/styled/Login.styles";
import api from "@/lib/axios";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import Header from "@/include/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<{
    show: boolean;
    title?: string;
    message?: string;
    variant?: "success" | "danger" | "info";
    delayMs?: number;
    autohide?: boolean;
  }>({ show: false });

  const showToast = (opts: {
    title?: string;
    message?: string;
    variant?: "success" | "danger" | "info";
    delayMs?: number;
    autohide?: boolean;
  }) => {
    setToast((prev) => ({ ...prev, ...opts, show: true }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      showToast({
        title: "입력 확인",
        message: "이메일과 비밀번호를 입력해 주세요.",
        variant: "info",
      });
      return;
    }

    try {
      // ✅ 세션 로그인 (🔥 이 옵션이 핵심)
      await api.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      showToast({
        title: "",
        message: "로그인 성공",
        variant: "success",
        delayMs: 1400,
        autohide: true,
      });

      // ✅ Header 다시 마운트
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const data = err.response?.data;
        console.error("login error:", status, data ?? err.message);

        if (!err.response) {
          showToast({
            title: "서버 연결 실패",
            message: "백엔드(9999) 실행 상태를 확인해 주세요.",
            variant: "danger",
            delayMs: 3200,
            autohide: true,
          });
          return;
        }

        const msg =
          (typeof data === "string" && data.trim()) ||
          (data && typeof data === "object" && "message" in data && String((data as any).message)) ||
          `로그인 실패 (status: ${status})`;

        showToast({
          title: "로그인 실패",
          message: msg,
          variant: "danger",
          delayMs: 3200,
          autohide: true,
        });
        return;
      }

      console.error(err);
      showToast({
        title: "로그인 실패",
        message: "알 수 없는 오류가 발생했습니다.",
        variant: "danger",
        delayMs: 3200,
        autohide: true,
      });
    }
  };

  return (
    <>
      <Header
        onOpenModal={() => {}}
        isLogin={false}
        setIsLogin={() => {}}
      />
      <S.Wrapper>
      <ToastContainer
        position="top-center"
        className="p-3"
        style={{ zIndex: 9999, marginTop: 72 }}
      >
        <Toast
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          show={toast.show}
          delay={toast.delayMs ?? (toast.variant === "success" ? 2000 : 3200)}
          autohide={toast.autohide ?? true}
          bg="light"
          className="login-toast"
        >
          {!!toast.title && (
            <Toast.Header closeButton>
              <strong className="me-auto">{toast.title}</strong>
            </Toast.Header>
          )}
          {!!toast.message && (
            <Toast.Body>
              <div className="login-toast__msg">{toast.message}</div>
            </Toast.Body>
          )}
        </Toast>
      </ToastContainer>
      <S.Card>
        <S.Right>
          <S.Title>로그인</S.Title>

          <S.Form onSubmit={handleSubmit}>
            <S.Label>아이디(이메일)</S.Label>
            <S.Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <S.Label>비밀번호</S.Label>
            <S.Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <S.Button type="submit">로그인</S.Button>
          </S.Form>

          <S.DaonText>DAON</S.DaonText>
          <S.FooterLinks>
            <Link href="/member">회원가입</Link>
            <span className="sep">|</span>
            <Link href="/forgot">아이디/비밀번호 찾기 &gt;</Link>
          </S.FooterLinks>
        </S.Right>
      </S.Card>
    </S.Wrapper>
    </>
  );
}
