import axios from "axios";

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  // const [user, setUser] = useState(()=>{
  //   const storeUser = localStorage.getItem("user");
  //   return storeUser ? JSON.parse(storeUser): null;
  // });

  // useEffect(()=> {
  //   if(user) {
  //     console.log(user);
  //     localStorage.setItem("user", JSON.stringify(user));
  //   }else{
  //     localStorage.removeItem("user");
  //   }
  // }, [user])

  const [user, setUser] = useState(null);

  // useEffect(() => {
  //    if (!user) {
  //      axios.get("http://localhost:8000/api/profile").then(({ data }) => { //email password
  //        setUser(data);
  //      });
  //    }
  // }, []);

  const getUserProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        withCredentials: true,
      });
      const userData = res.data;
      console.log(userData);
      // if (userData.user) {
      //   setUser(userData.user);
      //   localStorage.setItem("user", JSON.stringify(userData.user)); // 存入 localStorage
      // }
    } catch (error) {
      console.error("取得用戶資料失敗:", error);
    }
  };

  useEffect(() => {
  getUserProfile();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
