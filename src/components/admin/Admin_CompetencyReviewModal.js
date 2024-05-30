import React, { useState } from 'react';
import { Modal, Button, Tooltip, OverlayTrigger, Form, FormGroup, FormControl, FormLabel, Alert } from 'react-bootstrap';
import './CompetencyReviewModal.css'
import axios from 'axios'; // axios 라이브러리 사용

function CompetencyReviewModal({ isOpen, onClose, onSubmit }) {
    const initialScores = {
        리더십: '',
        소통: '',
        전문성: '',
        혁신성: '',
        도덕성: ''
    };
    const initialComments = {
        리더십: '',
        소통: '',
        전문성: '',
        혁신성: '',
        도덕성: ''
    };
    const initialKeywords = [];
    const initialAdditionalComment = '';
    const initialErrors = [];

    const [scores, setScores] = useState(initialScores);
    const [comments, setComments] = useState(initialComments);
    const [keywords, setKeywords] = useState(initialKeywords);
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
        리더십: '말과 행동이 일치하고, 그 결과에 책임을 집니다.',
        소통: '업무 지원이나 협업이 필요한 동료와 다른 팀에 긍정적이고 적극적인 태도로 참여합니다.',
        전문성: '담당 업무 수행에 필요한 전문 지식과 경험이 있습니다.',
        혁신성: '불확실성이 있더라도 더 나은 문제 해결을 위해 과감하게 새로운 시도에 도전합니다.',
        도덕성: '어려운 상황이 주어져도 매사 긍정적인 자세로 할 수 있다는 분위기를 조성합니다.'
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

    const toggleKeyword = (keyword) => {
        const updatedKeywords = keywords.includes(keyword)
            ? keywords.filter(kw => kw !== keyword)
            : [...keywords, keyword];

        if (updatedKeywords.length >= 3 && updatedKeywords.length <= 5) {
            setKeywords(updatedKeywords);
            setErrors(errors.filter(error => error !== "keywords"));
        } else {
            setKeywords(updatedKeywords);
        }
    };

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

    const validateAndSubmit = () => {
        let newErrors = [];
        Object.keys(scores).forEach(category => {
            if (!scores[category]) newErrors.push(category);
            if (!comments[category]) newErrors.push(category + "Comment");
        });
        if (keywords.length < 3 || keywords.length > 5) newErrors.push("keywords");

        if (newErrors.length === 0) {
            if (window.confirm("이 리뷰를 제출하시겠습니까?")) {
                const reviewData = {
                    scores: scores,
                    comments: comments,
                    keywords: keywords,
                    additionalComment: additionalComment
                };
                // onSubmit prop을 통해 리뷰 데이터를 My_Review 페이지로 전달
                onSubmit(reviewData);
                resetAndClose(); // 모달 닫고 상태 초기화
            }
        } else {
            setErrors(newErrors);
        }
    };

    const resetAndClose = () => {
        setScores(initialScores);
        setComments(initialComments);
        setKeywords(initialKeywords);
        setAdditionalComment(initialAdditionalComment);
        setErrors(initialErrors);
        onClose();
    };

    const scoreButtons = [1, 2, 3, 4, 5];

    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={resetAndClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>역량 리뷰</Modal.Title>
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
                                    style={{marginBottom:'20px',width: "80%", marginRight: "10px" }} // 너비를 80%로 지정하고 오른쪽 여백 추가
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
                    <FormGroup>
                        <FormLabel>키워드 (3-5개 선택)</FormLabel>
                        <p>대상자에게 어울리는 키워드를 선택해주세요.</p>
                        <div>
                            {['조직관리', '중재', '목표달성', '협업', '솔직함', '수용성', '빠른실행', '문제해결', '도전', '꾸준함', '효율중시', '긍정적태도', '끈기', '윤리의식', '참을성'].map(keyword => (
                                <Button
                                    key={keyword}
                                    variant={keywords.includes(keyword) ? "primary" : "outline-primary"}
                                    onClick={() => toggleKeyword(keyword)}
                                    className="m-1"
                                >
                                    {keyword}
                                </Button>
                            ))}
                        </div>
                        {errors.includes("keywords") && <Alert variant="danger" className="mt-2">Please select 3 to 5 keywords.</Alert>}
                    </FormGroup>
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

export default CompetencyReviewModal;
