import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import CreateCycleModal from './Admin_CreateCycleModal';

function GoalsManagement() {
    const [cycles, setCycles] = useState([
        {id : 1 , name : '스마트인재개발원 핵심프로젝트', startDate: '2024-05-15', endDate: '2024-05-29'}
    ]);
    const [isCycleModalOpen, setCycleModalOpen] = useState(false);

    useEffect(() => {
        setCycles(cycles);
    },[]);
    // useEffect(() => {
    //     const fetchCycles = async () => {
    //         try {
    //             const response = await axios.get('/api/cycles');
    //             setCycles(response.data);
    //         } catch (error) {
    //             console.error('Failed to fetch cycles:', error);
    //         }
    //     };

    //     fetchCycles();
    // }, []);

    const openCycleModal = () => setCycleModalOpen(true);
    const closeCycleModal = () => setCycleModalOpen(false);

    const addCycle = async (newCycle) => {
        try {
            const response = await axios.post('/api/cycles', newCycle);
            setCycles([...cycles, response.data]);
            closeCycleModal();
        } catch (error) {
            console.error('Failed to add cycle:', error);
        }
    };

    const confirmAndDeleteCycle = (cycles) => {
        if (window.confirm("정말로 이 사이클을 삭제하시겠습니까?")) {
            deleteCycle(cycles.id);
        }
    };


    const deleteCycle = useCallback(async (cycleId) => {
        try {
            await axios.delete(`/api/cycles/${cycleId}`);
            const updatedCycles = cycles.filter(cycle => cycle.id !== cycleId);
            setCycles(updatedCycles); // Update state after deleting
        } catch (error) {
            console.error('Failed to delete cycle:', error);
            alert('사이클 삭제 중 에러가 발생했습니다.');
        }
    }, [cycles]);


    return (
        <div className="main-content">
            <div className="page-management-container">
                <header className="page-header">
                    <h1 className="page-title">목표 관리</h1>
                    <button className="button" onClick={openCycleModal}>사이클 추가</button>
                    <CreateCycleModal isOpen={isCycleModalOpen} onClose={closeCycleModal} addCycle={addCycle} />
                </header>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>사이클 이름</th>
                                <th>기간</th>
                                <th>조치</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cycles.map((cycle) => (
                                <tr key={cycle.id}>
                                    <td>{cycle.name}</td>
                                    <td>{`${cycle.startDate} - ${cycle.endDate}`}</td>
                                    <td>
                                        <button className="delete-button" onClick={() => confirmAndDeleteCycle(cycle.id)}>delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default GoalsManagement;
