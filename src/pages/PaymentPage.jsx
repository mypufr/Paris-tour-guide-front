import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import data from "../data/data.json";

function PaymentPage() {
  const navigate = useNavigate();
  // const handleGoBackClick = (id) => {
  //   navigate(`/search-tourguides/tourguide-profile/${id}`);
  // };

  const handleConfirmOrderClick = (id) => {
    navigate(
      `/search-tourguides/tourguide-profile/${id}/private-trips/payment-success`,
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
      <div className="py-10 text-3xl font-bold text-black">
        {/* subNavbar */}
        <div className="m-auto my-10 flex max-w-[80%] justify-center space-x-6 py-10">
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-2 py-2">
            <p className="text-xl text-secondary-500">1. 預約項目</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 px-2 py-2">
            <p className="text-xl text-secondary-500">2. 確認訂單</p>
          </button>
          <button className="max-w-60 rounded-2xl border border-secondary-300 bg-secondary-300 px-2 py-2">
            <p className="text-xl text-white">3. 付款資料</p>
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
            付款資訊
          </h2>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        <div className="m-auto my-10 flex max-w-[90%] justify-center space-x-8 py-10">
          <div className="flex flex-col space-y-6">
            {/* left: Order info */}
            {/* 1st order */}
            <div className="border border-secondary-200 bg-background-2 p-4">
              <div className="flex max-w-full flex-col">
                <h3 className="border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-2xl text-secondary-500">
                  私人行程訂單
                </h3>

                <div className="flex flex-col items-center">
                  <div className="flex space-y-8 px-8 py-6">
                    <div className="flex items-center justify-center space-x-4">
                      <img
                        src={CardData.img}
                        alt=""
                        className="inline-block h-20 max-w-20 rounded-full"
                      />
                      <p className="text-2xl text-secondary-700">
                        {CardData.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start space-y-2">
                    <p className="text-lg text-grey-950">
                      2024年10月19日10:00-17:00
                    </p>
                    <p className="ext-grey-950 text-lg">4位成人, 4位兒童</p>
                  </div>
                </div>
              </div>
              <p className="text-end text-2xl text-primary-700">700 €</p>
            </div>

            {/* 2nd order */}

            <div className="border border-secondary-200 bg-background-2 p-4">
              <div className="flex max-w-full flex-col">
                <h3 className="border-b-4 border-b-secondary-200 py-6 pl-4 text-start text-2xl text-secondary-500">
                  定點行程訂單
                </h3>

                <div className="flex flex-col items-center">
                  <div className="flex space-y-8 px-8 py-6">
                    <div className="flex items-center justify-center space-x-4">
                      <img
                        src="https://images.unsplash.com/photo-1460794418188-1bb7dba2720d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                        alt=""
                        className="inline-block h-20 max-w-20 rounded-full"
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
                      2024年10月20日13:00-16:00
                    </p>
                    <p className="ext-grey-950 text-lg">4位成人, 0位兒童</p>
                  </div>
                </div>
              </div>
              <p className="text-end text-2xl text-primary-700">180 €</p>
            </div>

            <div className="flex justify-between py-6">
              <h4 className="text-3xl font-black text-primary-700">總計</h4>
              <p className="text-3xl font-black text-primary-700">880 €</p>
            </div>
            <div className="my-20 items-center space-y-4">
              <button
                className="flex min-w-60 m-auto justify-center space-x-20 rounded-3xl border border-secondary-600 bg-transparent px-4 py-4 text-secondary-600"
                // onClick={()=>handleGoBackClick(id)}
              >
                <p className="text-xl">回上一頁</p>
              </button>
            </div>
          </div>

          {/* right: Payment  */}
          <div className="flex min-w-[46%] flex-col border p-10">
            <div className="space-y-4">
              {/* Full Name */}
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="full-name"
                  className="text-xl font-medium text-gray-700"
                >
                  訂購人姓名
                </label>
                <input
                  type="text"
                  id="full-name"
                  placeholder="請輸入您的姓名"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-xl"
                />
              </div>

              {/* Credit Card Number */}
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="credit-card"
                  className="text-xl font-medium text-gray-700"
                >
                  信用卡帳號
                </label>
                <input
                  type="text"
                  id="credit-card"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-xl"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="phone"
                  className="text-xl font-medium text-gray-700"
                >
                  電話
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="請輸入您的電話號碼"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-xl"
                />
              </div>

              {/* Expiration Date */}
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="expiry-date"
                  className="text-xl font-medium text-gray-700"
                >
                  有效日期
                </label>
                <input
                  type="text"
                  id="expiry-date"
                  placeholder="MM/YY"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-xl"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="email"
                  className="text-xl font-medium text-gray-700"
                >
                  電子郵件信箱
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="請輸入您的電子郵件信箱"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-xl"
                />
              </div>

              {/* Security Code */}
              <div className="flex flex-col space-y-4">
                <label
                  htmlFor="security-code"
                  className="text-xl font-medium text-gray-700"
                >
                  安全碼
                </label>
                <input
                  type="text"
                  id="security-code"
                  placeholder="CVV"
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-xl"
                />
              </div>
            </div>

            <div className="m-auto">
              <div className="my-20">
                <button
                  className="flex min-w-60 justify-center space-x-20 rounded-3xl bg-primary-700 px-2 py-2 text-white"
                  onClick={()=>handleConfirmOrderClick(id)}
                >
                  <p className="text-xl">送出資料</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
