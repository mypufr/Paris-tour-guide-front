import axios from "axios";

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {

const [user, setUser] = useState(()=>{
  const storeUser = localStorage.getItem("user");
  return storeUser ? JSON.parse(storeUser): null;
});


useEffect(()=> {
  if(user) {
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
  }else{
    localStorage.removeItem("user");
  }
}, [user])


  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //    if (!user) {
  //      axios.get("/profile").then(({ data }) => { //email password
  //        setUser(data);
  //      });
  //    }
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

