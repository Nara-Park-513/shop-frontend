"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    // 🔥 나중에 API 연결
    alert("로그인 성공 (API 연결 전)");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <label className={styles.label}>Your email</label>
        <input
          className={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>Password</label>
        <div className={styles.passwordBox}>
          <input
            className={styles.input}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className={styles.eye}
            onClick={() => setShow(!show)}
          >
            👁
          </span>
        </div>

        <div className={styles.forgot}>Forgot your password?</div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.loginBtn} onClick={handleLogin}>
          Login
        </button>

        <div className={styles.divider}>Don’t have an account?</div>

        <button
          className={styles.signupBtn}
          onClick={() => router.push("/member")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
