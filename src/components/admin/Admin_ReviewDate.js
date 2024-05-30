import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import ReviewSidebar from './Admin_ReviewSidebar';
import { useReviewProcess } from './Admin_ReviewContext';


function ReviewDatePage() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { reviewData, updateReviewData,goBack, resetReviewProcess, steps, currentStep } = useReviewProcess();
  const [name] = useState(reviewData.name);
  const [startDate, setStartDate] = useState(reviewData.startDate || ''); // 시작일
  const [endDate, setEndDate] = useState(reviewData.endDate || ''); // 종료일
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const targetPath = steps[currentStep]?.path;
    // 현재 URL과 목표 URL이 다를 때만 네비게이션 실행
    if (targetPath && window.location.pathname !== targetPath) {
      navigate(targetPath);
    }
  }, [currentStep, navigate, steps]);
  

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      setErrorMessage('시작일과 종료일을 모두 지정해주세요.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage('종료일이 시작일보다 빠를 수 없습니다.');
      return;
    }
    updateReviewData({ startDate, endDate });
    if (window.confirm("리뷰를 생성하시겠습니까?")) {
      console.log("리뷰 데이터:", reviewData);
      //goNext();
      navigate('/admin/review-management'); // 사용자를 관리 페이지로 리디렉션
      resetReviewProcess();  // 모든 리뷰 프로세스 데이터와 단계 초기화
    }
  };

  const handleCancel = () => {
    if (window.confirm("작업을 떠나실건가요?")) {
      resetReviewProcess();  // 모든 리뷰 프로세스 데이터와 단계 초기화
      navigate('/admin/review-management');
    }
  };

  const handleBack = () => {
    goBack();
    navigate(steps[currentStep - 1].path);
  };

  return (
      <div className="review-name-page">
      <header className="review-name-header">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button className="close-button" onClick={handleCancel}>
              <i className="fas fa-times"></i>
            </button>
            <h1 className="review-title">{name || '이름없는 리뷰'}</h1>
            <button style={{ marginRight: '10px' }} className="btn btn-secondary" onClick={handleBack}>뒤로 가기</button>
            <button className="btn btn-primary" onClick={handleSubmit}>제출</button>
          </div>
        </div>
      </header>
      <div className="row g-0">
        <ReviewSidebar />
        <div className="col-md-9">
          <main className="review-content">
            <h1 style={{ marginBottom: '15px', fontWeight: 'bold' }}>리뷰 일정 설정</h1>
            <p>시작일</p>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p>종료일</p>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </main>
        </div>
      </div>
    </div>

  );
}

export default ReviewDatePage;
