import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateGoalModal from './My_CreateGoalModal';
import CheckInModal from './My_CheckInModal';
import My_GoalsDropDown from './My_GoalsDropDown';  // 가정: Dropdown 컴포넌트를 별도로 구현
import './My_Goals.css';

function My_Goals() {
    // 초기 가상 데이터 설정
    const [goals, setGoals] = useState([
        {
            id: 1,
            name: '발표준비2',
            progress: 75,
            startProgress: 0,
            targetProgress: 100,
            scope: '기획팀',
            status: '순항',
            manager: '고영민',
            startDate: '2024-05-26',
            endDate: '2024-05-29',
            cycleId: 1,
            parentId: null,
            isExpanded: false,
            organizationType: '개인'
        },
        {
            id: 2,
            name: '서류준비',
            progress: 100,
            startProgress: 0,
            targetProgress: 100,
            scope: '기획팀',
            status: '완료',
            manager: '고영민',
            startDate: '2024-05-27',
            endDate: '2024-05-39',
            cycleId: 1,
            parentId: 1,
            isExpanded: false,
            organizationType: '개인'
        },
        {
            id: 3,
            name: 'Front End',
            progress: 99,
            startProgress: 0,
            targetProgress: 100,
            scope: '개발팀',
            status: '순항',
            manager: '정승록',
            startDate: '2024-05-18',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: null,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 4,
            name: 'Scenario1 구성원 및 조직관리',
            progress: 100,
            startProgress: 0,
            targetProgress: 100,
            scope: '개발팀',
            status: '완료',
            manager: '정승록',
            startDate: '2024-05-18',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 3,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 5,
            name: 'GPT API',
            progress: 50,
            startProgress: 0,
            targetProgress: 100,
            scope: '기획팀',
            status: '중단',
            manager: '고영민',
            startDate: '2024-05-27',
            endDate: '2024-05-29',
            cycleId: 1,
            parentId: null,
            isExpanded: false,
            organizationType: '개인'
        },
        {
            id: 6,
            name: 'Scenario2 목표관리',
            progress: 100,
            startProgress: 0,
            targetProgress: 100,
            scope: '개발팀',
            status: '완료',
            manager: '정승록',
            startDate: '2024-05-18',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 3,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 7,
            name: 'Scenario3 리뷰관리',
            progress: 100,
            startProgress: 0,
            targetProgress: 100,
            scope: '개발팀',
            status: '완료',
            manager: '정승록',
            startDate: '2024-05-18',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 3,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 8,
            name: 'Data Analysis',
            progress: 70,
            startProgress: 0,
            targetProgress: 100,
            scope: '기획팀',
            status: '완료',
            manager: '양연정',
            startDate: '2024-05-15',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: null,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 14,
            name: 'Fast API',
            progress: 80,
            startProgress: 0,
            targetProgress: 100,
            scope: '기획팀',
            status: '순항',
            manager: '양연정',
            startDate: '2024-05-15',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 8,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 15,
            name: 'MySQL Python Connection',
            progress: 100,
            startProgress: 0,
            targetProgress: 100,
            scope: '기획팀',
            status: '완료',
            manager: '양연정',
            startDate: '2024-05-15',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 8,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 9,
            name: 'WordCloud',
            progress: 80,
            startProgress: 0,
            targetProgress: 100,
            scope: '기획팀',
            status: '난항',
            manager: '양연정',
            startDate: '2024-05-15',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 8,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 10,
            name: 'Back End',
            progress: 70,
            startProgress: 0,
            targetProgress: 100,
            scope: '개발팀',
            status: '난항',
            manager: '이양희',
            startDate: '2024-05-15',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: null,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 11,
            name: 'SpringBoot 서버띄우기',
            progress: 100,
            startProgress: 0,
            targetProgress: 100,
            scope: '개발팀',
            status: '완료',
            manager: '이양희',
            startDate: '2024-05-15',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 10,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 12,
            name: 'React와 연동',
            progress: 100,
            startProgress: 0,
            targetProgress: 100,
            scope: '개발팀',
            status: '완료',
            manager: '이양희',
            startDate: '2024-05-15',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 10,
            isExpanded: false,
            organizationType: '팀'
        },
        {
            id: 13,
            name: '페이지 연동',
            progress: 50,
            startProgress: 0,
            targetProgress: 100,
            scope: '개발팀',
            status: '난항',
            manager: '이양희',
            startDate: '2024-05-15',
            endDate: '2023-05-29',
            cycleId: 1,
            parentId: 10,
            isExpanded: false,
            organizationType: '팀'
        }
    ]);

    const [cycles, setCycles] = useState([
        { id: 1, name: '스마트인재개발원 핵심프로젝트' }
    ]);

    const [isGoalModalOpen, setGoalModalOpen] = useState(false);
    const [isCheckInModalOpen, setCheckInModalOpen] = useState(false);
    const [selectedGoalForCheckIn, setSelectedGoalForCheckIn] = useState(null);
    const [filteredGoals, setFilteredGoals] = useState([]);
    const [selectedCycle, setSelectedCycle] = useState(cycles[0] || ''); // 기본 사이클이 없으면 ''로 처리하여 'undefined' 문제 방지
    const [filterOrganizationType, setFilterOrganizationType] = useState('전체');

    // 서버에서 목표 및 사이클 데이터를 불러오는 효과
    useEffect(() => {
        const fetchGoalsAndCycles = async () => {
            try {
                const [goalsRes, cyclesRes] = await Promise.all([
                    axios.get('/api/goals'),
                    axios.get('/api/cycles')
                ]);
                setGoals(goalsRes.data);
                setCycles(cyclesRes.data);
                if (cyclesRes.data.length > 0) {
                    setSelectedCycle(cyclesRes.data[0].id.toString());
                }
            } catch (error) {
                console.error('Failed to fetch goals or cycles:', error);
            }
        };

        fetchGoalsAndCycles();
    }, []);

    useEffect(() => {
        const filtered = goals.filter(goal => {
            return (selectedCycle === '' || goal.cycleId.toString() === selectedCycle) &&
                (filterOrganizationType === '전체' || goal.organizationType === filterOrganizationType);
        });
        setFilteredGoals(filtered);
    }, [goals, selectedCycle, filterOrganizationType])

    // 목표 진행 상황 업데이트
    const handleCheckIn = async (goalId, progress, status, comment) => {
        try {
            const updatedGoal = {
                progress,
                status,
                comment // 코멘트도 함께 업데이트
            };
            const response = await axios.put(`/api/goals/${goalId}`, updatedGoal);
            const updatedGoals = goals.map(goal =>
                goal.id === goalId ? { ...goal, ...response.data } : goal
            );
            setGoals(updatedGoals);
            closeCheckInModal();
        } catch (error) {
            console.error('Failed to check in:', error);
        }
    };


    // 새 목표 추가
    const addGoal = async (newGoal) => {
        try {
            const response = await axios.post('/api/goals', newGoal);
            setGoals([...goals, response.data]);
            closeGoalModal();
        } catch (error) {
            console.error('Failed to add goal:', error);
        }
    };

    useEffect(() => {
        // 사이클 목록이 있고, 현재 선택된 사이클이 유효하지 않을 경우만 첫 번째 사이클을 자동으로 선택
        if (cycles.length > 0 && !cycles.some(cycle => cycle.id.toString() === selectedCycle)) {
            setSelectedCycle(cycles[0].id.toString());
        }
    }, [cycles, selectedCycle]);

    ;


    /* 모달 open close관리 */
    const openGoalModal = () => {
        console.log("Opening Create Goal Modal");
        setGoalModalOpen(true);
    };
    const closeGoalModal = () => setGoalModalOpen(false);
    const openCheckInModal = (goal) => {
        setSelectedGoalForCheckIn(goal);
        setCheckInModalOpen(true);
    };
    const closeCheckInModal = () => setCheckInModalOpen(false);



    const [expandedGoals, setExpandedGoals] = useState([]);



    function getStatusIcon(status) {
        const style = {
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '5px',
            verticalAlign: 'middle'
        };

        switch (status) {
            case '완료':
                return <span style={{ ...style, backgroundColor: 'blue' }}></span>;
            case '순항':
                return <span style={{ ...style, backgroundColor: 'green' }}></span>;
            case '대기':
                return <span style={{ ...style, backgroundColor: 'yellow' }}></span>;
            case '난항':
                return <span style={{ ...style, backgroundColor: 'orange' }}></span>;
            case '중단':
                return <span style={{ ...style, backgroundColor: 'red' }}></span>;
            default:
                return <span style={{ ...style, backgroundColor: 'grey' }}></span>;
        }
    }

    // Toggle the visibility of child goals
    const toggleExpansion = (goalId) => {
        setExpandedGoals(prev =>
            prev.includes(goalId) ? prev.filter(id => id !== goalId) : [...prev, goalId]
        );
    };

    // Recursive function to render goals with indentation
    // 재귀적으로 목표를 렌더링하는 함수
    function renderGoalRows(goals, parentId = null, level = 0) {
        return goals.filter(goal => goal.parentId === parentId).map(goal => (
            <React.Fragment key={goal.id}>
                <tr onClick={() => toggleExpansion(goal.id)} style={{ cursor: 'pointer' }}> {/* 클릭 이벤트 추가 */}
                    <td style={{ paddingLeft: `${level * 40}px` }}>
                        {goal.parentId === null ? (
                            <span style={{ paddingLeft: '10px', paddingRight: '10px' }} >
                                {expandedGoals.includes(goal.id) ? '▼' : '►'}
                            </span>
                        ) : null}
                        {goal.name}
                    </td>
                    <td onClick={(e) => {
                        e.stopPropagation(); // 부모 tr의 이벤트가 실행되지 않도록 방지
                        openCheckInModal(goal);
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {getStatusIcon(goal.status)}
                            <span>{parseFloat(goal.progress).toFixed(1)}%</span>
                        </div>
                    </td>
                    <td>{goal.scope}</td>
                    <td>{goal.manager}</td>
                    <td>{`${goal.startDate} - ${goal.endDate}`}</td>
                </tr>
                {expandedGoals.includes(goal.id) && renderGoalRows(goals, goal.id, level + 1)}
            </React.Fragment>
        ));
    }



    return (
        <div className="main-content">
            <div className="page-management-container">
                <header className="page-header">
                    <My_GoalsDropDown options={cycles} selected={selectedCycle} onSelect={setSelectedCycle} />
                    <button className="button" onClick={openGoalModal}>목표생성</button>
                    <CreateGoalModal
                        isOpen={isGoalModalOpen}
                        onClose={closeGoalModal}
                        cycles={cycles}
                        goals={goals}
                        addGoal={addGoal}
                    />
                </header>

                <div className="organization-filters">
                    {['개인', '팀', '전체'].map(type => (
                        <span
                            key={type}
                            className={filterOrganizationType === type ? 'active' : ''}
                            onClick={() => setFilterOrganizationType(type)}
                        >
                            {type}
                        </span>
                    ))}
                </div>


                <div className="table-container">
                    <CheckInModal
                        isOpen={isCheckInModalOpen}
                        onClose={closeCheckInModal}
                        onCheckIn={handleCheckIn}
                        goal={selectedGoalForCheckIn}
                    />
                    <table>
                        <thead >
                            <tr>
                                <th>목표</th>
                                <th>진행 상황</th>
                                <th>담당 조직</th>
                                <th>담당자</th>
                                <th>기간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderGoalRows(filteredGoals)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default My_Goals;
