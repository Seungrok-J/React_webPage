import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Table, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import * as echarts from 'echarts/core';
import { TitleComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import wordCloudImage1 from '../img/wordCloud1.png';
import wordCloudImage2 from '../img/wordCloud2.png';
import wordCloudImage3 from '../img/wordCloud3.png';
import wordCloudImage4 from '../img/wordCloud4.png';
import { BsSearch } from 'react-icons/bs';  // Bootstrap Icons import
echarts.use([TitleComponent, LegendComponent, TooltipComponent, RadarChart, CanvasRenderer]);

function ComprehensiveSearch() {
    const chartRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showChart, setShowChart] = useState(true); // 토글 상태를 추가
    const [users, setUsers] = useState([
        { id: 1, name: '고영민', position: 'Project Manager', department: '기획팀', point: 88, organization: 'MuddyBuddy',reviewData: { scores: [4, 4, 5, 3, 2], words: [{ text: 'leadership', value: 10 }, { text: 'communication', value: 5 }] } },
        { id: 2, name: '이양희', position: 'Senior Developer', department: '개발팀', point: 92, organization: 'MuddyBuddy',reviewData:{ scores: [5, 2, 3, 5, 4], words: [{ text: 'innovation', value: 8 }, { text: 'responsibility', value: 7 }] } },
        { id: 3, name: '정승록', position: 'UI/UX Designer', department: '개발팀', point: 85, organization: 'MuddyBuddy',reviewData: { scores: [3, 5, 4, 4, 5], words: [{ text: 'teamwork', value: 9 }, { text: 'ethics', value: 4 }] } },
        { id: 4, name: '양연정', position: 'Product Manager', department: '기획팀', point: 90, organization: 'MuddyBuddy',reviewData: { scores: [5, 5, 5, 5, 5], words: [{ text: 'efficiency', value: 8 }, { text: 'trust', value: 6 }] } }
    ]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())));
    }, [searchTerm, users]);

    useEffect(() => {
        if (chartRef.current && selectedUser && showChart) {
            const myChart = echarts.init(chartRef.current);
            const options = {
                tooltip: {},
                legend: { data: ['종합점수'] },
                radar: {
                    indicator: [
                        { name: '리더십', max: 5 },
                        { name: '소통', max: 5 },
                        { name: '전문성', max: 5 },
                        { name: '혁신성', max: 5 },
                        { name: '도덕성', max: 5 }
                    ]
                },
                series: [{
                    title: '종합점수',
                    name: 'Review Score',
                    type: 'radar',
                    data: [
                        {
                            value: selectedUser.reviewData.scores,
                            name: 'Actual Score'
                        }
                    ]
                }]
            };
            myChart.setOption(options);
        }
    }, [selectedUser, showChart]);

    function getImageForUser(userId) {
        switch (userId) {
            case 1:
                return wordCloudImage1;
            case 2:
                return wordCloudImage2;
            case 3:
                return wordCloudImage3;
            case 4:
                return wordCloudImage4;
            default:
                return null;  // 기본 이미지 또는 null 처리
        }
    }

    return (
        <div className="main-content">
            <Container className="mt-4">
                <Row>
                    <Col xs={12}>
                        <h1>종합 검색</h1>
                    </Col>
                </Row>
                <Row className="mt-3 align-items-center">
                    <Col md={6} style={{ width: '42%', marginBottom: '20px' }}>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="구성원 정보 혹은 역량 키워드를 입력하세요."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}


                            />
                            <Button variant="outline-secondary">
                                <BsSearch />
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col md={6} className="text-left" style={{ marginBottom: "20px" }}>
                        <Button
                            variant="outline-primary"
                            style={showChart ? { marginRight: '10px', textDecoration: 'underline', fontWeight: 'bold' } : {}}
                            onClick={() => setShowChart(true)}
                        >
                            Radar
                        </Button>
                        <Button
                            variant="outline-primary"
                            style={!showChart ? { marginLeft : '10px', textDecoration: 'underline', fontWeight: 'bold' } : {}}
                            onClick={() => setShowChart(false)}
                        >
                            Word Cloud
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-3">
                        <Col md={5}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>이름</th>
                                        <th>Position</th>
                                        <th>Department</th>
                                        <th>MuddPoint</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.id} onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer' }}>
                                            <td>{user.name}</td>
                                            <td>{user.position}</td>
                                            <td>{user.department}</td>
                                            <td>{user.point}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={6}>
                            {/* <div className="d-flex justify-content-start mb-2">
                            <Button
                                style={showChart ? { textDecoration: 'underline', fontWeight: 'bold' } : {}}
                                onClick={() => setShowChart(true)}
                            >
                                차트 보기
                            </Button>
                            <Button
                                style={!showChart ? { textDecoration: 'underline', fontWeight: 'bold' } : {}}
                                onClick={() => setShowChart(false)}
                            >
                                워드클라우드 보기
                            </Button>
                        </div> */}
                            <div>
                                {selectedUser && showChart ? (
                                    <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
                                ) : selectedUser ? (
                                    <img src={getImageForUser(selectedUser.id)} alt="Word Cloud" style={{ border: "1px solid", width: '50%', height: '300px', margin: '20px', marginLeft: '120px' }} />
                                ) : null}
                            </div>
                        </Col>
                    </Row>
            </Container>
        </div>
    );
}

export default ComprehensiveSearch;
