import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder } from "../store/reducers/orderSlice";

import { addPrivateOrder } from "../store/reducers/orderSlice.jsx";

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

  const handleClearCartClick = (id) => {
    dispatch(resetOrder());
    navigate(`/search-tourguides/tourguide-profile/${id}`);
  };

  const checkOrderInfo = () => {
    console.log(privateOrders);
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

        <div className="m-auto w-2/3 px-8 py-4">
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
        </div>

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
                  <p className="text-xl">修改訂單</p>
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
                {/* <button
                  className="m-auto flex min-w-60 justify-center rounded-3xl border border-secondary-300 bg-secondary-400 px-2 py-2 text-white"
                  onClick={() => handleConfirmOrderClick(id)}
                >
                  <p className="text-lg">確認訂單</p>
                </button> */}

                {/* <Button
                  onClick={handleOpen}
                  className="m-auto flex min-w-60 justify-center rounded-3xl border border-secondary-300 bg-secondary-400 px-2 py-2 text-lg text-white"
                >
                  確認訂單
                </Button> */}

                {/* {open && (
                  <div className=" flex items-center justify-center">
                    <Dialog open={open} handler={handleOpen} className=" px-2">
                      <DialogHeader>訂單資訊</DialogHeader>
                      <DialogBody className="text-lg">請前往付款</DialogBody>
                      <DialogFooter>
                        <Button
                          variant="text"
                          color="red"
                          onClick={handleOpen}
                          className="btn btn-outline m-1"
                        >
                          <span>取消訂單</span>
                        </Button>
                        <Button
                          className="btn bg-primary-700 text-primary-700 text-white"
                          onClick={() => handleConfirmOrderClick(id)}
                        >
                          <span>我知道了</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                  </div>
                )} */}

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="m-auto flex min-w-60 justify-center rounded-3xl border border-secondary-300 bg-secondary-400 px-2 py-2 text-white text-lg"
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
                    <h3 className="text-lg font-bold">下一步： 訂單付款</h3>
                    <p className="py-4 text-lg font-normal"></p>
                    <div className="modal-action">
                      <form method="dialog" className="flex gap-4">
                        <Button
                          onClick={() => handleClearCartClick(id)}
                          className="btn btn-outline text-secondary-600"
                        >
                          <span>取消訂單</span>
                        </Button>
                        <Button
                          className="btn bg-primary-700 text-primary-700 text-white"
                          onClick={() => handleConfirmOrderClick(id)}
                        >
                          <span>前往付款</span>
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
      </div>
    </>
  );
}

export default OrderInfoPage;
