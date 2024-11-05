import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import data from "../data/data.json";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const handleGoBackClick = (id) => {
    navigate("/");
  };

  // const handleConfirmOrderClick = (id) => {
  //   navigate(
  //     `/search-tourguides/tourguide-profile/${id}/private-trips/payment`,
  //   );
  // };
  const { id } = useParams();
  const CardData = data.find((item) => item.id === parseInt(id));
  console.log(CardData);

  if (!CardData) {
    return <div>Results not found</div>;
  }
  return (
    <>
      <div className="py-10 text-center text-3xl font-bold text-black">
        {/* title */}
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            預約成功 !
          </h2>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        {/* subNavbar */}
        <div className="m-auto my-10 flex max-w-[75%] justify-center space-x-6 py-10">
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-2 py-2">
            <p className="text-xl text-secondary-500">1. 預約項目</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-2 py-2">
            <p className="text-xl text-secondary-500">2. 確認訂單</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-2 py-2">
            <p className="text-xl text-secondary-500">3. 付款資料</p>
          </button>
          <button className="max-w-60 rounded-2xl bg-secondary-300 px-2 py-2">
            <p className="text-xl text-white">4. 完成預約</p>
          </button>
        </div>

        {/* title */}
        <div className="my-10">
          <p className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
            恭喜您已完成預約，以下是您的預約資料 :
          </p>
        </div>

        <div className="m-auto flex flex-col max-w-[55%] ">
          <div className=" justify-center space-x-6">
            <div className="">
              <h3 className="mb-10 border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-3xl text-secondary-500">
                私人行程訂單
              </h3>
              <div className="bg-primary-600 p-4 text-xl text-white">
                <p>訂單編號 : MYP-PR-84023455</p>
              </div>

              <div className="flex max-w-full border-spacing-3 border">
                {/* Selected Tourguide  */}

                <div className="min-w-[30%] flex flex-col justify-center border border-background-2 bg-background-2 px-8 py-6">
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={CardData.img}
                      alt=""
                      className="inline-block h-20 max-w-20 rounded-full"
                    />
                    <p className="text-xl text-secondary-700">
                      {CardData.name}導遊
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="m-auto flex  flex-col items-center">
                  <div className="flex flex-col space-y-6 p-10">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-xl text-primary-700">預定日期：</p>
                        <div className="relative max-w-sm">
                          <p className="text-lg">2024年10月19日</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-xl text-primary-700">預定人數：</p>
                        <div className="relative max-w-sm">
                          <p className="text-lg">4位成人 4位兒童</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-xl text-primary-700">行程主題：</p>
                        <div className="relative max-w-sm">
                          <p className="text-lg">博物館導覽</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p className="text-xl text-primary-700">服務時段：</p>
                        <div className="relative max-w-sm">
                          <p className="text-lg">10:00 - 17:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full justify-center space-x-6">
            <div className="">
              <h3 className="mb-10 border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-3xl text-secondary-500">
                定點行程訂單
              </h3>
              <div className="bg-primary-600 p-4 text-xl text-white">
                <p>訂單編號 : MYP-PR-84023455</p>
              </div>

              <div className="flex max-w-full border-spacing-3 border">
                {/* Selected Tourguide  */}

                <div className="min-w-[30%] flex flex-col justify-center border border-background-2 bg-background-2 px-8 py-6">
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

                {/* Options */}
                <div className="m-auto flex  flex-col items-center ">
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
          </div>
        </div>

        <div className="my-20 space-y-4 flex flex-col items-center justify-center">
          <button
            className="flex min-w-60 justify-center space-x-20 rounded-3xl  bg-primary-500 px-2 py-2 text-white"
            // onClick={handleComfirmtOrderClick}
          >
            <p className="text-xl">前往會員個人信箱</p>
          </button>

          <button
            className="flex min-w-60 justify-center space-x-20 rounded-3xl border border-primary-700 bg-transparent px-2 py-2 text-primary-500"
            onClick={handleGoBackClick}
          >
            <p className="text-xl">回首頁</p>
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccessPage;
