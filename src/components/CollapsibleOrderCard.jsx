import React, { useState } from "react";
import { Link } from "react-router-dom";

const CollapsibleOrderCard = ({ order, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDetails = () => setIsOpen(!isOpen);

  return (
    <div className="mb-6 border rounded-lg overflow-hidden shadow-sm">
      {/* 卡片標題區域，顯示訂單編號 */}
      <div className="bg-primary-100 p-4 text-xl text-primary-700 flex justify-between items-center">
        <p>第{index + 1}筆</p>
        <p>訂單編號: {order.privateOrderNumber}</p>
        <button
          onClick={toggleDetails}
          className="text-sm text-primary-700 underline focus:outline-none"
        >
          {isOpen ? "收合詳情" : "展開詳情"}
        </button>
      </div>
      
      {/* 詳細內容區域，只有展開時才顯示 */}
      {isOpen && (
        <div className="flex flex-col md:flex-row border-t border-gray-200">
          {/* 導遊資料區 */}
          <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-200 bg-gray-100 p-6 md:w-1/3">
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
        
        
        <div className="flex  justify-around items-center  md:w-2/3">
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

          <div className="flex flex-col items-center  gap-2">

  
            <img
          src="/images/step-2-1.png"
          alt=""
          className="inline-block h-20 w-20"
        />
            <p className="text-gray-700 text-sm">對行程有疑問?</p>


            <Link>
            <button className="btn bg-secondary-200 text-secondary-700" >留言給導遊</button>
            
            </Link>
          </div>


        </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleOrderCard;
