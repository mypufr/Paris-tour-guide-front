import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder } from "../store/reducers/orderSlice";

import { addPrivateOrder } from "../store/reducers/orderSlice.jsx";
import {
  getPrivateOrdersTotalPrice, //所有私人行程小計
  getPrivateOrderPrice, //單筆私人行程價格
} from "../utils/calculatePrice";

import {
  Stepper,
  Step,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import data from "../data/data.json";

function OrderInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const { user, setUser } = useContext(UserContext);
  const privateOrders = useSelector((state) => state.order.privateOrders || []);

  const [isPrivateOrderOpen, setPrivateOrderOpen] = useState(false);

  // 計算所有私人訂單的小計（數字）
  const subtotalPrivateOrders = privateOrders.reduce((acc, order) => {
    return acc + getPrivateOrdersTotalPrice(order);
  }, 0);

  const handleClearCartClick = (id) => {
    dispatch(resetOrder());
    navigate(`/search-tourguides/tourguide-profile/${id}`);
  };

  const checkOrderInfo = () => {
    console.log(privateOrders);
  };

  const backToTourguideProfilePage = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}`);
  };

  const handleConfirmOrderClick = (id) => {
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

        {/* <div className="m-auto w-2/3 px-8 py-4 my-4">
          <CardHeader
            floated={false}
            variant="gradient"
            color="gray"
            className="m-0 grid h-24 place-items-center text-primary-500"
          >
            <div className="w-full px-20 pb-8 pt-4">
              <Stepper
                activeStep={activeStep}
                className="w-full"
                lineClassName="bg-secondary-200 h-1" // 改為明顯的灰色線
                activeLineClassName="bg-blue-500 h-1" // 當前步驟的線為藍色
              >
                <Step
                  className="h-4 w-4 cursor-pointer bg-secondary-300 text-white"
                  activeClassName="ring-2  bg-primary-500 text-white"
                  completedClassName="bg-primary-500 text-white"
                  onClick={() => setActiveStep(0)}
                >
                  <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                    <Typography
                      variant="h6"
                      color="inherit"
                      className="text-secondary-500"
                    >
                      預約資訊
                    </Typography>
                  </div>
                </Step>
                <Step
                  className="h-4 w-4 cursor-pointer bg-secondary-300 text-white"
                  activeClassName="ring-2  bg-primary-500 text-white"
                  completedClassName=" bg-primary-500 text-white"
                  onClick={() => setActiveStep(1)}
                >
                  <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                    <Typography
                      variant="h6"
                      color="inherit"
                      className="text-secondary-500"
                    >
                      預約付款
                    </Typography>
                  </div>
                </Step>
                <Step
                  className="h-4 w-4 cursor-pointer bg-secondary-300 text-white"
                  activeClassName="ring-2  bg-primary-500 text-white"
                  completedClassName=" bg-primary-500 text-white"
                  onClick={() => setActiveStep(2)}
                >
                  <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                    <Typography
                      variant="h6"
                      color="inherit"
                      className="text-secondary-500"
                    >
                      完成預約
                    </Typography>
                  </div>
                </Step>
              </Stepper>
            </div>
          </CardHeader>
        </div> */}

        {/* title */}
        <div className="m-2 flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />

          <button onClick={checkOrderInfo}>
            {" "}
            <p className="text-3xl text-primary-700">
              {user.username}的訂單明細
            </p>
          </button>
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        <div className="m-auto max-w-[65%]">
          <div className="grid grid-cols-3 space-x-6 py-5">
            <div className="col-span-2">
              <div className="border-spacing-3 border">
                {/* Selected Tourguide  */}
                <div className="m-auto flex w-full flex-col justify-center space-y-8 py-6">
                  <h3 className="border-b-4 border-b-secondary-200 p-4 text-start text-xl text-secondary-500">
                    最新訂單
                  </h3>

                  <div className="space-y-4 bg-background-2 py-4">
                    <div className="flex items-center justify-center space-x-4">
                      <img
                        src={
                          privateOrders.length > 0
                            ? privateOrders[privateOrders.length - 1]
                                .tourguideInfo.imgUrl
                            : "Loading..."
                        }
                        alt=""
                        className="inline-block h-20 w-20 rounded-full"
                      />
                      <p className="text-xl text-secondary-700">
                        {privateOrders.length > 0
                          ? privateOrders[privateOrders.length - 1]
                              .tourguideInfo.name
                          : "Loading..."}
                      </p>
                    </div>
                    <p className="text-base font-normal text-primary-800">
                      專長：
                      {privateOrders.length > 0
                        ? privateOrders[
                            privateOrders.length - 1
                          ].tourguideInfo.themes.map((theme, index, arr) => (
                            <span
                              key={index}
                              className="text-base font-normal text-secondary-700"
                            >
                              {theme}
                              {index !== arr.length - 1 ? "、" : ""}
                            </span>
                          ))
                        : "Loading..."}{" "}
                    </p>
                  </div>
                </div>
                {/* Options */}
                <div className="m-auto flex border-spacing-4 flex-col items-center pt-6">
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
                              ? privateOrders[privateOrders.length - 1]
                                  .selectedDate
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
                              ? privateOrders[privateOrders.length - 1]
                                  .adultCount
                              : "Loading..."}
                            位大人、
                            {privateOrders.length > 0
                              ? privateOrders[privateOrders.length - 1]
                                  .childCount
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
                              ? privateOrders[privateOrders.length - 1]
                                  .selectedSlot
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
                      <p className="text-xl">修改訂單</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Price */}
            <div className="col-span-1 flex h-full flex-col border p-2">
              <h3 className="border-b-4 border-b-secondary-200 p-4 py-6 text-start text-xl text-secondary-500">
                最新訂單金額
              </h3>

              <div className="flex flex-grow flex-col px-2">
                <div className="mt-4 flex justify-between">
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
                  <p className="text-base font-normal">服務時間：</p>

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
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="m-auto flex min-w-60 justify-center rounded-3xl border border-secondary-300 bg-secondary-400 px-2 py-2 text-lg text-white"
                    onClick={() =>
                      document.getElementById("confirmOrder_modal").showModal()
                    }
                  >
                    確認訂單
                  </button>
                  <dialog
                    id="confirmOrder_modal"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box space-y-2">
                      <h3 className="text-lg font-bold">已完成所有預約?</h3>
                      <p className="py-4 text-lg font-normal"></p>
                      <div className="modal-action">
                        <form method="dialog" className="flex gap-4">
                          <Button
                            className="btn bg-primary-700 text-primary-700 text-white"
                            onClick={() => handleConfirmOrderClick(id)}
                          >
                            <span>是，前往付款</span>
                          </Button>
                          <Button
                            onClick={() => backToTourguideProfilePage(id)}
                            className="btn btn-outline text-secondary-600"
                          >
                            <span>預約其他行程</span>
                          </Button>
                        </form>
                      </div>
                    </div>
                  </dialog>

                  <button
                    className="m-auto flex min-w-60 justify-center rounded-3xl border border-secondary-600 bg-transparent px-2 py-2 text-secondary-600"
                    onClick={() => handleClearCartClick(id)}
                  >
                    <p className="text-lg">取消訂單</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="m-auto">
            {/* 所有訂單 */}
            <div className="flex flex-col">
              {/* 1st order */}
              <div className="bg-primary-50 p-4">
                <div className="flex max-w-full flex-col">
                  <h3 className="py-2 text-start text-lg text-secondary-500">
                    所有訂單
                  </h3>
                  {/* 按鈕 - 開啟私人體驗行程訂單 Modal */}

                  <div className="mt-4 flex flex-col space-y-6">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-normal">私人行程訂單</p>

                        <p className="flex gap-4 text-end text-xl text-primary-700">
                          總計
                          <span>{subtotalPrivateOrders} €</span>
                        </p>
                      </div>
                      <button
                        className="m-auto rounded-lg bg-primary-600 px-4 py-2 text-base font-normal text-white"
                        onClick={() => setPrivateOrderOpen(true)}
                      >
                        查看所有訂單
                      </button>

                      {/* 私人行程訂單 Modal */}
                      {isPrivateOrderOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                          <div className="w-4/5 max-w-2xl rounded-lg bg-white p-6">
                            <h3 className="flex justify-between border-b-4 border-secondary-200 text-2xl text-secondary-500">
                              私人行程訂單
                              <span className="pt-4 text-2xl text-primary-700">
                                {" "}
                                小計:
                                {subtotalPrivateOrders} €
                              </span>
                            </h3>
                            {/* 如果沒有訂單，顯示「無私人行程訂單」 */}
                            {privateOrders.length === 0 ? (
                              <p className="text-grey-700 py-6 text-center text-xl">
                                無私人行程訂單
                              </p>
                            ) : (
                              <div className="flex justify-center gap-4 p-4">
                                {/* 🔹 使用 .map() 來遍歷所有訂單 */}
                                {privateOrders.map((order, index) => (
                                  <div
                                    key={index}
                                    className="border-1 flex flex-col items-center border border-b border-gray-300 pb-4"
                                  >
                                    {/* 訂單內容 */}
                                    <div className="flex space-y-8 px-8 py-6">
                                      <div className="flex items-center space-x-4">
                                        <img
                                          src={
                                            order.tourguideInfo.imgUrl ||
                                            "https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                                          }
                                          alt="導遊"
                                          className="inline-block h-20 w-20 rounded-full"
                                        />
                                        <p className="text-xl text-secondary-700">
                                          {order.tourguideInfo.name ||
                                            "未知導遊"}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex flex-col items-start space-y-2">
                                      <p className="text-base font-normal text-grey-950">
                                        日期：
                                        {order.selectedDate || "未選擇日期"}
                                      </p>
                                      <p className="text-base font-normal text-grey-950">
                                        時段：
                                        {order.selectedSlot || "未選擇時段"}
                                      </p>
                                      <p className="text-base font-normal text-grey-950">
                                        人數: {order.adultCount || 0} 位大人、
                                        {order.childCount || 0} 位小孩
                                      </p>
                                      <p className="text-base font-normal text-grey-950">
                                        主題：
                                        {order.selectedTheme || "未選擇主題 "}
                                      </p>
                                    </div>

                                    <p className="ml-auto mr-4 pt-4 text-xl text-primary-700">
                                      {" "}
                                      {getPrivateOrderPrice(order)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* 關閉按鈕 */}
                            <div className="flex justify-end gap-4 pt-6">
                              <button
                                className="btn btn-outline rounded-lg px-4 py-2 text-base text-red-500"
                                onClick={() => handleClearCartClick(id)}
                              >
                                取消所有訂單
                              </button>
                              <button
                                className="rounded-lg bg-red-500 px-4 py-2 text-base text-white"
                                onClick={() => setPrivateOrderOpen(false)}
                              >
                                關閉
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderInfoPage;
