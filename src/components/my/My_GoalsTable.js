import React from 'react';
import './My_Goals.css'; // CSS 스타일시트 임포트

function GoalsTable() {
    const goalsData = [
        { id: 1, goal: "매출 증대 20%", status: "진행 중", organization: "영업팀", manager: "홍길동", period: "2021-01-01 ~ 2021-12-31" },
        { id: 2, goal: "신제품 개발 완료", status: "완료", organization: "개발팀", manager: "김개발", period: "2021-02-01 ~ 2021-08-30" },
        // 추가 목표 데이터...
    ];

    return (
        <table className="goals-table">
            <thead>
                <tr>
                    <th>목표</th>
                    <th>진행상황</th>
                    <th>담당조직</th>
                    <th>담당자</th>
                    <th>기간</th>
                </tr>
            </thead>
            <tbody>
                {goalsData.map(goal => (
                    <tr key={goal.id}>
                        <td>{goal.goal}</td>
                        <td>{goal.status}</td>
                        <td>{goal.organization}</td>
                        <td>{goal.manager}</td>
                        <td>{goal.period}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default GoalsTable;
