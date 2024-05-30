import React, { useState } from 'react';
import { Modal, Button, Tooltip, OverlayTrigger, Form, FormGroup, FormControl, FormLabel, Alert } from 'react-bootstrap';
import './CompetencyReviewModal.css'
import axios from 'axios'; // axios 라이브러리 사용

function PerformancReviewModal({ isOpen, onClose, onSubmit }) {
    const initialScores = {
        성과: '',
        목표달성률: '',
        기여도: '',
        품질: '',
        생산성: ''
    };
    const initialComments = {
        성과: '',
        목표달성률: '',
        기여도: '',
        품질: '',
        생산성: '',
    };
    const initialAdditionalComment = '';
    const initialErrors = [];

    const [scores, setScores] = useState(initialScores);
    const [comments, setComments] = useState(initialComments);
    const [additionalComment, setAdditionalComment] = useState(initialAdditionalComment);
    const [errors, setErrors] = useState(initialErrors);

    const scoreDescriptions = {
        1: "매우 부족",
        2: "부족",
        3: "보통",
        4: "우수",
        5: "매우 우수"
    };


    const questions = {
        성과: '이번 분기 팀원의 성과를 평가한다면?',
        목표달성률: '설정한 목표에 대해 실제로 실천한 목표 달성 비율을 점수로 평가한다면?',
        기여도: '이 사람은 프로젝트의 성공 및 발전에 어느 정도 기여했나요?',
        품질: '직무에서의 오류 발생률은 얼마인가요? ',
        생산성: '업무를 수행하는 데 걸리는 평균 시간이 만족하나요?'
    };

    const handleScoreChange = (category, score) => {
        setScores(prevScores => ({ ...prevScores, [category]: score }));
        if (errors.includes(category)) {
            setErrors(errors.filter(error => error !== category));
        }
    };

    const handleCommentChange = (category, comment) => {
        setComments(prevComments => ({ ...prevComments, [category]: comment }));
        if (errors.includes(category + "Comment")) {
            setErrors(errors.filter(error => error !== category + "Comment"));
        }
    };





    const validateAndSubmit = () => {
        let newErrors = [];
        Object.keys(scores).forEach(category => {
            if (!scores[category]) newErrors.push(category);
            if (!comments[category]) newErrors.push(category + "Comment");
        });

        if (newErrors.length === 0) {
            if (window.confirm("이 리뷰를 제출하시겠습니까?")) {
                const reviewData = {
                    scores: scores,
                    comments: comments,
                    additionalComment: additionalComment
                };
                onSubmit(reviewData); // 리뷰 데이터를 My_Review 페이지로 전달
                resetAndClose();
            }
        } else {
            setErrors(newErrors);
        }
    };


    const resetAndClose = () => {
        setScores(initialScores);
        setComments(initialComments);
        setAdditionalComment(initialAdditionalComment);
        setErrors(initialErrors);
        onClose();
    };

    const scoreButtons = [1, 2, 3, 4, 5];
    const [aiComments, setAiComments] = useState({});

    // OpenAI API 호출 함수
    const fetchAIComment = async (category, score) => {
        const prompt = `Given the score of ${score} on ${category}, provide a detailed review comment.`; // 적절한 프롬프트 작성
        try {
            const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
                prompt: prompt,
                max_tokens: 60
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // 환경 변수에서 API 키 로드
                }
            });
            setAiComments(prev => ({ ...prev, [category]: response.data.choices[0].text.trim() }));
        } catch (error) {
            console.error('Error fetching AI generated comment', error);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={resetAndClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>성과리뷰</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {Object.entries(scores).map(([category, score]) => (
                        <FormGroup key={category}>
                            <FormLabel>{category}</FormLabel>
                            <p className="text-muted">{questions[category]}</p>
                            <div className="d-flex flex-wrap mb-3 score-buttons">
                                {scoreButtons.map(num => (
                                    <OverlayTrigger
                                        key={num}
                                        placement="top"
                                        overlay={<Tooltip>{scoreDescriptions[num]}</Tooltip>}
                                    >
                                        <Button
                                            variant={score === num.toString() ? "primary" : "outline-primary"}
                                            onClick={() => handleScoreChange(category, num.toString())}
                                            className="score-button m-1"
                                        >
                                            {num}
                                        </Button>
                                    </OverlayTrigger>
                                ))}
                            </div>
                            {errors.includes(category) && <Alert variant="danger">점수를 선택해주세요.</Alert>}
                            <div className="d-flex align-items-center">
                                <FormControl
                                    as="textarea"
                                    placeholder="코멘트를 남겨주세요."
                                    value={comments[category] || aiComments[category]}
                                    onChange={(e) => handleCommentChange(category, e.target.value)}
                                    isInvalid={errors.includes(category + "Comment")}
                                    style={{ marginBottom: '20px', width: "80%", marginRight: "10px" }} // 너비를 80%로 지정하고 오른쪽 여백 추가
                                    className="mt-2"
                                />
                                <Button
                                    variant="info"
                                    onClick={() => fetchAIComment(category, score)}
                                    className="flex-shrink-0 ai-button" // 버튼의 크기가 축소되지 않도록 설정
                                >
                                    <i className="fas fa-robot"></i> AI 도우미
                                </Button>
                            </div>
                            <Form.Control.Feedback type="invalid">
                                Comment is required.
                            </Form.Control.Feedback>
                        </FormGroup>
                    ))}
                    <FormControl
                        as="textarea"
                        placeholder="추가 코멘트 작성"
                        value={additionalComment}
                        onChange={(e) => setAdditionalComment(e.target.value)}
                        className="mt-2"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={resetAndClose}>취소</Button>
                <Button variant="primary" onClick={validateAndSubmit}>리뷰 제출</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PerformancReviewModal;
