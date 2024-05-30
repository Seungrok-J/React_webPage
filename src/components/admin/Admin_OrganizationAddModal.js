import React, { useState, useEffect } from 'react';
import { fetchOrganizations, addOrganization } from '../../api/organizationApi';
import './Admin_OrganizationAddModal.css';

function OrganizationAddModal({ isOpen, onClose, onAdd }) {
  const [organizationName, setOrganizationName] = useState('');
  const [parentOrganization, setParentOrganization] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      fetchOrganizations()
        .then(orgs => {
          setOrganizations(orgs);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('조직 목록을 불러오는데 실패했습니다.', error);
          setError('조직 데이터를 불러오는데 실패했습니다.');
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  const handleAddClick = async () => {
    if (!organizationName.trim()) {
      alert('조직 이름을 입력해주세요.');
      return;
    }
    if (organizations.length > 0 && !parentOrganization) {
      alert('상위 조직을 선택해주세요.');
      return;
    }
    
    try {
        const newOrg = { name: organizationName, parentId: parentOrganization };
        const addedOrg = await addOrganization(newOrg);
        onAdd(addedOrg); // 부모 컴포넌트의 상태 업데이트
        alert('조직이 성공적으로 추가되었습니다.');
        handleClose();
    } catch (error) {
        alert('조직 추가에 실패했습니다.');
        console.error('Error adding organization:', error);
    }
  };

  const handleClose = () => {
    // 폼을 초기화하고 모달을 닫습니다.
    setOrganizationName('');
    setParentOrganization('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay_org">
      <div className="modal-content_org">
        <h2>조직 추가</h2>
        <input
          type="text"
          className="modal-input"
          placeholder="조직 이름"
          value={organizationName}
          onChange={e => setOrganizationName(e.target.value)}
        />
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <select
            className="modal-input"
            value={parentOrganization}
            onChange={e => setParentOrganization(e.target.value)}
          >
            <option value="" disabled>상위 조직 선택</option>
            {organizations.map(org => (
              <option key={org.id} value={org.id}>{org.name}</option>
            ))}
          </select>
        )}
        <div className="modal-buttons">
          <button className="modal-button" onClick={handleAddClick}>조직 추가</button>
          <button className="modal-button" onClick={handleClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default OrganizationAddModal;
