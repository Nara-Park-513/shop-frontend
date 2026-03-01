"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";
import { Row, Col, Form } from "react-bootstrap";
import Header from "@/include/Header";

import {
  PageContainer,
  StyledCard,
  FormWrapper,
  FormTitle,
  FormLabel,
  AddressGroup,
  AddressButton,
  SubmitButton,
  FooterLinks,
} from "@/styled/Member.styles";

// ✅ 다음 주소 API 타입 선언
declare global {
  interface Window {
    daum: any;
  }
}

type Gender = "male" | "female" | "other" | "";

interface MemberForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  gender: Gender;
  companyName: string;
  position: string;
  tel: string;
  address: string;
  detailAddress: string;
}

export default function Member() {
  const router = useRouter();

  const [form, setForm] = useState<MemberForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    gender: "",
    companyName: "",
    position: "",
    tel: "",
    address: "",
    detailAddress: "",
  });

  /* =======================
     공통 입력 핸들러
  ======================= */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      gender: e.target.value as Gender,
    }));
  };

  /* =======================
     회원가입 제출
  ======================= */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.repeatPassword) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      await api.post(`/api/members/register`, form);

      alert("회원가입 성공 🎉");

      // ✅ 메인 페이지로 이동
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("회원가입 중 오류 발생");
    }
  };

  /* =======================
     주소 검색
  ======================= */
  const handleAddressSearch = () => {
    if (!window.daum || !window.daum.postcode) {
      alert("주소 검색 스크립트 로딩 중입니다");
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setForm((prev) => ({
          ...prev,
          address: data.address,
        }));
      },
    }).open();
  };

  return (
    <>
      <Header
        onOpenModal={() => {}}
        isLogin={false}
        setIsLogin={() => {}}
      />
      <PageContainer>
        <script
          src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          async
        />

        <StyledCard>
          <FormWrapper>
            <FormTitle>회원가입</FormTitle>

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col sm={6}>
                  <FormLabel>이름</FormLabel>
                  <Form.Control
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={6}>
                  <FormLabel>성</FormLabel>
                  <Form.Control
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <div className="mb-3">
                <FormLabel>이메일</FormLabel>
                <Form.Control
                  type="email"
                  placeholder="example@company.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <Row className="mb-3">
                <Col sm={6}>
                  <FormLabel>비밀번호</FormLabel>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={6}>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호 확인"
                    name="repeatPassword"
                    value={form.repeatPassword}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <div className="mb-3">
                <FormLabel>성별</FormLabel>
                <div className="d-flex gap-3">
                  {[
                    { value: "male", label: "남성" },
                    { value: "female", label: "여성" },
                    { value: "other", label: "기타" },
                  ].map(({ value, label }) => (
                    <Form.Check
                      key={value}
                      inline
                      type="radio"
                      label={label}
                      name="gender"
                      value={value}
                      checked={form.gender === value}
                      onChange={handleGenderChange}
                    />
                  ))}
                </div>
              </div>

              <Row className="mb-3">
                <Col sm={4}>
                  <FormLabel>회사명</FormLabel>
                  <Form.Control
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={4}>
                  <FormLabel>직급</FormLabel>
                  <Form.Control
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={4}>
                  <FormLabel>전화번호</FormLabel>
                  <Form.Control
                    placeholder="010-0000-0000"
                    name="tel"
                    value={form.tel}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <div className="mb-3">
                <FormLabel>주소</FormLabel>
                <AddressGroup>
                  <Form.Control
                    readOnly
                    placeholder="주소 검색"
                    name="address"
                    value={form.address}
                  />
                  <AddressButton type="button" onClick={handleAddressSearch}>
                    주소 검색
                  </AddressButton>
                </AddressGroup>
              </div>

              <div className="mb-4">
                <FormLabel>상세주소</FormLabel>
                <Form.Control
                  placeholder="상세주소"
                  name="detailAddress"
                  value={form.detailAddress}
                  onChange={handleChange}
                />
              </div>

              <SubmitButton type="submit">회원가입</SubmitButton>
            </Form>

            <FooterLinks>
              <Link href="/login">이미 계정이 있으신가요? 로그인</Link>
            </FooterLinks>
          </FormWrapper>
        </StyledCard>
      </PageContainer>
    </>
  );
}
