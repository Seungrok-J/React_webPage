import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Modal from '../modal'; // 모달 컴포넌트 import

function CheckInModal({ isOpen, onClose, onCheckIn, goal }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (goal) {
            setProgress(goal.progress || 0);
            setStatus(goal.status || '');
            setComment(goal.comment || '');
        }
    }, [goal]);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const handleSave = () => {
        onCheckIn(goal.id, progress, status, comment);
        onClose();
    };

    if (!isOpen || !goal) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} centered title="목표 상세 정보">
            <Form className="p-3">
                <FormGroup>
                    <Label for="goal">목표</Label>
                    <Input type="text" name="goal" id="goal" value={goal.name} disabled />
                </FormGroup>
                <FormGroup>
                    <Label for="progress">진행 상태</Label>
                    <Input type="number" name="progress" id="progress" value={progress} 
                        onChange={e => setProgress(Math.max(0, Math.min(100, parseInt(e.target.value, 10))))} />
                    <FormText className="text-muted">현재 진행률은 {progress}% 입니다.</FormText>
                </FormGroup>
                <FormGroup>
                    <Label for="status">상태</Label>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>
                            {status || '상태 선택'}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setStatus('순항')}>순항</DropdownItem>
                            <DropdownItem onClick={() => setStatus('난항')}>난항</DropdownItem>
                            <DropdownItem onClick={() => setStatus('중단')}>중단</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </FormGroup>
                <FormGroup>
                    <Label for="comment">의견</Label>
                    <Input type="textarea" name="comment" id="comment" value={comment} onChange={e => setComment(e.target.value)} />
                </FormGroup>
                <div className="d-flex justify-content-end">
                    <Button color="secondary" onClick={onClose} className="me-2">취소</Button>
                    <Button color="primary" onClick={handleSave}>저장</Button>
                </div>
            </Form>
        </Modal>
    );
}

export default CheckInModal;
