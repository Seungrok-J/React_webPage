import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button, ProgressBar, Badge } from 'react-bootstrap';
import { FaTasks, FaCalendarCheck, FaArrowRight, FaBookOpen, FaComments, FaClipboardList } from 'react-icons/fa';
import axios from 'axios'; // axios 라이브러리를 임포트합니다.

/* 사용자 정보가 필요한경우에 currentUser를 넣어준다 */
function MainDashboard() {
  const currentUser = {
    name: "고영민",
    id: "user123",
    role: "개발자"
  };

  const [reviews, setReviews] = useState([
    { id: 1, name: '스마트인재개발원 핵심프로젝트 역량리뷰', status: '리뷰완료', deadline: '2024-06-05' },
    { id: 2, name: '스마트인재개발원 핵심프로젝트 성과리뷰', status: '대기중', deadline: '2024-06-05' }
  ]);

  const [goals, setGoals] = useState([
    { id: 1, title: '발표준비', progress: 75 },
    { id: 2, title: 'GPT API', progress: 50 }
  ]);

  // API 호출을 통해 리뷰 및 목표 데이터를 가져오는 함수
  // useEffect(() => {
  //   const fetchReviewsAndGoals = async () => {
  //     try {
  //       // 리뷰 데이터를 불러오는 API 요청
  //       const reviewsResponse = await axios.get(`/api/reviews/user/${currentUser.id}`);
  //       setReviews(reviewsResponse.data);

  //       // 목표 데이터를 불러오는 API 요청
  //       const goalsResponse = await axios.get(`/api/goals/user/${currentUser.id}`);
  //       setGoals(goalsResponse.data);
  //     } catch (error) {
  //       console.error('Failed to fetch data:', error);
  //     }
  //   };
  return (
    <div className="main-content">
      <Container className="my-4">
        <h1 className="text-left mb-4">환영합니다, {currentUser.name}님!</h1>
        <Row className="mb-4">
          <Col md={7}>
            <Card className="shadow mb-4">
              <Card.Header className="font-weight-bold text-uppercase"><FaTasks /> 해야 할 리뷰</Card.Header>
              <ListGroup variant="flush">
                {reviews.map(review => (
                  <ListGroup.Item key={review.id} className="d-flex justify-content-between align-items-center">
                    {review.name}
                    <div>
                      <Badge bg="info">{review.status}</Badge>
                      <Button variant="primary" size="sm" className="ml-2">
                        리뷰하기 <FaArrowRight />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
            <Card className="shadow">
              <Card.Header className="font-weight-bold text-uppercase"><FaCalendarCheck /> 목표 진행 상황</Card.Header>
              <ListGroup variant="flush">
                {goals.map(goal => (
                  <ListGroup.Item key={goal.id} className="d-flex justify-content-between align-items-center">
                    {goal.title}
                    <ProgressBar now={goal.progress} label={`${goal.progress}%`} className="w-50" />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="shadow mb-4">
              <Card.Header className="font-weight-bold text-uppercase"><FaBookOpen /> 리소스 및 도움말</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FaArrowRight /> 사용자 매뉴얼
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaArrowRight /> FAQ
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="shadow">
              <Card.Header className="font-weight-bold text-uppercase"><FaComments /> 피드백 및 의견 제출</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FaClipboardList /> 의견 제출하기
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaClipboardList /> 피드백 보내기
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainDashboard;
