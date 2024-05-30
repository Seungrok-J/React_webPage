import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReviewProcess } from './Admin_ReviewContext';
import ReviewSidebar from './Admin_ReviewSidebar';
import './Admin_ReviewTarget.css'
function ReviewTemplatePage() {
  const navigate = useNavigate();
  const { reviewData, updateReviewData, resetReviewProcess, goNext, goBack, steps, currentStep } = useReviewProcess();
  const [templateType, setTemplateType] = useState(reviewData.templateType || '역량리뷰'); // 초기값 설정: 'competence' 또는 'performance'
  const [name] = useState(reviewData.name);

  const handleNext = () => {
    if (!templateType) {
      alert('템플릿을 선택해주세요.');
      return;
    }
    updateReviewData({ templateType });
    goNext();
    navigate(steps[currentStep + 1].path);
  };

  const handleBack = () => {
    goBack();
    navigate(steps[currentStep - 1].path);
  };

  const handleOptionChange = (e) => {
    setTemplateType(e.target.value);
    updateReviewData({ templateType: e.target.value });
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
            <h1 style={{ marginBottom: '30px', fontWeight: 'bold' }}>템플릿을 선택하세요.</h1>
            <form>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="templateType"
                    value="역량리뷰"
                    checked={templateType === '역량리뷰'}
                    onChange={handleOptionChange}
                  />
                  역량리뷰
                </label>
              </div>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="templateType"
                    value="성과리뷰"
                    checked={templateType === '성과리뷰'}
                    onChange={handleOptionChange}
                  />
                  성과리뷰
                </label>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ReviewTemplatePage;
