import UserContext from "../context/UserContext";
import { useContext } from "react";
import axios from "axios";

const baseURL = "http://127.0.0.1:8000"; // Укажите ваш базовый URL здесь

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postDataToServer = async (data) => {
  const { setBalance } = useContext(UserContext);
  try {
    const response = await axiosInstance.post("/api/user-data/", data);
    console.log(response.data);
    setBalance(response.data.balance);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

const sendUserDataFromLocalStorage = async () => {
  const userId = localStorage.getItem("userId");
  const balance = localStorage.getItem("balance");
  const clickedKick = localStorage.getItem("clickedKick");
  const clickedPublic = localStorage.getItem("clickedPublic");
  const dogSkinP = localStorage.getItem("dogSkinP");
  const legendarySkinP = localStorage.getItem("legendarySkinP");
  const lastActivity = localStorage.getItem("lastActivity");
  const selectedSkin = localStorage.getItem("selectedSkin");
  const autoBot = localStorage.getItem("autoBot");
  const bust = localStorage.getItem("bust");
  const bonus = localStorage.getItem("bonus");
  const speed = localStorage.getItem("speed");

  const userData = {
    userId: userId,
    balance: balance,
    clickedKick: clickedKick,
    clickedPublic:clickedPublic,
    dogSkinP:dogSkinP,
    legendarySkinP:legendarySkinP,
    lastActivity:lastActivity,
    selectedSkin:selectedSkin,
    autoBot:autoBot,
    bust:bust,
    bonus:bonus,
    speed:speed
  };

  console.log(userData);

  if (userId && balance) {
    try {
      await postDataToServer(userData);
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  } else {
    console.log("No user data found in local storage");
  }
};

export default sendUserDataFromLocalStorage;
