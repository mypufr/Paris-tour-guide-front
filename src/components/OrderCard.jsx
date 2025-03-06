import React, { useState } from "react";

const OrderCard = ({ order, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDetails = () => setIsOpen(!isOpen);

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-background-2 shadow-sm">
      {/* 卡片標題區域，顯示訂單編號 */}
      <div className="flex items-center justify-between bg-secondary-200 p-4 text-lg font-normal text-secondary-700">
        <p>第 {index + 1} 筆</p>
        <button
          onClick={toggleDetails}
          className="text-sm text-secondary-700 underline focus:outline-none"
        >
          {isOpen ? "收合詳情" : "展開詳情"}
        </button>
      </div>

      {/* 詳細內容區域，只有展開時才顯示 */}
      {isOpen && (
        <div className="flex flex-col border-t border-background-2 md:flex-row">
          {/* 導遊資料區 */}
          <div className="flex flex-col items-center justify-center border-b border-background-2 bg-background-2 p-6 md:w-1/3 md:border-b-0 md:border-r">
            <img
              src={order.tourguideInfo.imgUrl || "Loading..."}
              alt="導遊"
              className="inline-block h-20 w-20 rounded-full"
            />
            <p className="mt-4 text-xl text-secondary-700">
              {order.tourguideInfo.name || "未知導遊"} 導遊
            </p>
          </div>
          {/* 訂單詳情區 */}
          <div className="flex flex-col items-center justify-center p-6 md:w-2/3">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <p className="text-xl text-primary-700">預定日期：</p>
                <p className="ml-2 text-lg">
                  {order.selectedDate
                    ? new Date(order.selectedDate).toLocaleDateString("zh-TW", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "未選擇日期"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-xl text-primary-700">預定人數：</p>
                <p className="ml-2 text-lg">
                  {order.adultCount} 位大人, {order.childCount} 位小孩
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-xl text-primary-700">行程主題：</p>
                <p className="ml-2 text-lg">
                  {order.selectedTheme || "未選擇主題"}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-xl text-primary-700">服務時段：</p>
                <p className="ml-2 text-lg">
                  {order.selectedSlot || "未選擇時段"}
                </p>
              </div>
            </div>
          </div>

    
        </div>
      )}
    </div>
  );
};

export default OrderCard;
