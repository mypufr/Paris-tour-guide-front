import React from "react";
import { Link } from "react-router-dom";
import { TfiHandPointRight } from "react-icons/tfi";

const Card = ({ id, imgSrc, title, price, themes }) => {
  return (
   
<div className="relative rounded-2xl border border-primary-200 p-4 md:p-6 max-w-sm mx-auto group overflow-hidden z-10">
  {/* <Link to={`/search-tourguides/tourguide-profile/${id}`}> */}
  <Link to={`/search-tourguides/tourguide-profile/${id}#target-section`}>
    {/* 圖片區域 */}
    <div className="relative overflow-hidden rounded-t-xl">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Hover 遮罩 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-lg md:text-xl font-bold text-white">馬上預約</span>
      </div>
    </div>
    {/* 內容區域 */}
    <div className=" bg-white">
      <div className="flex justify-between items-center mb-2">
        <h6 className="text-base md:text-lg font-bold text-gray-700 p-2">{title}</h6>
        {/* 僅在中型以上螢幕顯示價格 */}
        <span className="hidden sm:block text-sm md:text-base font-semibold text-gray-600">
          {price} € / hour
        </span>
      </div>



      
      <div className="flex justify-between gap-1">
        {themes?.map((theme, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs md:text-sm text-gray-600 bg-background-2 rounded-full"
          >
            {theme}
          </span>
        ))}
      </div>



      
    </div>
  </Link>
</div>


  );
};


export default Card;
