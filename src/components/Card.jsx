import React from "react";
import { Link } from "react-router-dom";
import { TfiHandPointRight } from "react-icons/tfi";

const Card = ({ id, imgSrc, title, price, themes }) => {
  return (
    <div className="relative rounded-2xl border-0 border-primary-200 min-[375px]:p-8 md:max-w-sm group overflow-hidden">
      <Link to={`/search-tourguides/tourguide-profile/${id}`}>
        {/* 圖片區域 + Hover 遮罩 */}
        <div className="relative border-1 rounded-2xl border border-primary-200 overflow-hidden">
          <img
            className="h-[257px] w-full rounded-t-xl object-cover md:max-h-[150px] xl:max-h-[240px] transition-all duration-300 group-hover:scale-110"
            src={imgSrc}
            alt={title}
          />

          {/* Hover 時出現的半透明遮罩 */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <span className="text-xl font-bold text-white">馬上預約</span>
          </div>
        </div>

        {/* 內容區域 */}
        <div className="space-y-1 p-6 bg-white">
          <div className="flex justify-between">
            <h6 className="mb-2 text-base font-bold text-gray-500 2xl:text-xl">
              {title}
            </h6>
            <span className="hidden lg:inline-block lg:text-base lg:font-bold lg:text-gray-600">
              {price} € / 小時
            </span>
          </div>

          <div className="space-x-2 md:flex md:flex-col md:items-start md:justify-center md:space-x-0 md:space-y-1 min-[1440px]:flex-row min-[1440px]:items-center min-[1440px]:justify-start min-[1440px]:space-x-1 min-[1440px]:space-y-0 min-[1920px]:items-start min-[1920px]:justify-start">
            {themes?.map((theme, index) => (
              <span
                key={index}
                className="inline-block px-2 text-[13px] leading-[18px] text-gray-600"
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
