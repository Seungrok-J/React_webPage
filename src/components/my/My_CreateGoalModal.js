import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'draft-js/dist/Draft.css';
import './My_CreateGoalModal.css'; // 커스텀 CSS가 필요하다면 추가
import axios from 'axios';

function CreateGoalModal({ isOpen, onClose, cycles, goals, addGoal }) {
    const [goal, setGoal] = useState('');
    const [cycle, setCycle] = useState(null);
    const [parentGoal, setParentGoal] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [organizationType, setOrganizationType] = useState('');
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [personInCharge, setPersonInCharge] = useState([]);
    const [indicatorName, setIndicatorName] = useState('');
    const [startValue, setStartValue] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [organizationOptions, setOrganizationOptions] = useState([]);
    const [memberOptions, setMemberOptions] = useState([]);


    useEffect(() => {
        const teamOptions = [
            { id: 'team1', name: '마케팅팀' },
            { id: 'team2', name: '개발팀' },
            { id: 'team3', name: '인사팀' }
        ];

        console.log(teamOptions)
        // 팀 데이터를 Select 컴포넌트의 옵션 형식으로 변환
        setOrganizationOptions(teamOptions.map(team => ({ value: team.id, label: team.name })));
    }, []);

    
    useEffect(() => {
        if (!isOpen) return;
        const fetchData = async () => {
            try {
                const [cycleRes, goalRes, orgRes, memberRes] = await Promise.all([
                    axios.get('/api/cycles'),
                    axios.get('/api/goals'),
                    axios.get('/api/organizations'),
                    axios.get('/api/members')
                ]);
                setCycle(cycleRes.data.map(c => ({ value: c.id, label: c.name })));
                setParentGoal(goalRes.data.map(g => ({ value: g.id, label: g.name })));
                setOrganizationOptions(orgRes.data.map(o => ({ value: o.id, label: o.name })));
                setMemberOptions(memberRes.data.map(m => ({ value: m.id, label: m.name })));
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [isOpen]);

    const handleCreate = () => {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const description = JSON.stringify(rawContent);

        const newGoal = {
            name: goal,
            cycle: cycle ? cycle.value : '',
            parentGoal: parentGoal ? parentGoal.value : '',
            startDate,
            endDate,
            organizationType,
            organization: selectedOrganization ? selectedOrganization.value : '',
            personInCharge: personInCharge.map(p => p.value),
            indicatorName,
            startValue,
            targetValue,
            description,
        };

        addGoal(newGoal);
        onClose();
    };

    // 에디터 상태를 업데이트하는 함수
    const handleEditorChange = (state) => {
        setEditorState(state);
    };
    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>목표 생성하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>목표</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="예) 고객 만족도 평균 5점 달성"
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>사이클 선택</Form.Label>
                        <Select
                            options={cycles.map(cycle => ({ value: cycle.name, label: cycle.name }))}
                            value={cycle}
                            onChange={(option) => setCycle(option)}
                            placeholder="Select Cycle"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>상위 목표</Form.Label>
                        <Select
                            options={goals.map(goal => ({ value: goal.name, label: goal.name }))}
                            value={parentGoal}
                            onChange={(option) => setParentGoal(option)}
                            placeholder="Select Parent Goal"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>시작일</Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>종료일</Form.Label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                            minDate={startDate}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>조직유형선택</Form.Label>
                        <Form.Control as="select" value={organizationType} onChange={(e) => {
                            setOrganizationType(e.target.value);
                            setSelectedOrganization(null); // 조직 유형 변경 시 선택된 조직 초기화
                        }}>
                            <option value="">Select Organization Type</option>
                            <option value="회사">회사</option>
                            <option value="팀">팀</option>
                            <option value="개인">개인</option>
                        </Form.Control>
                    </Form.Group>
                    {organizationType === '팀' && (
                        <Form.Group className="mb-3">
                            <Form.Label>조직 선택</Form.Label>
                            <Form.Control as="select" value={selectedOrganization ? selectedOrganization.value : ''} onChange={(e) => {
                                const selectedOption = organizationOptions.find(option => option.value === e.target.value);
                                console.log(selectedOption);
                                setSelectedOrganization(selectedOption);
                            }}>
                                {organizationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    )}
                    <Form.Group className="mb-3">
                        <Form.Label>담당자</Form.Label>
                        <Select
                            isMulti
                            options={memberOptions}
                            value={personInCharge}
                            onChange={setPersonInCharge}
                            placeholder="Select Person in Charge"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>목표지표명</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="예시)진척도,매출액(원),전환율(%)"
                            value={indicatorName}
                            onChange={(e) => setIndicatorName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>시작값</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="예)0"
                            value={startValue}
                            onChange={(e) => setStartValue(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>목표값</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="예)100"
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>목표 설명</Form.Label>
                        <Editor
                            editorState={editorState}
                            onChange={handleEditorChange}
                            placeholder="Description"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>취소</Button>
                <Button variant="primary" onClick={handleCreate}>생성</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateGoalModal;
