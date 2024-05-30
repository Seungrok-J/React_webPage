import React, { useState } from 'react';
import { Modal, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported

function Admin_CreateCycleModal({ isOpen, onClose, addCycle }) {
    const [cycleName, setCycleName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleCreate = () => {
        if (!cycleName || !startDate || !endDate) {
            alert("모든 필수 필드를 입력해주세요.");
            return;
        }
        const newCycle = { name: cycleName, startDate, endDate };
        addCycle(newCycle);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>사이클 생성</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>사이클 이름</FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter cycle name"
                            value={cycleName}
                            onChange={(e) => setCycleName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>시작일자</FormLabel>
                        <FormControl
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>종료일자</FormLabel>
                        <FormControl
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleCreate}>Create</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Admin_CreateCycleModal;
