import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000'; // Укажите ваш базовый URL здесь

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const postDataToServer = async (data) => {
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
    const userData = {};

    // Преобразуем каждое значение из локального хранилища
    const clickedKick = localStorage.getItem('clickedKick') ? JSON.parse(localStorage.getItem('clickedKick')) : false;
    const clickedPublic = localStorage.getItem('clickedPublic') ? JSON.parse(localStorage.getItem('clickedPublic')) : false;
    const dogSkinP = localStorage.getItem('dogSkinP') ? JSON.parse(localStorage.getItem('dogSkinP')) : false;
    const legendarySkinP = localStorage.getItem('legendarySkinP') ? JSON.parse(localStorage.getItem('legendarySkinP')) : false;
    const lastActivity = localStorage.getItem('lastActivity') ? parseInt(localStorage.getItem('lastActivity')) : null;
    const selectedSkin = localStorage.getItem('selectedSkin') ? localStorage.getItem('selectedSkin') : "1";
    const autoBot = localStorage.getItem('autoBot') ? JSON.parse(localStorage.getItem('autoBot')) : false;
    const userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')) : null;
    const balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 0;
    const bust = localStorage.getItem('bust') ? JSON.parse(localStorage.getItem('bust')) : false;
    const bonus = localStorage.getItem('bonus') ? JSON.parse(localStorage.getItem('bonus')) : false;
    const speed = localStorage.getItem('speed') ? JSON.parse(localStorage.getItem('speed')) : false;

    // Заполним объект userData значениями
    userData.clickedKick = clickedKick;
    userData.clickedPublic = clickedPublic;
    userData.dogSkinP = dogSkinP;
    userData.legendarySkinP = legendarySkinP;
    userData.lastActivity = lastActivity;
    userData.selectedSkin = selectedSkin;
    userData.autoBot = autoBot;
    userData.userId = userId;
    userData.balance = balance;
    userData.bust = bust;
    userData.bonus = bonus;
    userData.speed = speed;

    console.log(userData);

    if (Object.keys(userData).length > 0) { // Проверяем, есть ли какие-либо данные пользователя
        try {
            await postDataToServer(userData); // Отправляем объект userData на сервер
            console.log('Data sent successfully');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    } else {
        console.log('No user data found in local storage');
    }
};


export default sendUserDataFromLocalStorage;
