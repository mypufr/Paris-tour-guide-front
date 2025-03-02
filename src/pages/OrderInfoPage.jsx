import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useDispatch, useSelector } from "react-redux";

import { addPrivateOrder } from "../store/reducers/orderSlice.jsx";

import data from "../data/data.json";

function OrderInfoPage() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const privateOrders = useSelector((state) => state.order.privateOrders || []);

  const handleGoBackClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}`);
  };

  const checkOrderInfo = () => {
    console.log(privateOrders);
  };

  const handleConfirmOrderClick = (id) => {
    alert("前往付款")
    navigate(
      `/search-tourguides/tourguide-profile/${id}/private-trips/payment`,
    );
  };
  const { id } = useParams();
  const CardData = data.find((item) => item.id === parseInt(id));
  console.log(CardData);

  if (!CardData) {
    return <div>Results not found</div>;
  }

  useEffect(() => {
    if (user) {
      localStorage.getItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      <div className="py-10 text-center text-3xl font-bold text-black">
        {/* subNavbar */}
{/* 
        <button onClick={checkOrderInfo}>check order info</button> */}

        <div className="my max-w-3/4 m-auto flex justify-center gap-16 py-10">
          <button className="max-w-60 rounded-2xl bg-secondary-300 px-8 py-2">
            <p className="text-xl text-white">Step 1 :預約資訊</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-10 py-2">
            <p className="text-xl text-secondary-500">Step 2 : 預約付款</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-10 py-2">
            <p className="text-xl text-secondary-500">Step 3 : 完成預約</p>
          </button>
        </div>

        {/* title */}
        <div className="flex justify-center space-x-4 hover:cursor-pointer m-2">
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
  
              <button onClick={checkOrderInfo}>  <p className="text-3xl text-primary-700">
                {user.username}的訂單明細
              </p></button>
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        <div className="m-auto flex max-w-[75%] justify-center space-x-6 py-5">
          <div className="min-w-[50%] border-spacing-3 border">
            {/* Selected Tourguide  */}
            <div className="m-auto flex w-full flex-col items-center justify-center space-y-8 border border-background-2 bg-background-2 px-8 py-6">
          
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={
                    privateOrders.length > 0
                      ? privateOrders[privateOrders.length - 1].tourguideInfo
                          .imgUrl
                      : "Loading..."
                  }
                  alt=""
                  className="inline-block h-20 max-w-20 rounded-full"
                />
                <p className="text-xl text-secondary-700">
                  {privateOrders.length > 0
                    ? privateOrders[privateOrders.length - 1].tourguideInfo.name
                    : "Loading..."}
                </p>
              </div>
              <p className=" text-primary-800 text-base font-normal">
                專長：
                {privateOrders.length > 0
                  ? privateOrders[
                      privateOrders.length - 1
                    ].tourguideInfo.themes.map((theme, index, arr) => (
                      <span key={index} className="text-base font-normal text-secondary-700">
                        {theme}
                        {index !== arr.length - 1 ? "、" : ""}
                      </span>
                    ))
                  : "Loading..."}{" "}
              </p>
            </div>
            {/* Options */}
            <div className="m-auto flex border-spacing-4 flex-col items-center border border-background-2 pt-6">
              <div className="marker: flex flex-col space-y-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl font-normal text-primary-700">
                      預約人：
                    </p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">
                        {/* {user.id } */}
                        {user.username}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl font-normal text-primary-700">
                      日期：
                    </p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">
                        {privateOrders.length > 0
                          ? privateOrders[privateOrders.length - 1].selectedDate
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl font-normal text-primary-700">
                      人數：
                    </p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">
                        {privateOrders.length > 0
                          ? privateOrders[privateOrders.length - 1].adultCount
                          : "Loading..."}
                        位大人、
                        {privateOrders.length > 0
                          ? privateOrders[privateOrders.length - 1].childCount
                          : "Loading..."}
                        位小孩
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl font-normal text-primary-700">
                      主題：
                    </p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">
                        {privateOrders.length > 0
                          ? privateOrders[privateOrders.length - 1]
                              .selectedTheme
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl font-normal text-primary-700">
                      時段：
                    </p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">
                        {privateOrders.length > 0
                          ? privateOrders[privateOrders.length - 1].selectedSlot
                          : "Loading..."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-6 space-y-3">
                <button
                  className="flex min-w-60 justify-center rounded-3xl border border-secondary-300 bg-secondary-400 px-2 py-2 text-white"
                  // onClick={handleComfirmtOrderClick}
                >
                  <p className="text-xl">修改預約資料</p>
                </button>
              </div>
            </div>
          </div>

          {/* Order Detail */}
          <div className="flex h-full max-w-[40%] flex-col border p-2">
            <h3 className="border-b-4 border-b-secondary-200 p-4 py-6 text-start text-xl text-secondary-500">
              訂單金額
            </h3>

            <div className="flex flex-grow flex-col px-2">
              <div className="flex justify-between mt-4">
                <p className="text-base font-normal">大人</p>

                <p className="text-base font-normal">
                  {privateOrders.length > 0
                    ? privateOrders[privateOrders.length - 1].tourguideInfo
                        .price_adult
                    : "Loading..."}
                  €/小時
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-base font-normal">小孩</p>

                <p className="text-base font-normal">
                  {privateOrders.length > 0
                    ? privateOrders[privateOrders.length - 1].tourguideInfo
                        .price_child
                    : "Loading..."}
                  €/小時
                </p>
              </div>

              <div className="flex justify-between text-base font-normal">
                <p className="text-base font-normal">
                  服務時間：
                  </p>

                  <p>
                  {privateOrders.length > 0
                    ? (() => {
                        const latestOrder =
                          privateOrders[privateOrders.length - 1];

                        // 取得時段範圍，例如 "09:00-11:00"
                        const [start, end] =
                          latestOrder.selectedSlot.split("-");

                        // 解析小時數
                        const startHour = parseInt(start.split(":")[0], 10);
                        const endHour = parseInt(end.split(":")[0], 10);
                        const duration = endHour - startHour; // 計算時長（小時）

                        return `${duration} 小時`;
                      })()
                    : "Loading..."}
                </p>
              </div>

   
            </div>

            {/* subtotal */}
            <div className="mt-auto px-2 py-8">
              <div className="flex justify-between">
                <h4 className="text-2xl font-black text-primary-700">小計</h4>
                {/* <p className="text-3xl font-black text-primary-700">
                    
                  {privateOrders.length > 0 ? (privateOrders[privateOrders.length-1].adultCount) *( privateOrders[privateOrders.length-1].tourguideInfo.price_adult) + 
                  
                  (privateOrders[privateOrders.length-1].childCount) *( privateOrders[privateOrders.length-1].tourguideInfo.price_child)
                  
                  
                  : "Loading..."}
                    
                     €</p> */}

                <p className="text-2xl font-black text-primary-700">
                  {privateOrders.length > 0
                    ? (() => {
                        const latestOrder =
                          privateOrders[privateOrders.length - 1];

                        // 取得時段範圍，例如 "09:00-11:00"
                        const [start, end] =
                          latestOrder.selectedSlot.split("-");

                        // 解析小時數
                        const startHour = parseInt(start.split(":")[0], 10);
                        const endHour = parseInt(end.split(":")[0], 10);
                        const duration = endHour - startHour; // 計算時長（小時）

                        // 計算價格
                        const totalPrice =
                          latestOrder.adultCount *
                            latestOrder.tourguideInfo.price_adult *
                            duration +
                          latestOrder.childCount *
                            latestOrder.tourguideInfo.price_child *
                            duration;

                        return `${totalPrice} €`;
                      })()
                    : "Loading..."}
                </p>
              </div>
              {/* buttons */}
            </div>
            <div className="flex flex-col">
              <div className="my-20 items-center justify-center space-y-4 p-4">
                <button
                  className="m-auto flex min-w-60 justify-center rounded-3xl border border-secondary-300 bg-secondary-400 px-2 py-2 text-white"
                  onClick={() => handleConfirmOrderClick(id)}
                >
                  <p className="text-lg">確認訂單</p>
                </button>

                <button
                  className="m-auto flex min-w-60 justify-center rounded-3xl border border-secondary-600 bg-transparent px-2 py-2 text-secondary-600"
                  onClick={() => handleGoBackClick(id)}
                >
                  <p className="text-lg">回上一頁</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderInfoPage;
