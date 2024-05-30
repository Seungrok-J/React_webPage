import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemberAddModal from './Admin_AddMemberModal';
import EditMemberModal from './Admin_EditMemberModal';

function MemberManagement() {
    const [members, setMembers] = useState([]);
    const [organizations, setOrganizations] = useState([]);  // 조직 데이터도 마찬가지로 서버에서 가져올 수 있도록 설정
    const [selectedMember, setSelectedMember] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const mockOrganizations = [
        { id: 1, name: 'Project Management' },
        { id: 2, name: 'Design Team' },
        { id: 3, name: 'Product Team' },
        { id: 4, name: 'Development' }
    ];

    // 가상의 구성원 데이터
    const mockMembers = [
        { id: 1, name: '고영민', isLeader: true, organization: '기획팀', email: 'catmin@company.com' },
        { id: 2, name: '이양희', isLeader: false, organization: '개발팀', email: 'lyh@company.com' },
        { id: 3, name: '정승록', isLeader: false, organization: '개발팀', email: 'jsr@company.com' },
        { id: 4, name: '양연정', isLeader: false, organization: '기획팀', email: 'yyj@company.com' },
    ];

    // React 컴포넌트에서 이 데이터를 사용하는 방법
    // 예시: 초기 상태 설정에 mockOrganizations와 mockMembers 사용하기
    useEffect(() => {
        setOrganizations(mockOrganizations);
        setMembers(mockMembers);
    }, []);
    // useEffect(() => {
    //     const fetchMembers = async () => {
    //         try {
    //             const memberResponse = await axios.get('/api/members');
    //             setMembers(memberResponse.data);
    //             const orgResponse = await axios.get('/api/organizations');
    //             setOrganizations(orgResponse.data);
    //         } catch (error) {
    //             console.error('구성원 데이터를 불러오는데 실패했습니다.', error);
    //         }
    //     };

    //     fetchMembers();
    // }, []);

    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    const openEditModal = (member) => {
        if (!member) {
            console.error('No member data to edit');
            return;
        }
        setSelectedMember(member);
        // 상태 업데이트 후 모달을 열기 위해 상태 업데이트가 반영된 것을 확인하고 모달을 열어야 합니다.
        // 이를 위해 useEffect를 사용하여 selectedMember가 변경되었을 때 모달을 열 수 있습니다.
    };


    useEffect(() => {
        if (selectedMember) {
            setEditModalOpen(true);
        }
    }, [selectedMember]);  // selectedMember가 변경될 때만 모달을 열도록 설정

    const closeEditModal = () => setEditModalOpen(false);

    const updateMember = (updatedMember) => {
        const updatedMembers = members.map(member =>
            member.id === updatedMember.id ? updatedMember : member
        );
        setMembers(updatedMembers);
        closeEditModal();
    };

    return (
        <div className="main-content">
            <div className="page-management-container">
                <header className="page-header">
                    <h1>구성원 관리</h1>
                    <button className="button" onClick={openAddModal}>조직원 추가</button>
                    <MemberAddModal
                        isOpen={isAddModalOpen}
                        onClose={closeAddModal}
                        organizations={organizations}
                    />
                    {selectedMember && (
                        <EditMemberModal
                            isOpen={isEditModalOpen}
                            onClose={closeEditModal}
                            member={selectedMember}
                            updateMemberInState={updateMember}
                            organizations={organizations}
                        />
                    )}
                </header>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>이름</th>
                                <th>리더 여부</th>
                                <th>소속조직</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id}>
                                    <td className="checkbox-cell"><input type="checkbox" /></td>
                                    <td className="avatar-cell">
                                        <div className="avatar-circle">
                                            <span>{member.name[0]}</span>
                                        </div>
                                    </td>
                                    <td onClick={() => openEditModal(member)}>{member.name}</td>
                                    <td>{member.isLeader ? "예" : "아니오"}</td>
                                    <td>{member.organization}</td>
                                    <td>{member.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MemberManagement;
