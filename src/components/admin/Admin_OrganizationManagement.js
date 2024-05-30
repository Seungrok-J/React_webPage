import React, { useState } from 'react';
import OrganizationAddModal from './Admin_OrganizationAddModal';
import axios from 'axios';
import { useEffect } from 'react';

const initialOrganizations = [
    {
        id: 1,
        name: "MuddyBuddy",
        leader: "고영민",
        memberCount: 4,
        parentOrg: null,
        children: [
            {
                id: 2,
                name: "개발팀",
                leader: "이양희",
                memberCount: 2,  // 하위 조직의 구성원 수
                parentOrg: 1,   // 상위 조직의 ID 참조
                children: []    // 추가 하위 조직이 없는 경우
            },
            {
                id: 3,
                name: "기획팀",
                leader: "고영민",
                memberCount: 2,  // 하위 조직의 구성원 수
                parentOrg: 1,   // 상위 조직의 ID 참조
                children: []
            }
        ]
    }
];



function OrganizationManagement() {
    const [organizations, setOrganizations] = useState(initialOrganizations);
    
    //const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const { data } = await axios.get('/api/organizations');
                setOrganizations(data);
            } catch (error) {
                console.error('조직 정보를 불러오는데 실패했습니다.', error);
            }
        };

        fetchOrganizations();
    }, []);

    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="main-content">
            <div className="page-management-container">
                <header className="page-header">
                    <h1 className="page-title">조직 관리</h1>
                    <button className="button" onClick={openModal}>조직 추가</button>
                    <OrganizationAddModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        organizations={organizations}
                    />
                </header>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>조직명</th>
                                <th>설립자</th>
                                <th>구성원 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {organizations.map(org => (
                                <Organization key={org.id} data={org} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}




function Organization({ data, level = 0 }) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(!expanded);

    return (
        <>
            <tr className={expanded ? "expanded" : ""} onClick={toggleExpand}>
                <td style={{ paddingLeft: `${level * 40}px` }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {data.children.length > 0 && (
                            <span onClick={toggleExpand} style={{ cursor: 'pointer', marginRight: '10px', marginLeft:'10px' }}>
                                {expanded ? '▼' : '▶'}
                            </span>
                        )}
                        {data.name}
                    </div>
                </td>
                <td>{data.leader}</td>
                <td>{data.memberCount}</td>
            </tr>
            {expanded && data.children.map(child => (
                <Organization key={child.id} data={child} level={level + 1} />

            ))}
        </>
    );
}




export default OrganizationManagement;
