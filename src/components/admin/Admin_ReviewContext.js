import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ReviewProcessContext = createContext();

export const useReviewProcess = () => useContext(ReviewProcessContext);

const initialReviewData = {
    name: '', // 리뷰 이름
    targetType: '', // 대상자
    target: '', // 구체적인 대상
    templateType: '', // 기본 템플릿 유형
    contentVisibility: '', // 리뷰 내용 공개 설정
    authorVisibility: '', // 작성자 이름 공개 설정
    startDate: '', // 리뷰 시작일
    endDate: '' // 리뷰 종료일
};

export const ReviewProcessProvider = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [reviewData, setReviewData] = useState(initialReviewData);
    const steps = [
        { name: '이름', path: '/admin/review/name' },
        { name: '대상자', path: '/admin/review/target' },
        { name: '템플릿 선택', path: '/admin/review/template' },
        { name: '공개 설정', path: '/admin/review/visibility' },
        { name: '결과 공유', path: '/admin/review/share' },
        { name: '일정', path: '/admin/review/date' }
    ];

    const goNext = () => {
        const nextStep = Math.min(currentStep + 1, steps.length - 1);
        setCurrentStep(nextStep);
    };
    
    const goBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const updateReviewData = (newData) => {
        setReviewData(prevData => {
            const updatedData = { ...prevData, ...newData };
            console.log('Updated review data:', updatedData); // 상태 업데이트 직후 로그를 찍는 위치 변경
            return updatedData;
        });
    };
    

    const submitReviewData = async () => {
        try {
            console.log('Submitting data:', reviewData);
            const response = await axios.post('/api/reviews', reviewData);
            console.log('Response:', response); // 성공적인 응답 로그
            alert('리뷰가 성공적으로 저장되었습니다!');
            resetReviewProcess();  // 리뷰 프로세스를 초기 상태로 리셋
        } catch (error) {
            console.error('Error submitting review data:', error);
            alert('리뷰 저장에 실패했습니다.');
        }
    };

    const resetReviewProcess = () => {
        setCurrentStep(0);
        setReviewData(initialReviewData);
    };

    return (
        <ReviewProcessContext.Provider value={{
            steps,
            currentStep,
            reviewData,
            goNext,
            goBack,
            updateReviewData,
            submitReviewData,
            resetReviewProcess
        }}>
            {children}
        </ReviewProcessContext.Provider>
    );
};
