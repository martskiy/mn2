
import axios from 'axios';


const baseURL = 'https://borovs.onrender.com/'; 

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getBalanceFromServer = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/balance/${userId}/`);
        console.log(response.data);
        return response.data.balance;
    } catch (error) {
        console.error('Error getting balance:', error);
        throw error;
    }
};

export default getBalanceFromServer;
