"use client";

import { useState } from "react";
import styles from "./Member.module.css";

export default function Member() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!form.email || !form.password || !form.passwordConfirm) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await fetch("/api/members/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      const message = await res.text();
      alert(message);
    } catch (err: any) {
      setError(err.message || "회원가입 실패");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>

      <input
        className={styles.input}
        placeholder="이메일"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className={styles.input}
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <input
        className={styles.input}
        type="password"
        placeholder="비밀번호 확인"
        value={form.passwordConfirm}
        onChange={(e) =>
          setForm({ ...form, passwordConfirm: e.target.value })
        }
      />

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} onClick={handleSubmit}>
        가입하기
      </button>
    </div>
  );
}
