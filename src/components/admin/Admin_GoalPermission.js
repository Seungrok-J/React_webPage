import React from 'react';
import { Form, Button, Table, Container, Row, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import './Admin_GoalPermission.css';
function GoalPermissionManagement() {
    return (
        <div className="main-content">
            <Container className="goal-permission-management">
                <Row className="mt-4">
                    <Col>
                        <h1 >목표 권한 관리</h1>
                    </Col>
                </Row>
                <Row>
                    <Col md={8}>
                        <Form>
                            <div className="form-group">
                                <div className="detail-permission">
                                    권한 소유자
                                </div>
                                <p className="description">목표를 수정, 삭제, 체크인 할 수 있는 권한을 가진 대상을 의미합니다.</p>
                                <div className="mb-3_access-type">
                                    <Form.Check
                                        type="radio"
                                        id="all-members"
                                        label="모든 구성원"
                                        name="accessType"
                                        inline
                                        className="custom-radio-me-3"
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="selected-targets"
                                        label="선택한 대상만"
                                        name="accessType"
                                        inline
                                        className="custom-radio"
                                    />
                                </div>
                                <div className="detail-permission">
                                    세부 권한 설정
                                </div>
                                <p className="admin-note">어드민은 모든 목표 권한을 가집니다.</p>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>담당자</th>
                                            <th>조직리더</th>
                                            <th>어드민</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="permission-cell">목표 수정</td>
                                            <td><Form.Check type="checkbox" className="form-check" /></td>
                                            <td><Form.Check type="checkbox" className="form-check" /></td>
                                            <td><Form.Check type="checkbox" checked disabled className="form-check" /></td>
                                        </tr>
                                        <tr>
                                            <td>목표 삭제</td>
                                            <td><Form.Check type="checkbox" className="form-check" /></td>
                                            <td><Form.Check type="checkbox" className="form-check" /></td>
                                            <td><Form.Check type="checkbox" checked disabled className="form-check" /></td>
                                        </tr>
                                        <tr>
                                            <td>목표 체크인</td>
                                            <td><Form.Check type="checkbox" className="form-check" /></td>
                                            <td><Form.Check type="checkbox" className="form-check" /></td>
                                            <td><Form.Check type="checkbox" checked disabled className="form-check" /></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Button type="submit" className="save-button">저장하기</Button>
                            </div>
                        </Form>
                    </Col>
                    <Col md={4}>
                        <div className="p-3 border bg-light reference-box">
                            <p className="smallboxH">조직리더의 범위는?</p> 
                            <br />
                            <p>조직리더를 선택하는 경우, 아래에 해당되는 조직과 그 상위 조직의 모든 리더가 목표에 대한 권한을 갖게 됩니다.</p>
                            <br />
                            <p>목표 담당자의 소속조직</p>
                            <p>목표에 설정된 담당 조직</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default GoalPermissionManagement;
