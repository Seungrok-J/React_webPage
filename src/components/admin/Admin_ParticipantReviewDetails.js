import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Card, Form, FormGroup, FormControl, FormLabel, Badge, Pagination } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';

function ParticipantReviewDetails() {
    const { reviewId, participantId } = useParams();
    const navigate = useNavigate();

    // 가상의 리뷰 데이터
    const [reviews, setReviews] = useState([
        {
            reviewer: '고영민',
            reviewData: {
                리더십: { score: '5', comment: ' 프로젝트의 리더로서 탁월한 성과를 보여주셨습니다. 팀원 간의 명확한 역할 분담과 갈등 해소를 위해 적극적으로 개입하셨으며, 팀의 목표 달성을 위해 필요한 리소스를 적절히 배분하였습니다. 특히, 프로젝트 중대 결정에서 신속하고 공정한 판단을 보여 주셨습니다.' },
                소통: { score: '4', comment: '팀 내외의 소통에 있어 항상 적극적이고 열린 자세를 유지하셨습니다. 다만, 때때로 정보 전달이 늦어지는 경우가 있어 일부 팀원이 중요한 업데이트를 놓치는 상황이 발생하였습니다. 정보의 신속한 공유를 통해 더욱 효율적인 소통이 이루어질 수 있을 것입니다.' },
                전문성: { score: '5', comment: '해당 분야의 전문 지식이 매우 뛰어납니다. 최신 기술 트렌드에 대한 깊은 이해를 바탕으로 혁신적인 해결책을 제시하였고, 복잡한 문제에 대한 해결 방안을 제시할 때 그 전문성이 두드러졌습니다' },
                혁신성: { score: '4', comment: '새로운 아이디어와 접근 방식을 도입하려는 노력이 인상적입니다. 프로젝트에서 신기술을 적용하여 시험해 보았으며, 이는 팀의 업무 방식에 큰 변화를 가져왔습니다. 지속적인 혁신을 위해 실험적인 프로젝트에 좀 더 많은 기회를 할애하는 것도 좋을 것입니다' },
                도덕성: { score: '5', comment: '항상 높은 윤리 의식을 바탕으로 행동하십니다. 공정하고 투명한 결정을 통해 팀 내 신뢰를 구축하였으며, 어려운 윤리적 결정의 상황에서도 일관되게 올바른 선택을 하셨습니다.' }
            },
            keywords: ['효율중시', '긍정적태도', '끈기']
        },
        // {
        //     reviewer: '양연정',
        //     reviewData: {
        //         리더십: { score: '3', comment: ' 팀원들과의 명확한 목표 공유와 동기 부여에서 어려움을 겪는 경우가 종종 있었습니다. 프로젝트 중반에 팀원들의 업무 방향이 불분명해져 일정 조정이 필요했던 상황을 고려할 때, 더욱 적극적인 소통과 전략적 리더십을 발휘할 필요가 있습니다' },
        //         소통: { score: '3', comment: '팀 내외부 소통이 원활하지 않아 일부 중요 정보가 누락되는 사례가 발생하였습니다. 특히, 프로젝트의 변경 사항을 신속하게 공유하지 못해 팀원들이 업무에 혼란을 겪은 점을 개선할 필요가 있습니다. 정기적인 회의를 통해 업데이트를 공유하고, 피드백을 적극적으로 수집하면 소통 효율을 높일 수 있을 것입니다.' },
        //         전문성: { score: '4', comment: '양연정님은 해당 분야에 대한 깊은 지식과 전문성을 바탕으로 팀의 기술적 문제 해결에 크게 기여하셨습니다. 다만, 최신 기술 트렌드에 대한 지속적인 학습과 이를 실무에 적용하는 노력도 필요합니다. 특히, 새로운 기술을 도입할 때 이론뿐만 아니라 실제 적용 사례를 분석하여 팀원들과 공유한다면 더욱 효과적일 것입니다' },
        //         혁신성: { score: '3', comment: '프로젝트에서 보다 창의적이고 혁신적인 접근을 시도하였으나, 일부 아이디어가 실질적인 실행 단계로 넘어가지 못한 점이 아쉽습니다. 혁신적인 아이디어를 실제 업무에 통합하기 위한 구체적인 계획과 실행 전략을 마련하는 것이 중요합니다. 또한, 다양한 분야의 사례를 연구하여 아이디어의 실현 가능성을 높일 수 있도록 노력해 주세요' },
        //         도덕성: { score: '4', comment: '동료들과의 관계에서도 정직하고 신뢰할 수 있는 모습을 보여주셨습니다. 팀 내에서 윤리적 가이드라인을 설정하고 이를 준수하는 데 앞장서셨습니다. 앞으로도 이러한 자세를 유지하며, 더욱 복잡한 윤리적 딜레마에 직면했을 때 선도적인 역할을 해주시길 바랍니다' }
        //     },
        //     keywords: ['윤리의식', '효율중시', '전문성']
        // }
    ]);

    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const response = await axios.get(`/api/reviews/${reviewId}/participants/${participantId}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching review details:', error);
                // 적절한 에러 처리
            }
        };

        fetchReviewDetails();
    }, [reviewId, participantId]);

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const goBack = () => navigate(-1);

    const currentReview = reviews[currentReviewIndex];

    function ScoreBadge({ score }) {
        const totalStars = 5;
        return (
            <div className="d-flex align-items-center">
                {[...Array(totalStars)].map((e, i) => (
                    <span key={i} className={i < score ? "text-warning" : "text-muted"}>
                        <i className="fas fa-star"></i>
                    </span>
                ))}
                <span className="ms-2">{`${score}/${totalStars}`}</span>
            </div>
        );
    }

    return (
        <Container className="mt-4" style={{ paddingLeft: '300px', paddingRight: '300px' }}>
            <Card className="shadow-sm mb-5">
                <Card.Header as="h5" className="bg-light d-flex justify-content-between align-items-center p-3">
                    <Button variant="outline-danger" onClick={goBack} className="me-2">
                        <FaTimes />
                    </Button>
                    <strong>{`이양희님에 대한 리뷰 상세보기 (${currentReview.reviewer})`}</strong>
                    <div></div>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form>
                        {currentReview.keywords && currentReview.keywords.length > 0 && (
                            <FormGroup className="mb-3">
                                <FormLabel><strong>키워드</strong></FormLabel>
                                <div>
                                    {currentReview.keywords.map((keyword, index) => (
                                        <Badge key={index} bg="secondary" className="m-1">{keyword}</Badge>
                                    ))}
                                </div>
                            </FormGroup>
                        )}
                        {Object.entries(currentReview.reviewData).map(([category, data]) => (
                            <FormGroup key={category} className="mb-4">
                                <FormLabel><strong>{category}</strong></FormLabel>
                                <div className="mb-2">
                                    <ScoreBadge score={parseInt(data.score)} />
                                </div>
                                <FormControl
                                    as="textarea"
                                    readOnly
                                    defaultValue={data.comment}
                                    className="bg-white p-3"
                                    style={{ minHeight: '100px', fontSize: '1rem', lineHeight: '1.5' }}
                                />
                            </FormGroup>
                        ))}
                    </Form>
                    <Pagination className="justify-content-center mt-4">
                        {reviews.map((_, index) => (
                            <Pagination.Item key={index} active={index === currentReviewIndex} onClick={() => setCurrentReviewIndex(index)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ParticipantReviewDetails;
