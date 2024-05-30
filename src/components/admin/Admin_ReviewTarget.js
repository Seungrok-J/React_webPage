import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useReviewProcess } from './Admin_ReviewContext';
import ReviewSidebar from './Admin_ReviewSidebar';
import './Admin_ReviewTarget.css'
function ReviewTargetPage() {
  const navigate = useNavigate();
  const { reviewData, updateReviewData, resetReviewProcess, goNext, goBack, steps, currentStep } = useReviewProcess();
  const [targetType, setTargetType] = useState('all'); // 'all' or 'specific'
  const [selectedTargets, setSelectedTargets] = useState([]); // 추가된 상태
  const [members, setMembers] = useState([]); // 구성원 목록 상태 추가
  const [name] = useState(reviewData.name);

  useEffect(() => {
    // 특정 구성원 타입이 선택되었을 때 API 호출
    if (targetType === 'specific') {
      fetchMembers();
    }
  }, [targetType]);

  // 구성원 데이터를 서버로부터 불러오는 함수
  const fetchMembers = async () => {
    try {
      const response = await axios.get('/api/members');
      setMembers(response.data); // 데이터를 상태에 저장
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  const handleNext = () => {
    if (targetType === 'specific' && selectedTargets.length === 0) {
      alert('특정 구성원을 선택해주세요.');
      return;
    }
    updateReviewData({ targetType, target: selectedTargets.join(', ') });
    goNext();
    navigate(steps[currentStep + 1].path);
  };
  const handleBack = () => {
    goBack();
    navigate(steps[currentStep - 1].path);
  };

  const handleOptionChange = (e) => {
    setTargetType(e.target.value);
    if (e.target.value === 'all') {
      setSelectedTargets([]);
    }
  };
  const handleTargetChange = (e) => {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedTargets(value);
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
            <h1 style={{ marginBottom: '30px', fontWeight: 'bold' }}>리뷰 대상자를 선택하세요.</h1>
            <form>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="targetType"
                    value="all"
                    checked={targetType === 'all'}
                    onChange={handleOptionChange}
                  />
                  모든 구성원
                </label>
              </div>
              <div className="review-form-group">
                <label>
                  <input
                    className="review-radio"
                    type="radio"
                    name="targetType"
                    value="specific"
                    checked={targetType === 'specific'}
                    onChange={handleOptionChange}
                  />
                  특정 구성원
                </label>
              </div>
              {/* Radio buttons for all or specific */}
              {/* Specific target selection */}
              {targetType === 'specific' && (
                <select multiple onChange={handleTargetChange}>
                  {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              )}
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ReviewTargetPage;
