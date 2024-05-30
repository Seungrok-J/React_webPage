import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditMemberModal from './admin/Admin_EditMemberModal';
import { useDarkMode } from '../DarkModeContext';

function UserInfo({ user, isOpen, onClose, updateMember }) {
  const [isEditModalOpen, setEditSubmitOpen] = useState(false);
  const [organizations, setOrganizations] = useState([]); // 필요한 경우 상태 추가

  const openEditModal = () => {
    setEditSubmitOpen(true);
  };

  const closeEditModal = () => {
    setEditSubmitOpen(false);
  };
  
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>사용자 정보</Modal.Title>
        <label className="switch" style={{ marginLeft: '20px' }}>
          <input type="checkbox" onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
          <span className="slider round"></span>
        </label>
      </Modal.Header>
      <Modal.Body>
        <div className="user-info-container">
          <p className="user-info-field"><strong>이름:</strong> {user.name}</p>
          <p className="user-info-field"><strong>역할:</strong> {user.role}</p>
          <p className="user-info-field"><strong>이메일:</strong> {user.email}</p>
          <p className="user-info-field"><strong>소속 조직:</strong> {user.organization}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={openEditModal}>수정</Button>
      </Modal.Footer>

      {isEditModalOpen && (
        <EditMemberModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          member={user}
          updateMemberInState={updateMember}
          organizations={organizations}
        />
      )}
    </Modal>
  );
}

export default UserInfo;
