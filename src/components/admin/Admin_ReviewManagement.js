import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReviewManagement() {
    const [reviews, setReviews] = useState([
        { id: 1, title: '스마트인재개발원 핵심프로젝트 역량리뷰', date: '2024-05-29 ~ 06~05', status: '진행중', templateType : '역량리뷰' },
        { id: 2, title: '스마트인재개발원 핵심프로젝트 성과리뷰', date: '2024-05-29 ~ 06~05', status: '진행중',templateType : '성과리뷰' },
    ]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/reviews');
                setReviews(response.data);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
                // 에러 처리 로직 추가
            }
        };

        fetchReviews();
    }, []);

    const handleCreateNewReview = () => {
        navigate('/admin/review/name'); // 리뷰 이름 입력 페이지로 이동
    };

    const handleReviewClick = (id) => {
        navigate(`/admin/review/${id}/details`);
    };

    return (
        <div className="main-content">
            <div className="page-management-container">
                <header className="page-header">
                    <h1 className="page-title">리뷰 관리</h1>
                    <button className="button" onClick={handleCreateNewReview}>새로운 리뷰 만들기</button>
                </header>
                <div className="rtable-container">
                    <table>
                        <thead>
                            <tr>
                                <th>리뷰 이름</th>
                                <th>상태</th>
                                <th>템플릿 종류</th>
                                <th>리뷰 기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr key={review.id} onClick={() => handleReviewClick(review.id)}>
                                    <td>{review.title}</td>
                                    <td>{review.status}</td>
                                    <td>{review.templateType}</td>
                                    <td>{review.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ReviewManagement;
