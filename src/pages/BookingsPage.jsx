import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext.jsx";
import axios from "axios";

import OrderCard from "../components/OrderCard.jsx";
import CollapsibleOrderCard from "../components/CollapsibleOrderCard.jsx";

function BookingsPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.getItem("user", JSON.stringify(user));
      getPrivateOrdersData(user.username);
    }
  }, [user]);

  const [inputAccount, setInputAccount] = useState({
    username: "",
    name: "",
    email: "",
    tel: "",
    isTourist: false,
    isGuide: false,
  });

  useEffect(() => {
    if (user) {
      setInputAccount({
        username: user.username || "",
        name: user.name || "",
        email: user.email || "",
        tel: user.tel || "",
        isTourist: user.isTourist || false,
        isGuide: user.isGuide || false,
      });
    }
  }, [user]); //

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    const { name, value, type, checked } = e.target;
    // console.log(value, name);

    setInputAccount((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputAccount.name) {
      alert("請輸入姓名");
      return;
    }
    try {
      console.log("送出的資料:", inputAccount);
      await axios.post(
        "/profile/edit",

        {
          email: inputAccount.email,
          username: inputAccount.username,
          name: inputAccount.name,
          tel: inputAccount.tel,
          isTourist: inputAccount.isTourist === "on", // ✅ 如果是 "on"，轉為 true
          isGuide: inputAccount.isGuide === "on", // ✅ 同樣轉換 isGuide
        },

        {
          headers: { "Content-Type": "application/json" },
        },
      );
      alert("更新成功!");
      navigate("/profile");
    } catch (error) {
      // alert("註冊失敗，請重新註冊!");
      console.log(error);
      navigate("/sign-up");
    }
  };

  const getPrivateOrdersData = async (userName = user.username) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/${user.username}/private-orders`,
      );
      console.log(res.data);
      setOrderData(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center space-x-4 hover:cursor-pointer">
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[30px]"
        />
        <h2 className="text-2xl font-bold leading-[3rem] tracking-4 text-primary-600">
          您已預訂以下行程
        </h2>
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[30px]"
        />
      </div>

      <div className="w-3/4 m-auto my-6 min-h-screen md:flex gap-2">

        <aside className="bg-primary-300 p-6 pt-8 text-white md:w-1/6">
          <h2 className="text-xl font-bold">會員中心</h2>
          <ul className="flex pt-2 md:flex-col">
            <li>
              <Link
                to={`/${user.username}/profile`}
                className={`block rounded p-2 hover:bg-primary-900 ${
                  location.pathname === `/${user.username}/profile`
                    ? "text-lg font-bold"
                    : ""
                }`}
              >
                會員資料
              </Link>
            </li>
            <li>
              <Link
                to={`/${user.username}/mailbox`}
                className={`block rounded p-2 hover:bg-primary-900 ${
                  location.pathname === "/mailbox" ? "text-lg font-bold" : ""
                }`}
              >
                個人信箱
              </Link>
            </li>
            <li>
              <Link
                to={`/${user.username}/bookings`}
                className={`block rounded p-2 hover:bg-primary-900 ${
                  location.pathname === "/bookings" ? "text-lg font-bold" : ""
                }`}
              >
                已預約行程
              </Link>
            </li>
            <li>
              <Link
                to={`/${user.username}/reviews`}
                className={`block rounded p-2 hover:bg-gray-700 ${
                  location.pathname === "/reviews" ? "text-lg font-bold" : ""
                }`}
              >
                給導遊評價
              </Link>
            </li>
          </ul>
        </aside>

        <main className="flex-1 border border-primary-100 bg-white/80 p-6  md:rounded-lg md:bg-white md:shadow-md">
          <form
            action=""
            className="-z-100 flex w-full max-w-[90%] flex-col gap-6  bg-white/80 p-6 md:rounded-lg md:bg-white "
          >
            <h3 className="flex justify-between border-b-2 border-b-secondary-200  text-start text-xl text-secondary-500">
              私人行程訂單 <span>共{orderData.length}筆</span>
            </h3>


      


            <div className="m-auto w-3/4">
  { !user ? ( 
      <p>Loading...</p>  // 如果 `user` 為 `null`，顯示 Loading
    ) : orderData.length === 0 ? ( 
      <p>沒有訂單資料</p> // 如果 `user` 存在但 `orderData` 為空，顯示無資料
    ) : (
      orderData.map((order, index) => (
        <CollapsibleOrderCard
          key={order._id || index}
          order={order}
          index={index}
        />
      ))
    )
  }
</div>




            <h3 className="m-auto mb-10 flex justify-between border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-3xl text-secondary-500">
              團體行程訂單 <span>共0筆</span>
            </h3>
          </form>
        </main>
      </div>
    </>
  );
}

export default BookingsPage;
