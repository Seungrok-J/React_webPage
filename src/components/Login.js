import React, { useState } from 'react';
import axios from 'axios'; // axios 임포트
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // loginUser API 함수를 axios 사용으로 대체
      const response = await axios.post('/api/login', { email, password });
      console.log("로그인 성공, 받은 데이터:", response.data);

      onLoginSuccess(); // 로그인 성공 처리

      // 사용자 역할에 따라 다른 페이지로 리디렉션
      if (response.data.role === 'admin') {
        navigate('/admin'); // 관리자 페이지로 이동
      } else if (response.data.role === 'user') {
        navigate('/main'); // 일반 사용자 페이지로 이동
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("로그인 실패: 이메일 또는 비밀번호가 잘못되었습니다.");
      } else {
        alert("로그인 실패: 서버 에러");
      }
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-header">로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">로그인</button>
        <p className="login-text">
          계정이 없으신가요? <a href="/register">회원가입</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
