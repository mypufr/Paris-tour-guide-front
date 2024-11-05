import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import data from "../data/data.json";

function OrderInfoPage() {
  const navigate = useNavigate();
  const handleGoBackClick = (id) => {
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
  return (
    <>
      <div className="py-10 text-center text-3xl font-bold text-black">
        {/* subNavbar */}
        <div className="m-auto my flex max-w-[75%] justify-center space-x-6 py-10">
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-2 py-2">
            <p className="text-xl text-secondary-500">1. 預約項目</p>
          </button>
          <button className="max-w-60 rounded-2xl bg-secondary-300 px-2 py-2">
            <p className="text-xl text-white">2. 確認訂單</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-2 py-2">
            <p className="text-xl text-secondary-500">3. 付款資料</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-2 py-2">
            <p className="text-xl text-secondary-500">4. 完成預約</p>
          </button>
        </div>

        {/* title */}
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            訂單資訊
          </h2>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        <div className="m-auto  flex max-w-[75%] justify-center space-x-6 py-5">
          <div className="max-w-[30%] border-spacing-3 border">
            {/* Selected Tourguide  */}
            <div className="m-auto flex w-full flex-col items-center justify-center space-y-8 border border-background-2 bg-background-2 px-8 py-6">
              <p className="text-3xl text-secondary-500">您預約的導遊是：</p>

              <div className="flex items-center justify-center space-x-4">
                <img
                  src={CardData.img}
                  alt=""
                  className="inline-block h-20 max-w-20 rounded-full"
                />
                <p className="text-3xl text-secondary-700">{CardData.name}</p>
              </div>
              <p className="text-xl text-primary-800">
                專長：
                {CardData.review}
              </p>
            </div>
            {/* Options */}
            <div className="m-auto flex border-spacing-4 flex-col items-center border border-background-2 pt-6">
              <div className="marker: flex flex-col space-y-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl text-primary-700">預約人：</p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">MYP</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl text-primary-700">預定日期：</p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">2024年10月19日</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl text-primary-700">預定人數：</p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">4位成人 4位兒童</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl text-primary-700">行程主題：</p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">博物館導覽</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className="text-xl text-primary-700">服務時段：</p>
                    <div className="relative max-w-sm">
                      <p className="text-xl">10:00 - 17:00</p>
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
          <div className="flex  min-w-[50%] flex-col border h-full">
            <h3 className="border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-3xl text-primary-950">
              私人行程訂單
            </h3>


            <div className="flex flex-col flex-grow">
              <div>
                {/* Selected Tourguide  */}
                <div className="flex space-y-8 px-8 py-6">
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={CardData.img}
                      alt=""
                      className="inline-block h-20 max-w-20 rounded-full"
                    />
                    <p className="text-3xl text-secondary-700">
                      {CardData.name}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between px-8">
                  <p className="text-xl text-grey-950">2024年10月19日</p>
                  <p className="text-xl">4位成人, 4位兒童</p>
                  <p className="text-xl text-primary-700">700 €</p>
                </div>
              </div>
              </div>

              {/* subtotal */}
              <div className="mt-auto py-8 px-8">
                <div className="flex justify-between">
                  <h4 className="text-3xl font-black text-primary-700">小計</h4>
                  <p className="text-3xl font-black text-primary-700">700 €</p>
                </div>
{/* buttons */}
        </div>
            <div className="flex flex-col">
              <div className="my-20 items-center justify-center space-y-4">
                <button
                  className="m-auto flex min-w-60 justify-center rounded-3xl border border-secondary-300 bg-secondary-400 px-2 py-2 text-white"
                  onClick={() => handleConfirmOrderClick(id)}
                >
                  <p className="text-xl">立刻預約</p>
                </button>

                <button
                  className="m-auto flex min-w-60 justify-center  rounded-3xl border border-secondary-600 bg-transparent px-2 py-2 text-secondary-600"
                  onClick={() => handleGoBackClick(id)}
                >
                  <p className="text-xl">回上一頁</p>
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
