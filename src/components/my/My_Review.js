import React, { useState, useEffect } from 'react';
import { Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa'; // 검색 및 캘린더 아이콘 추가
import axios from 'axios';
import CompetencyReviewModal from '../admin/Admin_CompetencyReviewModal';
import PerformanceReviewModal from '../admin/Admin_PerformanceReviewModal';

function My_Review() {
    const [reviews, setReviews] = useState([
        { id: 1, name: '스마트인재개발원 핵심프로젝트 역량리뷰', target: '이양희', type: '역량', status: '대기중', deadline: '2024-06-05' },
        { id: 2, name: '스마트인재개발원 핵심프로젝트 역량리뷰', target: '양연정', type: '역량', status: '대기중', deadline: '2024-06-05' },
        { id: 3, name: '스마트인재개발원 핵심프로젝트 역량리뷰', target: '정승록', type: '역량', status: '대기중', deadline: '2024-06-05' },
        { id: 4, name: '스마트인재개발원 핵심프로젝트 성과리뷰', target: '이양희', type: '성과', status: '대기중', deadline: '2024-06-05' },
        { id: 5, name: '스마트인재개발원 핵심프로젝트 성과리뷰', target: '양연정', type: '성과', status: '대기중', deadline: '2024-06-05' },
        { id: 6, name: '스마트인재개발원 핵심프로젝트 성과리뷰', target: '정승록', type: '성과', status: '대기중', deadline: '2024-06-05' },
    ]);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDeadline, setFilterDeadline] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/reviews/my');
                setReviews(response.data);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const openReviewModal = (review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsModalOpen(false);
        setSelectedReview(null);
    };

    const handleReviewSubmission = (reviewData) => {
        const updatedReviews = reviews.map(review =>
            review.id === reviewData.id ? { ...review, status: '리뷰완료' } : review
        );

        setReviews(updatedReviews);
        alert('리뷰가 성공적으로 제출되었습니다.');
        closeReviewModal();
    };

    const updateReviewStatus = (reviewId, newStatus) => {
        const updatedReviews = reviews.map(review =>
            review.id === reviewId ? { ...review, status: newStatus } : review
        );
        setReviews(updatedReviews);
    };
    

    // const updateReviewStatus = (reviewId, status) => {
    //     const updatedReviews = reviews.map(review =>
    //         review.id === reviewId ? { ...review, status } : review
    //     );
    //     setReviews(updatedReviews);
    // };

    // // 리뷰 모달에서 제출 버튼 클릭 시 실행되는 함수
    // const handleReviewSubmission = (reviewData, type) => {
    //     let endpoint = '';
    //     let data = {};

    //     if (type === '역량') {
    //         endpoint = '/api/reviews/competency';
    //         data = { ...reviewData }; // 역량 리뷰 데이터를 그대로 사용
    //     } else if (type === '성과') {
    //         endpoint = '/api/reviews/performance';
    //         data = {
    //             scores: reviewData.scores,
    //             comments: reviewData.comments,
    //             additionalComment: reviewData.additionalComment
    //             // 키워드는 제외
    //         };
    //     }

    //     axios.post(endpoint, data)
    //         .then(() => {
    //             updateReviewStatus(reviewData.id, '완료');
    //             alert('리뷰가 성공적으로 제출되었습니다.');
    //             closeReviewModal();
    //         })
    //         .catch(error => {
    //             console.error('Failed to submit review:', error);
    //             alert('리뷰 제출에 실패했습니다.');
    //         });
    // };

    const filteredReviews = reviews.filter(review => {
        return review.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterDeadline ? review.deadline === filterDeadline : true);
    });

    // 모달 렌더링 로직
    // const renderReviewModal = () => {
    //     if (!selectedReview) return null;
    //     const modalProps = {
    //         isOpen: isModalOpen,
    //         onClose: () => closeReviewModal(),
    //         onSubmit: (data) => handleReviewSubmission(data, selectedReview.type)
    //     };
    //     switch (selectedReview.type) {
    //         case '역량':
    //             return <CompetencyReviewModal {...modalProps} />;
    //         case '성과':
    //             return <PerformanceReviewModal {...modalProps} />;
    //         default:
    //             return null;
    //     }
    // };
    const renderReviewModal = () => {
        if (!selectedReview) return null;
        const ModalComponent = selectedReview.type === '역량' ? CompetencyReviewModal : PerformanceReviewModal;
        return <ModalComponent isOpen={isModalOpen} onClose={closeReviewModal} onSubmit={() => handleReviewSubmission(selectedReview)} />;
    };
    return (
        <div className="main-content">
            <div className="page-management-container">
                <header className="page-header">
                    <h1 className="page-title">리뷰 관리</h1>
                </header>
                <Container fluid className="px-0"> {/* px-0 클래스로 패딩 제거 */}
                    <Row className="justify-content-between mx-0"> {/* mx-0 클래스로 마진 제거 */}
                        <Col md={6} className="d-flex align-items-center" style={{ paddingLeft: '0' }}>
                            <InputGroup className="mb-3" style={{ width: '35%' }}>
                                <FormControl
                                    type="date"
                                    value={filterDeadline}
                                    onChange={e => setFilterDeadline(e.target.value)}
                                    placeholder="기한 필터"
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    <FaCalendarAlt />
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end" style={{ paddingRight: '0' }}>
                            <InputGroup className="mb-3" style={{ width: '35%' }}>
                                <FormControl
                                    placeholder="리뷰 이름 검색"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                                <Button variant="outline-secondary" id="button-addon1">
                                    <FaSearch />
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>리뷰 이름</th>
                                <th>대상자</th>
                                <th>유형</th>
                                <th>상태</th>
                                <th>기한</th>
                                <th>리뷰하기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map(review => (
                                <tr key={review.id}>
                                    <td>{review.name}</td>
                                    <td>{review.target}</td>
                                    <td>{review.type}</td>
                                    <td>{review.status}</td>
                                    <td>{review.deadline}</td>
                                    <td>
                                        {review.status === '대기중' ? (
                                            <Button onClick={() => openReviewModal(review)}>리뷰 시작</Button>
                                        ) : (
                                            <Button disabled>리뷰 완료</Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {renderReviewModal()}
            </div>
        </div>
    );
}

export default My_Review;
