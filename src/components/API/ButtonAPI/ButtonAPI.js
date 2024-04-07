import React, { useContext, useState } from 'react';
import UserContext from '../../../context/UserContext'

const MyComponent = () => {
  const { balance } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const sendDataToServer = async () => {
    setIsLoading(true);

    try {
      const { user_id } = userContext.userData; 

      const response = await fetch(`http://127.0.0.1:8000/api/get/?user_id=${user_id}`);

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();
      console.log('Полученные данные:', data);

    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={sendDataToServer} disabled={isLoading}>
        {isLoading ? 'Загрузка...' : 'Отправить данные на сервер'}
      </button>
    </div>
  );
};

export default MyComponent;
