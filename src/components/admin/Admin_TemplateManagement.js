import React, { useState } from 'react';
import axios from 'axios'
import CompetencyReviewModal from './Admin_CompetencyReviewModal'; // 가정한 모달 컴포넌트
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import PerformanceReviewModal from './Admin_PerformanceReviewModal'; // 성과리뷰 모달 컴포넌트 추가
import { FaSearch } from 'react-icons/fa'; // 돋보기 아이콘

function TemplateManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterOrganizationType, setFilterOrganizationType] = useState('내 템플릿');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [templates, setTemplates] = useState([
        { name: '성과리뷰', type: '업적리뷰', status: '사용중' },
        { name: '역량리뷰', type: '종합리뷰', status: '미사용' },
        // 추가적인 가상 데이터
    ]);
    const updateTemplateStatus = async (templateId, newStatus) => {
        try {
            // 서버에 PUT 요청을 보냅니다.
            const response = await axios.put(`/api/templates/${templateId}/status`, { status: newStatus });
            // 성공적으로 업데이트되면, 상태를 업데이트합니다.
            setTemplates(templates => templates.map(template => {
                if (template.id === templateId) {
                    return { ...template, status: response.data.status };  // 서버에서 반환된 새로운 상태를 반영
                }
                return template;
            }));
        } catch (error) {
            console.error('Failed to update template status:', error);
            alert('템플릿 상태 업데이트에 실패했습니다.');
        }
    };




    const openTemplateModal = (template) => {
        setSelectedTemplate(template);
        setIsModalOpen(true);
    };

    const closeTemplateModal = () => {
        setSelectedTemplate(null);
        setIsModalOpen(false);
    };

    const handleCreateTemplate = () => {
        alert("개발 중입니다.");
    };

    const renderGoalRows = () => {
        return templates
            .filter(template =>
                template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filterOrganizationType === 'MuddyBuddy제공' || template.type === filterOrganizationType)
            )
            .map((template) => (
                <tr key={template.id} >
                    <td onClick={() => openTemplateModal(template)}>{template.name}</td>
                    <td>{template.type}</td>
                    <td onClick={() => updateTemplateStatus(template.id, template.status === '사용중' ? '미사용' : '사용중')}>
                        {template.status}
                    </td>
                </tr>
            ));
    };

    const renderModal = () => {
        if (!selectedTemplate) return null;
        switch (selectedTemplate.type) {
            case '업적리뷰':
                return (
                    <PerformanceReviewModal
                        isOpen={isModalOpen}
                        onClose={closeTemplateModal}
                    />
                );
            case '종합리뷰':
                return (
                    <CompetencyReviewModal
                        isOpen={isModalOpen}
                        onClose={closeTemplateModal}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="main-content">
            <div className="page-management-container">
                <header className="page-header">
                    <h1>템플릿 관리</h1>
                    <button className="button" onClick={handleCreateTemplate}>템플릿 만들기</button>
                </header>

                <div className="organization-filters">
                    {['내 템플릿', 'MuddyBuddy제공', '보관함'].map(type => (
                        <span
                            key={type}
                            className={filterOrganizationType === type ? 'active' : ''}
                            onClick={() => setFilterOrganizationType(type)}
                        >
                            {type}
                        </span>
                    ))}
                </div>
                <InputGroup style={{ width: '25%', marginBottom: '20px' }}>
                    <FormControl
                        placeholder="템플릿 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-secondary">
                        <FaSearch />
                    </Button>
                </InputGroup>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>템플릿 이름</th>
                                <th>템플릿 유형</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderGoalRows()}
                        </tbody>
                    </table>
                </div>
            </div>
            {renderModal()}

        </div>
    );
}

export default TemplateManagement;