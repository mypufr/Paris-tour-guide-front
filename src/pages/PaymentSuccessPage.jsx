import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { UserContext } from "../../context/userContext";
import { resetOrder } from "../store/reducers/orderSlice";
import CollapsibleOrderCard from "../components/CollapsibleOrderCard.jsx";
import OrderCard from "../components/OrderCard.jsx";

import axios from "axios";

import data from "../data/data.json";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privateOrders = useSelector((state) => state.order.privateOrders || []);

  // const handleConfirmOrderClick = (id) => {
  //   navigate(
  //     `/search-tourguides/tourguide-profile/${id}/private-trips/payment`,
  //   );
  // };
  const { id } = useParams();

  const CardData = data.find((item) => item.id === parseInt(id));
  // console.log(CardData);

  if (!CardData) {
    return <div>Results not found</div>;
  }

  const { user, setUser } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  // const [privateOrders, setPrivateOrders] = useState([]);

  const checkOrderInfo = () => {
    console.log(privateOrders);
  };

  const getPrivateOrdersData = async (userName = user.username) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${user.username}/private-orders`,
      );
      console.log(res.data);
      setOrderData(res.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleResetBackToHomePageClick = (id) => {
    dispatch(resetOrder());

    navigate("/");
  };

  const handleClearCartClick = (id) => {
    dispatch(resetOrder());

    navigate(`/search-tourguides/`);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    checkOrderInfo();
  }, []);

  return (
    <>
      <div className="py-10 text-center text-3xl font-bold text-black" id="target-section">
        {/* title */}
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            預約成功
          </h2>
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        {/* subNavbar */}
        <div className="m-auto my-4 flex max-w-[75%] justify-center gap-16 py-10">
          <button className="max-w-60 rounded-2xl border border-primary-300 px-10 py-2">
            <p className="text-xl text-primary-300">Step 1 : 確認訂單</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-primary-300 px-10 py-2">
            <p className="text-xl text-primary-300">Step 2 : 付款資料</p>
          </button>
          <button className="max-w-60 rounded-2xl bg-primary-300 px-10 py-2">
            <p className="text-xl text-white">Step 3 : 完成預約</p>
          </button>
        </div>

        <div className="my-4">
          <p className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
            {/* 恭喜{user.username}已完成預約! */}
          </p>
        </div>
        {/* title */}
        <div className="m-auto flex max-w-[55%] flex-col">
          <div className="justify-center space-x-6">
            <div className=""></div>
          </div>
          {/* Private Order List */}

          <div className="">
            <h3 className="mb-10 border-b-4 border-b-primary-300 py-6 pl-4 text-start text-3xl text-primary-600">
              最新私人行程訂單
            </h3>
            {privateOrders.length === 0 ? (
              <p>Loading...</p>
            ) : (
              privateOrders.map((order, index) => (
                <OrderCard
                  key={order._id || index}
                  order={order}
                  index={index}
                />
              ))
            )}
          </div>
          {/* <button
            type="button"
            onClick={getPrivateOrdersData}
            className="btn btn-outline btn-primary mb-6 text-xl"
          >
            瀏覽所有私人行程訂單
          </button> */}

          {/* <div className="toMap">
            {orderData.length === 0 ? (
              <p>Loading...</p>
            ) : (
              orderData.map((order, index) => (
                <CollapsibleOrderCard key={order._id || index} order={order} />
              ))
            )}
          </div> */}

        </div>

        <div className="my-4 flex flex-col items-center justify-center space-y-4">
          <button
            className="flex min-w-60 justify-center space-x-20 rounded-3xl bg-primary-700 px-2 py-2 text-white font-normal"
            // onClick={handleComfirmtOrderClick}
            onClick={() => handleClearCartClick(id)}
          >
            <p className="text-xl">預約其他行程</p>
          </button>

          <button
            className="flex min-w-60 justify-center space-x-20 rounded-3xl border border-primary-700 bg-transparent px-2 py-2 text-primary-600 font-normal"
            onClick={() => handleResetBackToHomePageClick(id)}
          >
            <p className="text-xl">回首頁</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccessPage;
