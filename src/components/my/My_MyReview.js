import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Badge, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function My_MyReview() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([
    ]);

    useEffect(() => {
        // 주석 처리된 API 호출
        const fetchMyReviews = async () => {
            try {
                const response = await axios.get('/api/reviews/my');
                setReviews(response.data); // 서버에서 사용자에게 공유된 리뷰 데이터 가져오기
            } catch (error) {
                console.error('Failed to fetch my reviews:', error);
            }
        };

        fetchMyReviews();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterDeadline, setFilterDeadline] = useState('');


    const filteredReviews = reviews.filter(review =>
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterDeadline || review.deadline === filterDeadline)
    );

    const viewUserReviewDetails = (reviewId, userId) => {
        // 해당 참가자의 리뷰 세부사항 페이지로 이동
        navigate(`/admin/review/${reviewId}/participant/${userId}`);
    };

    return (
        <div className="main-content">
            <div className="page-management-container">
                <header className="page-header">
                    <h1 className="page-title">내 리뷰</h1>
                </header>
                <Container fluid className="px-0">
                    <Row className="justify-content-between mx-0">
                        <Col md={6} className="d-flex align-items-center" style={{ paddingLeft: '0' }}>
                            <InputGroup className="mb-3" style={{ width: '35%' }}>
                                <FormControl
                                    type="date"
                                    value={filterDeadline}
                                    onChange={e => setFilterDeadline(e.target.value)}
                                    placeholder="기한 필터"
                                />
                                <Button variant="outline-secondary">
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
                                <Button variant="outline-secondary">
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
                                <th>유형</th>
                                <th>상태</th>
                                <th>기한</th>
                                <th>리뷰 보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map(review => (
                                <tr key={review.id}>
                                    <td>{review.name}</td>
                                    <td>{review.type}</td>
                                    <td>
                                        <Badge bg={review.status === '공유됨' ? 'success' : 'secondary'}>
                                            {review.status}
                                        </Badge>
                                    </td>
                                    <td>{review.deadline}</td>
                                    <td>
                                        <Button onClick={() => viewUserReviewDetails(review.id, review.userId)}>리뷰 보기</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default My_MyReview;
