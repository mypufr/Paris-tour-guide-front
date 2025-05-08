import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from "axios";

import OrderCard from "../components/OrderCard.jsx";
import CollapsibleOrderCard from "../components/CollapsibleOrderCard.jsx";

function EditProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; //設定每頁顯示筆數

  useEffect(() => {
    if (user && user.username) {
      localStorage.setItem("user", JSON.stringify(user));
      getPrivateOrdersData();
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
    if (!user || !user.username) return; // 避免 user 為 null 時執行
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${user.username}/private-orders`,
      );
      console.log(res.data);

      const sortedData = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      // ✅ 讓新訂單排在前面
      console.log(sortedData);
      setOrderData(sortedData);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const totalPages = Math.ceil(orderData.length / itemsPerPage);
  const displayedOrders = orderData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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

      <div className="m-auto my-6 min-h-screen w-5/6 gap-2 md:flex">
        <aside className="bg-primary-600 p-6 pt-8 text-white md:w-1/6">
          <h2 className="text-xl font-bold">會員中心</h2>
          <ul className="flex pt-2 md:flex-col">
            <li>
              <Link
                to={user ? `/${user.username}/profile` : "#"}
                className={`block rounded p-2 hover:bg-primary-900 ${
                  location.pathname === `/${user?.username}/profile`
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
                className={`block rounded p-2 hover:bg-primary-900 ${
                  location.pathname === "/reviews" ? "text-lg font-bold" : ""
                }`}
              >
                給導遊評價
              </Link>
            </li>
          </ul>
        </aside>

        <main className="flex-1 border border-primary-100 bg-white/80 p-6 md:rounded-lg md:bg-white md:shadow-md">
          <h3 className="m-auto mb-10 flex justify-between border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-2xl text-secondary-500">
            私人行程訂單 <span>共{orderData.length}筆</span>
          </h3>
          <div className="flex flex-col">
            <div className="m-auto w-3/4">
              {orderData.length === 0 ? (
                <p>Loading...</p>
              ) : (
                displayedOrders.map((order, index) => (
                  <CollapsibleOrderCard
                    key={order._id || index}
                    order={order}
                    index={index}
                  />
                ))
              )}
            </div>

            <div className="join justify-center">
              <button
                className="btn join-item "
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button className="btn join-item bg-gray-50">
                {" "}
                Page {currentPage} / {totalPages}
              </button>
              <button
                className="btn join-item"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>

          <h3 className="m-auto mb-10 flex justify-between border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-2xl text-secondary-500">
            團體行程訂單 <span>共0筆</span>
          </h3>

          <div className="my-20 flex flex-col items-center justify-center space-y-4">
            <button
              className="flex min-w-60 justify-center space-x-20 rounded-3xl bg-primary-700 px-2 py-2 text-white"
              // onClick={handleComfirmtOrderClick}
              onClick={() => handleClearCartClick(id)}
            >
              <p className="text-xl">預約其他行程</p>
            </button>

            <button
              className="flex min-w-60 justify-center space-x-20 rounded-3xl border border-primary-700 bg-transparent px-2 py-2 text-primary-500"
              onClick={() => handleResetBackToHomePageClick(id)}
            >
              <p className="text-xl">回首頁</p>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default EditProfile;
