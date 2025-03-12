import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaRegCalendarCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";

const SiteCard = ({
  imageUrl,
  siteName,
  date,
  duration,

  description,
  price,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Animation duration can be adjusted here
  }, []);

  return (
    <>
      <div className="max-w-sm rounded-3xl border-2 border-primary-200 bg-white shadow-lg">
        <Link to="/">
          <div className="border-1 group relative overflow-hidden rounded-2xl">
          <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg px-2 py-1 text-[14px] bg-grey-400 text-white flex items-center gap-1">
              
              
          <FaRegClock />
              {duration}小時
            </div>
            <img
              className="transtion-all group-hoverblur:sm inline-block h-[200px] w-full rounded-t-xl object-cover duration-300 group-hover:scale-110"
              src={imageUrl}
              alt={siteName}
            />

            {/* Hover 時出現的半透明遮罩 */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-xl font-bold text-white">馬上報名</span>
            </div>
            <div className="">
              {/* title */}
          
              <div className="flex items-center justify-between px-2 py-3">
                {/* <img
                  src="/images/red-balon.png"
                  alt=""
                  className="inline-block h-4"
                /> */}

                <h6 className="text-bold text-md text-primary-700">
                  {siteName}
                </h6>
                <span className="inline-flex">
                  <img
                    src="/images/star.svg"
                    alt=""
                    className="inline-block h-20 max-h-4"
                  />
                  <img src="/images/star.svg" alt="" className="max-h-4" />
                  <img src="/images/star.svg" alt="" className="max-h-4" />
                  <img src="/images/star.svg" alt="" className="max-h-4" />
                  <img
                    src="/images/empty-star.svg"
                    alt=""
                    className="max-h-4"
                  />
                </span>
              </div>

              {/* duration+intro */}

              <div className="">
                <p className="line-clamp-5  px-2 text-[14px] leading-[19.6px] tracking-1.5 text-grey-400">
                  {description}
                </p>
              </div>
            </div>

            <div className="my-4 flex justify-between space-x-2 px-2">
              <div className="hidden lg:flex lg:justify-end lg:space-x-2">
                <FaRegCalendarCheck className="text-primary-300" />
                <p className="text-[11px] leading-[15.4px] tracking-1.5 text-primary-500">
                  {date}
                </p>
              </div>

              <p className="text-sm font-bold leading-[15.4px] tracking-1.5 text-grey-600">
                {price} €/人
              </p>
            </div>
          </div>
        </Link>

        <div className="flex justify-center p-2">
          <button className="w-full rounded-xl bg-primary-600">
            <p className="p-1 text-base text-white">搶先報名</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default SiteCard;
