// membersApi.js
import axios from 'axios';

const baseUrl = '/api/members';

export const updateMember = async (id, memberData) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, memberData);
        return response.data;
    } catch (error) {
        console.error('멤버 업데이트 실패', error);
        throw error;
    }
};
