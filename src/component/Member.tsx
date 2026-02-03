"use client";

import { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

export default function Member() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "" // 별명 추가
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    console.log("서버로 보낼 데이터:", formData);
  };

  return (
    // bg-light로 배경색을 주고 min-vh-100으로 화면 높이를 꽉 채웁니다.
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            {/* shadow-sm으로 살짝 그림자를 주어 입체감을 높임 */}
            <Card className="border-0 shadow-sm p-3">
              <Card.Body>
                <div className="text-center mb-4">
                  <h3 className="fw-bold">회원가입</h3>
                  <p className="text-muted small">My Shop의 회원이 되어보세요!</p>
                </div>

                <Form onSubmit={handleSignup}>
                  {/* 이메일 */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold">이메일</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="name@example.com" 
                      required
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </Form.Group>

                  {/* 닉네임 */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold">닉네임</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="멋진 이름을 정해주세요" 
                      required
                      onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    />
                  </Form.Group>

                  {/* 비밀번호 */}
                  <Form.Group className="mb-3">
                    <Form.Label className="small fw-semibold">비밀번호</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="8자 이상 입력" 
                      required
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </Form.Group>

                  {/* 비밀번호 확인 */}
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-semibold">비밀번호 확인</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="다시 한번 입력" 
                      required
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                  </Form.Group>

                  <Button variant="dark" type="submit" className="w-100 py-2 fw-bold">
                    가입 완료
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <span className="text-muted small">이미 계정이 있으신가요? </span>
                  <a href="/login" className="small text-decoration-none">로그인하기</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}