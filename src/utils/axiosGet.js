
import axios from 'axios';


const baseURL = 'http://127.0.0.1:8000'; 

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
        localStorage.setItem('balance', response.data.balance);
        return response.data.balance;
    } catch (error) {
        console.error('Error getting balance:', error);
        throw error;
    }
};

export default getBalanceFromServer;
