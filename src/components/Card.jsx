import React from "react";
import { Link } from "react-router-dom";
import { TfiHandPointRight } from "react-icons/tfi";

const Card = ({ id, imgSrc, title, price, themes }) => {
  return (
    <div className="rounded-2xl border-0 border-primary-200 min-[375px]:p-8 md:max-w-sm">
      <Link to={`/search-tourguides/tourguide-profile/${id}`}>
        <div className="border-1 rounded-2xl border border-primary-200">
          <img
            className="h-[257px] w-full rounded-t-xl object-cover md:max-h-[150px] xl:max-h-[240px]"
            src={imgSrc}
            alt={title}
          />

          <div className="space-y-1 p-6">
            <div className="flex justify-between">
              <h6 className="mb-2 text-base font-bold text-gray-500 2xl:text-xl">
                {title}
              </h6>
              <span className="hidden lg:inline-block lg:text-base lg:font-bold lg:text-gray-600">
                {price} € / 小時
              </span>
            </div>
            {/* <div className="space-x-2 md:flex md:flex-col md:items-start md:justify-center md:space-x-0 md:space-y-1 min-[1440px]:flex-row min-[1440px]:items-center min-[1440px]:justify-start min-[1440px]:space-x-1 min-[1440px]:space-y-0 min-[1920px]:items-start min-[1920px]:justify-start">
              <span className="inline-block   text-[13px] leading-[18px] text-gray-600">
                {specialities1}
              </span>
              <span className="inline-block  px-2 text-[13px] leading-[18px] text-gray-600">
                {specialities2}
              </span>
              <span className="inline-block px-2 text-[13px] leading-[18px] text-gray-600">
                {specialities3}
              </span>
            </div> */}
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
          <div className="flex justify-center pt-3 md:hidden">
            <button className="w-full rounded-xl bg-primary-600 px-[10%] py-3 transition-colors duration-200 hover:bg-primary-300 active:border active:border-primary-600 active:bg-transparent">
              <div to="/search-tourguides" className="flex justify-center">
                {/* <img src="images/BsHandIndex.svg" alt="" className="inline-block h-6 pr-1" /> */}
                <TfiHandPointRight className="text-2xl text-white" />

                <span className="pl-2 font-bold tracking-1.5 text-white">
                  我要預約導遊
                </span>
              </div>
            </button>
          </div>
          <div className="hidden py-3 md:flex md:justify-center 2xl:hidden">
            <button className="w-full rounded-xl bg-secondary-400 px-[10%] py-3 transition-colors duration-200 hover:bg-primary-300 active:border active:border-primary-600 active:bg-transparent">
              <div to="/search-tourguides" className="flex justify-center">
                {/* <img src="images/BsHandIndex.svg" alt="" className="inline-block h-6 pr-1" /> */}
                <TfiHandPointRight className="text-2xl text-white" />

                <span className="pl-2 font-bold tracking-1.5 text-white">
                  點我看更多
                </span>
              </div>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
