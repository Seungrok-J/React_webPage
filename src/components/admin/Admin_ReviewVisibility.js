import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReviewProcess } from './Admin_ReviewContext';
import ReviewSidebar from './Admin_ReviewSidebar';
import './Admin_ReviewTarget.css'
function ReviewVisibilityPage() {
  const navigate = useNavigate();
  const { reviewData, updateReviewData, resetReviewProcess, goNext, goBack, steps, currentStep } = useReviewProcess();
  const [contentVisibility, setContentVisibility] = useState('allVisible'); // 리뷰 내용 공개 설정 초기값
  const [authorVisibility, setAuthorVisibility] = useState('anonymous'); // 작성자 이름 공개 설정 초기값
  const [name] = useState(reviewData.name);

  const handleNext = () => {
    updateReviewData({ contentVisibility, authorVisibility });
    goNext();
    navigate(steps[currentStep + 1].path);
  };

  const handleBack = () => {
    goBack();
    navigate(steps[currentStep - 1].path);
  };

  // const handleOptionChange = (e) => {
  //   setVisibleType(e.target.value);
  //   updateReviewData({ visibleType: e.target.value });
  //   nameVisibleType(e.target.value);
  //   setNameVisibleType({ visibleType: e.target.value });
  // };
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
            <h1 style={{ marginBottom: '15px', fontWeight: 'bold' }}>공개설정</h1>
            <p>리뷰 대상자에게 결과를 공유할 때 보이는 내용을 설정할 수 있습니다.</p>
            <form>
              <p style={{ fontWeight: 'bold' }}>리뷰 내용</p>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="contentVisibility"
                    value="allVisible"
                    checked={contentVisibility === 'allVisible'}
                    onChange={() => setContentVisibility('allVisible')}
                  />
                  리뷰 내용 공개
                </label>
              </div>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="contentVisibility"
                    value="noneVisible"
                    checked={contentVisibility === 'noneVisible'}
                    onChange={() => setContentVisibility('noneVisible')}
                  />
                  리뷰 내용 비공개
                </label>
              </div>
            </form>

            <form>
              <p style={{ fontWeight: 'bold' }}>작성자 이름</p>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="authorVisibility"
                    value="visibleToAll"
                    checked={authorVisibility === 'visibleToAll'}
                    onChange={() => setAuthorVisibility('visibleToAll')}
                  />
                  모두에게 이름 공개
                </label>
              </div>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="authorVisibility"
                    value="visibleToAdmin"
                    checked={authorVisibility === 'visibleToAdmin'}
                    onChange={() => setAuthorVisibility('visibleToAdmin')}
                  />
                  어드민에게만 이름 공개
                </label>
              </div>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="authorVisibility"
                    value="anonymous"
                    checked={authorVisibility === 'anonymous'}
                    onChange={() => setAuthorVisibility('anonymous')}
                  />
                  모두에게 이름 비공개(어드민에게도 익명)
                </label>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ReviewVisibilityPage;
