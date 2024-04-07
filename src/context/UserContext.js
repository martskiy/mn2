import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export default UserContext;

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [ userId, setUserId] = useState(() => {
    const idStore = localStorage.getItem("userId");
    return idStore ? JSON.parse(idStore) : null;
  })
  const [hundred, setHundred] = useState(false);
  const [fiveHundred, setFiveHundred] = useState(false);
  const [bust, setBust] = useState(() => {
    const bustStore = localStorage.getItem("bust");
    return bustStore ? JSON.parse(bustStore) : false;
  });
  const [speed, setSpeed] = useState(() => {
    const speedStore = localStorage.getItem("speed");
    return speedStore ? JSON.parse(speedStore) : false;
  });
  const [autoBot, setAutoBot] = useState(() => {
    const autoBotStore = localStorage.getItem("autoBot");
    return autoBotStore ? JSON.parse(autoBotStore) : false;
  });
  const [balance, setBalance] = useState(() => {
    const storedUserState = localStorage.getItem("balance");
    return storedUserState ? JSON.parse(storedUserState) : 0;
  });
  const [bonus, setBonus] = useState(() => {
    const bonusStore = localStorage.getItem("bonus");
    return bonusStore ? JSON.parse(bonusStore) : false;
  });

  const [dogSkinP, setDogSkinP] = useState(() => {
    const storedValue = localStorage.getItem("dogSkinP");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  
  const [ legendarySkinP, setLegendarySkinP] = useState(() => {
    const legPStore = localStorage.getItem("legendarySkinP");
    return legPStore ? JSON.parse(legPStore) : false;
  })


  useEffect(() => {
    const saveUserStateToLocalStorage = () => {
      localStorage.setItem("balance", JSON.stringify(balance));
    };
    saveUserStateToLocalStorage();
  }, [balance]);

  let contextData = {
    setBalance: setBalance,
    balance: balance,
    setBust: setBust,
    bust: bust,
    loading: loading,
    setLoading: setLoading,
    setHundred: setHundred,
    setFiveHundred: setFiveHundred,
    hundred: hundred,
    fiveHundred: fiveHundred,
    speed: speed,
    setSpeed: setSpeed,
    autoBot: autoBot,
    setAutoBot: setAutoBot,
    bonus: bonus,
    setBonus: setBonus,
    dogSkin:dogSkin,
    dogSkinP:dogSkinP,
    setDogSkin:setDogSkin,
    setDogSkinP:setDogSkinP,
    legendarySkin:legendarySkin,
    legendarySkinP:legendarySkinP,
    setLegendarySkin:setLegendarySkin,
    setLegendarySkinP:setLegendarySkinP,
    defaultSkin:defaultSkin,
    setDefaultSkin:setDefaultSkin,
    skinChoose:skinChoose, 
    setSkinChoose:setSkinChoose,
    setUserId:setUserId,
    userId:userId,




  };

  return (
    <UserContext.Provider value={{ contextData }}>
      {children}
    </UserContext.Provider>
  );
};
