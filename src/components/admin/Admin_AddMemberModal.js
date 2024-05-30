import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin_AddMemberModal.css';
import axios from 'axios';
function AddMemberModal({ isOpen, onClose, addMember, organizations }) {
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        email: '',
        leader: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        if (!formData.name || !formData.organization || !formData.email) {
            alert("모든 필수 필드를 입력해주세요.");
            return;
        }
        try {
            const response = await axios.post('/api/members', formData);
            alert('구성원이 성공적으로 추가되었습니다.');
            addMember(response.data); // 상태 업데이트 또는 추가 처리
            onClose();
        } catch (error) {
            console.error('Error adding member:', error);
            alert('구성원 추가 중 문제가 발생했습니다.');
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>구성원 추가하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>이름 (필수)</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formOrganization">
                        <Form.Label>소속 조직 (필수)</Form.Label>
                        <Form.Control as="select" name="organization" value={formData.organization} onChange={handleChange} required>
                            <option value="">조직 선택</option>
                            {organizations.map(org => (
                                <option key={org.id} value={org.id}>{org.name}</option>
                            ))}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formLeader">
                        <Form.Check className="leader-checkbox" type="checkbox" name="leader" label="조직 리더로 설정" checked={formData.leader} onChange={handleChange} />
                    </Form.Group>
                    {/* <Form.Group controlId="formRole">
                        <Form.Label>역할</Form.Label>
                        <Form.Control type="text" name="role" value={formData.role} onChange={handleChange} />
                    </Form.Group> */}
                    <Form.Group controlId="formEmail">
                        <Form.Label>이메일 (필수)</Form.Label>
                        <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>취소하기</Button>
                <Button variant="primary" onClick={handleSave}>추가하기</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddMemberModal;
