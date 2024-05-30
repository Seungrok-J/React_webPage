import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'; // useNavigate 훅 import
import ReviewSidebar from './Admin_ReviewSidebar';
import { useReviewProcess } from './Admin_ReviewContext';

import './Admin_ReviewName.css'; // CSS 파일 임포트

function ReviewNamePage() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation(); // 현재 경로를 가져오기 위해 useLocation 훅 사용
  const { reviewData, updateReviewData, goNext, resetReviewProcess, steps, currentStep } = useReviewProcess();
  const [name, setName] = useState(reviewData.name);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // 현재 스텝이 변경될 때마다 적절한 경로로 이동
    const targetPath = steps[currentStep]?.path; // 안전하게 경로를 가져옵니다.
    if (currentStep < steps.length && location.pathname !== targetPath) {
      navigate(targetPath);
    }
  }, [currentStep, navigate, steps, location.pathname]); // location.pathname 의존성 추가
  

  const handleNext = () => {
    if (!name.trim()) {
        setErrorMessage('리뷰 이름을 지정해주세요.');
        return;
    }
    updateReviewData({ name });
    goNext();
    setErrorMessage('');
};

  const handleCancel = () => {
    if (window.confirm("작업을 떠나실건가요?")) {
      resetReviewProcess();  // 모든 리뷰 프로세스 데이터와 단계 초기화
      navigate('/admin/review-management');
    }
  };


  return (
    <div className="review-name-page">
      <header className="review-name-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button className="close-button" onClick={handleCancel}>
              <i className="fas fa-times"></i> {/* FontAwesome 아이콘 사용 */}
            </button>
            <h1 className="review-title">{name || '이름없는 리뷰'}</h1>
            <button className="btn btn-primary" onClick={handleNext}>
              저장 후 다음
            </button>
          </div>
        </div>
      </header>
      <div className="row g-0">
        <ReviewSidebar />
        <div className="col-md-9">
          <main className="review-content">
            <h1 style={{ marginBottom: '15px' }}>리뷰의 이름을 지어주세요.</h1>
            <p style={{ marginBottom: '30px' }}>리뷰 이름은 구성원들에게 노출됩니다. 구성원들이 인지하기 쉬운 이름으로 지어주세요.</p>
            <p>이름</p>
            <input
              type="text"
              className="form-control"
              placeholder="머디버디 핵심프로젝트 360도 피드백"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* 에러 메시지 표시 */}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ReviewNamePage;
