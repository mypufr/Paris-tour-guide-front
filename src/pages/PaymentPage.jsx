import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UserContext } from "../../context/userContext";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import {
  addPrivateOrder,
  setPrivateOrdersInfo,
  setGroupOrdersInfo,
} from "../store/reducers/orderSlice.jsx";

import { selectTotalPrice, resetOrder } from "../store/reducers/orderSlice.jsx";
import {
  getPrivateOrdersTotalPrice, //所有私人行程小計
  getPrivateOrderPrice, //單筆私人行程價格
} from "../utils/calculatePrice";

import data from "../data/data.json";

import { HiCreditCard } from "react-icons/hi";
import { IoIosCheckmarkCircle } from "react-icons/io";

function PaymentPage() {
  const { id } = useParams();

  const [modalMessage, setModalMessage] = useState("請稍候…");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  // const CardData = data.find((item) => item.id === parseInt(id));
  // console.log(CardData);

  // if (!CardData) {
  //   return <div>Results not found</div>;
  // }

  const { user, setUser } = useContext(UserContext);

  const privateOrders = useSelector((state) => state.order.privateOrders || []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const handleGoBackClick = (id) => {
  //   navigate(`/search-tourguides/tourguide-profile/${id}`);
  // };

  const checkOrderInfo = () => {
    console.log(privateOrders);
  };

  const handleConfirmPayment = async (userName = user.username) => {
    // 開啟 modal
    document.getElementById("payment_modal").showModal();
    // 顯示等待訊息
    setModalMessage("請稍候，處理中...");

    try {
      const res = await axios.post(
        `http://localhost:8000/api/${user.username}/private-orders`,
        {
          privateOrders: privateOrders,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("訂單資料送出成功", res.data);
      // 模擬等待 3 秒後，改為交易成功
      setTimeout(() => {
        setModalMessage("交易成功，謝謝您的預約!");
        setPaymentStatus("success");
        navigate(
          `/search-tourguides/tourguide-profile/${id}/private-trips/payment-success`,
        );
      }, 3000);
    } catch (error) {
      console.error("訂單資料送出失敗", error.response?.data || error.message);
    }
  };

  const handleConfirmOrderClick = async (userName = user.username) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/${user.username}/private-orders`,
        {
          privateOrders: privateOrders,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("訂單資料送出成功", res.data);

      // **發送事件通知 Header 更新**
    window.dispatchEvent(new Event("orderUpdated"));

      navigate(
        `/search-tourguides/tourguide-profile/${id}/private-trips/payment-success`,
      );
    } catch (error) {
      console.error("訂單資料送出失敗", error.response?.data || error.message);
    }
  };

  const [isPrivateOrderOpen, setPrivateOrderOpen] = useState(false);
  const [isGroupOrderOpen, setGroupOrderOpen] = useState(false);

  const totalPrice = useSelector(selectTotalPrice);

  // 計算所有私人訂單的小計（數字）
  const subtotalPrivateOrders = privateOrders.reduce((acc, order) => {
    return acc + getPrivateOrdersTotalPrice(order);
  }, 0);

  const handleClearCartClick = (id) => {
    dispatch(resetOrder());
    navigate(`/search-tourguides/tourguide-profile/${id}`);
  };

  useEffect(() => {
    if (user) {
      localStorage.getItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      <div className="py-10 text-3xl font-bold text-black">
        {/* subNavbar */}

        <div className="m-auto my-10 flex max-w-[80%] justify-center gap-20 py-10">
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-10 py-2">
            <p className="text-xl text-secondary-500">Step 1 : 確認訂單</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 bg-secondary-300 px-10 py-2">
            <p className="text-xl text-white">Step 2 : 付款資料</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-10 py-2">
            <p className="text-xl text-secondary-500">Step 3 : 完成預約</p>
          </button>
        </div>

        {/* title */}
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            {" "}
            <button onClick={checkOrderInfo}> {user.username}的付款資訊</button>
          </h2>
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        <div className="m-auto my-10 flex max-w-[90%] justify-center space-x-8 py-10">
          {/* left: Payment  */}

          <div className="flex min-w-[46%] flex-col border p-10">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  className="checkbox"
                />

                <p className="text-base font-normal text-gray-500">
                  {" "}
                  我已詳讀應同意使用者條款
                </p>
              </div>

              <label className="input input-bordered flex items-center gap-2">
                訂購人姓名
                <input
                  type="text"
                  className="grow"
                  placeholder={user.username}
                  required
                />
                <span className="text-secondary-400">必填</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                電子郵件信箱
                <input
                  type="email"
                  className="grow"
                  placeholder="請輸入您的電子郵件信箱"
                  required
                />
                <span className="text-secondary-400">必填</span>
              </label>

              <label className="input input-bordered flex items-center gap-2">
                電話
                <input
                  type="tel"
                  className="grow"
                  placeholder="請輸入您的電話"
                  required
                />
                <span className="text-secondary-400">必填</span>
              </label>

              <div className="flex flex-col gap-4 rounded-lg border bg-primary-100 px-3 py-2">
                <div className="flex justify-between px-2 py-6">
                  <HiCreditCard />
                  <h4 className="text-xl font-black text-primary-700">
                    {" "}
                    刷卡金額
                  </h4>
                  <p className="text-xl font-black text-primary-700">
                    {subtotalPrivateOrders} €
                  </p>
                </div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">信用卡帳號</span>
                    <span className="label-text-alt text-primary-600">
                      必填
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                    required
                    className="input input-bordered w-full grow"
                  />
                  <div className="label"></div>
                </label>

                <div className="flex justify-between gap-4">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">信用卡到期年月</span>
                      <span className="label-text-alt text-primary-600">
                        必填
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input input-bordered w-full max-w-xs"
                    />
                    <div className="label"></div>
                  </label>

                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">CVC碼</span>
                      <span className="label-text-alt text-primary-600">
                        必填
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="ex: 123"
                      className="input input-bordered w-full max-w-xs"
                    />
                    <div className="label"></div>
                  </label>
                </div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">信用卡署名</span>
                    <span className="label-text-alt text-primary-600">
                      必填
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="請輸入持有人姓名"
                    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                    required
                    className="input input-bordered w-full grow"
                  />
                  <div className="label"></div>
                </label>
              </div>
            </div>

            <div className="m-auto">
              <div className="my-10">
                {/* <button
                  className="flex min-w-60 justify-center space-x-20 rounded-3xl bg-primary-700 px-2 py-2 text-white"
                  onClick={() => handleConfirmOrderClick(id)}
                >
                  <p className="text-xl">確認刷卡</p>
                </button> */}

                {/* <Button
                  onClick={handleOpen}
                  className="flex min-w-40 justify-center rounded-3xl bg-primary-700 px-2 py-2 text-sm text-white"
                >
                  確認刷卡
                </Button>
                <Dialog open={open} handler={handleOpen} className="w-1/3 px-2">
                  <DialogHeader className=""></DialogHeader>
                  <DialogBody className="text-xl">交易成功，謝謝您的預約!</DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={handleOpen}
                      className="btn btn-outline m-1"
                    >
                      <span>預約其他行程</span>
                    </Button>
                    <Button
       
                      className="btn bg-primary-700 text-primary-700 text-white"
                      onClick={() => handleConfirmOrderClick(id)}
                    >
                      <span>查看訂單紀錄</span>
                    </Button>
                  </DialogFooter>
                </Dialog> */}

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button
                  className="flex min-w-40 justify-center rounded-3xl bg-primary-700 px-2 py-2 text-lg text-white"
                  onClick={() =>
                    document.getElementById("payment_modal").showModal()
                  }
                >
                  確定付款
                </button>
                <dialog
                  id="payment_modal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box space-y-2">
                    <h3 className="text-lg font-bold">交易成功，謝謝您的預約!</h3>
                    <p className="py-4 text-lg font-normal"></p>
                    <div className="modal-action">
                      <form method="dialog" className="flex gap-4">
            
                        <Button
                          className="btn bg-primary-700 text-primary-700 text-white"
                          onClick={() => handleConfirmOrderClick(id)}
                        >
                          <span>查看訂單紀錄</span>
                        </Button>
                      </form>
                    </div>
                  </div>
                </dialog> */}

                <button
                  className="flex min-w-40 justify-center rounded-3xl bg-primary-700 px-2 py-2 text-lg text-white"
                  onClick={handleConfirmPayment}
                >
                  確定付款
                </button>

                <dialog
                  id="payment_modal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box space-y-4">
                    <h3 className="text-lg font-bold">{modalMessage}</h3>
                    <div className="modal-action flex gap-4">
                      {paymentStatus === "success" && (
                        <Button
                          className="btn bg-primary-700 text-white"
                          onClick={() =>
                            navigate(
                              `/search-tourguides/tourguide-profile/${id}/private-trips/payment-success`,
                            )
                          }
                        >
                          查看訂單紀錄
                        </Button>
                      )}
                      <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                          document.getElementById("payment_modal").close();
                          // 可選：重置狀態
                          setModalMessage("請稍候…");
                          setPaymentStatus("pending");
                        }}
                        className="btn btn-outline"
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>

          {/* right: Order info */}
          <div className="flex flex-col">
            {/* 1st order */}
            <div className="bg-background-2 p-4">
              <div className="flex max-w-full flex-col">
                <h3 className="py-2 text-start text-lg text-secondary-500">
                  所有訂單
                </h3>
                {/* 按鈕 - 開啟私人體驗行程訂單 Modal */}

                <div className="mt-4 flex flex-col space-y-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-normal">私人行程訂單</p>

                      <p className="text-end text-xl text-primary-700">
                        {subtotalPrivateOrders} €
                      </p>
                    </div>
                    <button
                      className="w-full rounded-lg bg-primary-600 px-4 py-2 text-base font-normal text-white"
                      onClick={() => setPrivateOrderOpen(true)}
                    >
                      查看訂單
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
                            <div className="flex  justify-center gap-4 p-4">
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
                                        {order.tourguideInfo.name || "未知導遊"}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-start space-y-2">
                                    <p className="text-base font-normal text-grey-950">
                                      日期：{order.selectedDate || "未選擇日期"}
                                    </p>
                                    <p className="text-base font-normal text-grey-950">
                                      時段：{order.selectedSlot || "未選擇時段"}
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
                          <div className="flex justify-center pt-6">
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

                  {/* <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-normal">團體行程訂單</p>
                      <p className="text-end text-xl text-primary-700">
                

                      </p>
                    </div>
       
                    <button
                      className="w-full rounded-lg bg-secondary-600 px-4 py-2 text-base font-normal text-white"
                      onClick={() => setGroupOrderOpen(true)}
                    >
                      查看訂單
                    </button>

                    {isGroupOrderOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                        <div className="w-4/5 max-w-2xl rounded-lg bg-white p-6">
                          <h3 className="border-b-4 border-secondary-200 py-4 text-2xl text-secondary-500">
                            定點行程訂單
                          </h3>

                          <div className="flex flex-col items-center">
                            <div className="flex space-y-8 px-8 py-6">
                              <div className="flex items-center space-x-4">
                                <img
                                  src="https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                                  alt=""
                                  className="inline-block h-20 w-20 rounded-full"
                                />
                                <p className="text-2xl text-secondary-700">
                                  Sophie Pinto
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-start space-y-2">
                              <p className="text-xl text-grey-950">
                                龐畢度中心導覽 - 團體行程
                              </p>
                              <p className="text-lg text-grey-950">
                                2024年10月20日 13:00-16:00
                              </p>
                              <p className="text-lg text-grey-950">
                                4位成人, 0位兒童
                              </p>
                            </div>
                          </div>

                    
                          <div className="flex justify-between pt-6">
                            <p className="text-2xl text-primary-700">
                              {totalPrice}
                            </p>
                            <button
                              className="rounded-lg bg-red-500 px-4 py-2 text-white"
                              onClick={() => setGroupOrderOpen(false)}
                            >
                              關閉
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </div>

            <div className="flex justify-between px-2 py-6">
              <h4 className="text-xl font-black text-primary-700">總計</h4>
              <p className="text-xl font-black text-primary-700">
                {subtotalPrivateOrders} €
              </p>
            </div>
            <div className="my-20 items-center space-y-4">
              <button
                className="m-auto flex min-w-60 justify-center space-x-20 rounded-xl border border-secondary-600 bg-transparent px-2 py-2 text-secondary-600"
                onClick={() => handleClearCartClick(id)}
              >
                <p className="text-lg">取消訂單</p>
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-6"></div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
