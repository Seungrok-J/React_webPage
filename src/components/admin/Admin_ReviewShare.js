import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReviewProcess } from './Admin_ReviewContext';
import ReviewSidebar from './Admin_ReviewSidebar';
import './Admin_ReviewTarget.css'
function ReviewSharePage() {
  const navigate = useNavigate();
  const { reviewData, updateReviewData, resetReviewProcess, goNext, goBack, steps, currentStep } = useReviewProcess();
  const [reviewShareType, setReviewShareType] = useState(reviewData.reviewShareType || 'leader_share'); // 초기값 설정: 'leader_share' 또는 'admin_share'
  const [name] = useState(reviewData.name);

  const handleNext = () => {
    if (!reviewShareType) {
      alert('공유 방식을 선택해주세요.');
      return;
    }
    updateReviewData({ reviewShareType });
    goNext();
    navigate(steps[currentStep + 1].path);
  };

  const handleBack = () => {
    goBack();
    navigate(steps[currentStep - 1].path);
  };

  const handleOptionChange = (e) => {
    setReviewShareType(e.target.value);
    updateReviewData({ reviewShareType: e.target.value });
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
            <button style={{ marginRight: '10px' }} className="btn btn-secondary" onClick={handleBack}>뒤로 가기</button>
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
            <h1 style={{ marginBottom: '30px', fontWeight: 'bold' }}>리뷰 결과를 공유할 방식을 선택하세요</h1>
            <form>
              <div className="review-form-group">
                <label className="reviewLabel">
                  <input
                    className="review-radio"
                    type="radio"
                    name="reviewShareType"
                    value="leader_share"
                    checked={reviewShareType === 'leader_share'}
                    onChange={handleOptionChange}
                  />
                  리더가 공유 : 
                  어드민이 리더에게 공유 후 리더가 대상자에게 공유합니다.
                </label>
              </div>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="reviewShareType"
                    value="admin_share"
                    checked={reviewShareType === 'admin_share'}
                    onChange={handleOptionChange}
                  />

                  어드민이 바로 공유 : 
                  어드민이 리더와 리뷰 대상자에게 리뷰 결과를 공유합니다.
                </label>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ReviewSharePage;
