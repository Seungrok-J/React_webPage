import axios from 'axios';

const baseUrl = '/api/organizations';

export const fetchOrganizations = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        console.error('조직 데이터를 불러오는 데 실패했습니다', error);
        throw error;
    }
};

export const addOrganization = async (organization) => {
    try {
        const response = await axios.post(baseUrl, organization);
        return response.data;
    } catch (error) {
        console.error('조직 추가에 실패했습니다.', error);
        throw error;
    }
};

// 추가적으로 필요한 API 함수들을 여기에 구현할 수 있습니다.
