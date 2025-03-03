import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useSelector, useDispatch } from "react-redux";
import { resetOrder } from "../store/reducers/orderSlice";

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
      
      const handleResetBackToHomePageClick = (id) => {
    
        dispatch(resetOrder()); 
    
    
        navigate("/");
      };
      
      const handleClearCartClick = (id) => {
    
        dispatch(resetOrder()); 
    
    
        navigate(`/search-tourguides/`);
      };
      
      useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      <div className="py-10 text-center text-3xl font-bold text-black">
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
        <div className="m-auto my-10 flex max-w-[75%] justify-center gap-16 py-10">
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-10 py-2">
            <p className="text-xl text-secondary-500">Step 1 : 確認訂單</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-10 py-2">
            <p className="text-xl text-secondary-500">Step 2 : 付款資料</p>
          </button>
          <button className="max-w-60 rounded-2xl bg-secondary-300 px-10 py-2">
            <p className="text-xl text-white">Step 3 : 完成預約</p>
          </button>
        </div>

        <div className="my-10">
          <p className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
            {/* 恭喜{user.username}已完成預約! */}
          </p>
        </div>
        {/* title */}
        <div className="m-auto flex max-w-[55%] flex-col">
          <div className="justify-center space-x-6">
            <div className="">
        

        
            </div>
          </div>
          {/* Private Order List */}
          <div className="mt-6">
        
                         <h3 className="mb-10 border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-3xl text-secondary-500">
                私人行程訂單
              </h3>

              <button
                type="button"
                onClick={getPrivateOrdersData}
                className="btn btn-outline btn-primary text-xl mb-6"
              >
                瀏覽所有私人行程訂單
              </button>

            {orderData.length === 0 ? (
         <p></p>
            ) : (
           
              orderData.map((order, index) => (
                <div key={order._id || index} className="mb-6">
                  <div className="bg-primary-100 p-4 text-xl text-primary-700">
                    <p>訂單編號: {order.privateOrderNumber}</p>
                  </div>

                  <div className="flex max-w-full border-spacing-3 border">
                    <div className="flex min-w-[30%] flex-col justify-center border border-background-2 bg-gray-100 px-8 py-6 font-normal">
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={order.tourguideInfo.imgUrl || "Loading..."}
                          alt="導遊"
                          className="inline-block h-20 w-20 rounded-full"
                        />
                        <p className="text-xl text-secondary-700">
                          {order.tourguideInfo.name || "未知導遊"} 導遊
                        </p>
                      </div>
                    </div>

                    <div className="m-auto flex flex-col items-center font-normal">
                      <div className="flex flex-col space-y-6 p-10">
                        <div className="flex items-center">
                          <p className="text-xl text-primary-700">預定日期：</p>
                          <div className="relative max-w-sm">
                            <p className="text-lg">
                              {order.selectedDate || "未選擇日期"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="text-xl text-primary-700">預定人數：</p>
                          <div className="relative max-w-sm">
                            <p className="text-lg">
                              {order.adultCount} 位大人, {order.childCount}{" "}
                              位小孩
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="text-xl text-primary-700">行程主題：</p>
                          <div className="relative max-w-sm">
                            <p className="text-lg">
                              {order.selectedTheme || "未選擇主題"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <p className="text-xl text-primary-700">服務時段：</p>
                          <div className="relative max-w-sm">
                            <p className="text-lg">
                              {order.selectedSlot || "未選擇時段"}
                            </p>
                          </div>
                        </div>

                        <button className="ml-auto rounded-xl bg-secondary-200 p-2 px-6 text-base font-normal text-secondary-700">
                          看詳情
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* <div className="w-full justify-center space-x-6">
            <div className="">
              <h3 className="mb-10 border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-3xl text-secondary-500">
                定點行程訂單
              </h3>
              <div className="bg-primary-600 p-4 text-xl text-white">
                <p>訂單編號 : MYP-PR-84023455</p>
              </div>

              <div className="flex max-w-full border-spacing-3 border">
     

                <div className="flex min-w-[30%] flex-col justify-center border border-background-2 bg-background-2 px-8 py-6">
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src="https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                      alt=""
                      className="inline-block h-20 max-w-20 rounded-full"
                    />
                    <p className="text-xl text-secondary-700">
                      Sophie Pinto導遊
                    </p>
                  </div>
                </div>

                <div className="m-auto flex flex-col items-center">
                  <div className="flex flex-col space-y-6 p-10">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-xl text-primary-700">預定日期：</p>
                        <div className="relative max-w-sm">
                          <p className="text-lg">2024年10月20日</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-xl text-primary-700">預定人數：</p>
                        <div className="relative max-w-sm">
                          <p className="text-lg">4位成人</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-xl text-primary-700">行程主題：</p>
                        <div className="relative max-w-sm">
                          <p className="text-lg">龐畢度中心導覽 - 團體行程</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-xl text-primary-700">服務時段：</p>
                        <div className="relative max-w-sm">
                          <p className="text-lg">13:00 - 16:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

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
            onClick={() => handleResetBackToHomePageClick (id)}
          >
            <p className="text-xl">回首頁</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccessPage;
