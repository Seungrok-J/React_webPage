import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import { updateMember } from '../../api/membersApi';  // API 함수 임포트

function EditMemberModal({ isOpen, onClose, member, updateMemberInState, organizations }) {
  const [memberData, setMemberData] = useState({ ...member });
  useEffect(() => {
    setMemberData({ ...member });
  }, [member]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setMemberData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();  // 폼의 기본 제출 동작을 막습니다.
    updateMember(memberData);  // API 호출
    updateMemberInState(memberData);  // 상태 업데이트
    onClose();  // 모달 닫기
  };


  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>사용자 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>이름</Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={memberData.name} onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>리더 여부</Form.Label>
            <Col sm={10}>
              <Form.Control as="select" name="isLeader" value={memberData.isLeader} onChange={handleChange}>
                <option value="true">예</option>
                <option value="false">아니오</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>소속 조직</Form.Label>
            <Col sm={10}>
              <Form.Control as="select" value={memberData.organization} onChange={handleChange}>
                {organizations.map(org => (
                  <option key={org.id} value={org.name}>{org.name}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>이메일</Form.Label>
            <Col sm={10}>
              <Form.Control type="email" value={memberData.email} onChange={handleChange} />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>취소</Button>
        <Button variant="primary" type="submit">저장하기</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditMemberModal;
