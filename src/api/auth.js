// src/api/auth.js

// 사용자 회원가입을 처리하는 API 함수
// userData 객체에는 회원가입 정보가 담겨 있어야 함 (이메일, 이름, 비밀번호 등)
export const registerUser = async (userData) => {
    try {
      // 서버로 POST 요청을 보냄
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // JSON 형식으로 데이터를 변환하여 전송
      });
      if (!response.ok) {
        // 응답이 성공적이지 않다면 에러를 던짐
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // JSON 형식으로 응답 받기
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error; // 컴포넌트로 에러 전달
    }
  };
  