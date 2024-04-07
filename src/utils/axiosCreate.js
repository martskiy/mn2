// api.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000'; // Укажите ваш базовый URL здесь

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const postDataToServer = async (data) => {
    try {
        const response = await axiosInstance.post('/api/user-data/', data);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

const sendUserDataFromLocalStorage = async () => {
    const userId = localStorage.getItem('userId');
    const balance = localStorage.getItem('balance');
    
    const userData = { userId: userId, balance: balance }; 

    console.log(userData);

    if (userId && balance) { 
        try {
            await postDataToServer(userData); 
            console.log('Data sent successfully');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    } else {
        console.log('No user data found in local storage');
    }
};

export default sendUserDataFromLocalStorage;