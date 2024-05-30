import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerUser } from '../api/auth'; // API 함수 import
import  './Register.css';
function Register() {
  // 상태 관리용 Hooks
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); // 이름을 위한 상태 추가
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInvited, setIsInvited] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // URL 쿼리 파라미터에서 초대 토큰을 추출
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const inviteToken = searchParams.get('inviteToken');
    if (inviteToken) {
      // 초대 토큰이 있는 경우, 서버에서 초대 정보를 가져옴
      fetch(`/api/invite/${inviteToken}`)
        .then(response => response.json())
        .then(data => {
          setEmail(data.email);
          setIsInvited(true);
          if (data.name) {
            setName(data.name);
          }
        })
        .catch(error => console.error('Error fetching invite data:', error));
    }
  }, [location]);

  const handleRegister = async () => {
    // 비밀번호 확인 절차
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 회원가입 데이터 구성
    const payload = {
      email,
      name,
      password,
      userType: isInvited ? 'user' : 'admin'
    };

    try {
      // 회원가입 API 호출
      const result = await registerUser(payload);
      console.log("Registration successful", result);
      alert("회원가입 성공! 로그인 페이지로 이동하세요.");
      navigate('/'); // 로그인 페이지로 이동
    } catch (error) {
      alert("회원가입 실패: " + error.message);
    }
  };


  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className= "register-header">회원가입</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          disabled={isInvited}
        />
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          disabled={isInvited}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleRegister} className="register-button">
          회원가입
        </button>
        <button onClick={() => navigate('/')} className="register-button">
          로그인 화면으로
        </button>
      </div>
    </div>
  );
}

export default Register;
