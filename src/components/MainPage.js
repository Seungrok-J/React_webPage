import React, { useState } from 'react';
import OrganizationAddModal from './OrganizationAddModal';

function MainPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleAddOrganization = (name, parent) => {
    console.log("Adding organization:", name, "with parent:", parent);
    // 여기에 DB 연결 로직 추가
  };

  return (
    <div>
      <button onClick={openModal}>조직 추가</button>
      <OrganizationAddModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddOrganization}
      />
    </div>
  );
}

export default MainPage;
