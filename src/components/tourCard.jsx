import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { IoRemoveOutline } from "react-icons/io5";

const TourCard = ({
  imageUrl,
  tourName,
  date,
  sites,
  duration,
  description,
  price,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Animation duration can be adjusted here
  }, []);

  return (
    <>
      <div className="h-[450px] max-w-sm rounded-3xl border-2 border-primary-200 bg-white shadow-lg">
        <Link to="/">
          <div className="border-1 group relative overflow-hidden rounded-2xl">
            <div className="absolute rounded-br-lg rounded-tl-lg bg-secondary-600 px-2 py-1 text-[14px] text-white">
              {date[0]}
            </div>

            <img
              className="transtion-all group-hoverblur:sm inline-block h-[200px] w-full rounded-t-xl object-cover duration-300 group-hover:scale-110"
              src={imageUrl}
              alt={tourName}
            />

            {/* Hover 時出現的半透明遮罩 */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-xl font-bold text-white">詳細內容</span>
            </div>
            <div className="">
              {/* title */}
              <div className="flex items-center justify-center space-x-1 py-3">
                <img
                  src="/images/red-balon.png"
                  alt=""
                  className="inline-block h-4"
                />

                <h6 className="text-base font-bold text-gray-500">
                  {tourName}
                </h6>
                <span className="inline-flex">
                  <img
                    src="/images/star.svg"
                    alt=""
                    className="inline-block h-20 max-h-3"
                  />
                  <img src="/images/star.svg" alt="" className="max-h-3" />
                  <img src="/images/star.svg" alt="" className="max-h-3" />
                  <img src="/images/star.svg" alt="" className="max-h-3" />
                  <img
                    src="/images/empty-star.svg"
                    alt=""
                    className="max-h-3"
                  />
                </span>
              </div>

              {/* duration+intro */}
          

              <div className="grid grid-cols-3 mt-1">
                <div className="col-span-1 flex justify-center">
                  <div className="scrollbar-active flex flex-col items-center justify-between">
                    <div className="flex items-center gap-1">   <IoRemoveOutline className="text-grey-200" />
                <p className="text-[12px] text-grey-600">{duration}小時</p>
                <IoRemoveOutline className="text-grey-200" /></div>

                    <div className="flex flex-col items-start gap-1">
                      {sites?.map((site, index) => (
                        <span
                          key={index}
                          className="inline-block rounded-2xl border border-transparent bg-background-2 px-1 text-[12px] leading-[18px] text-grey-600"
                        >
                          {site}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="col-span-2 line-clamp-5  text-[14px] leading-[19.6px] tracking-1.5 text-grey-400 px-2">
                  {description}
                </p>
              </div>
            </div>

            <div className="my-4 flex justify-end space-x-2 px-2">
              <p className="text-sm font-bold leading-[15.4px] tracking-1.5 text-grey-600">
                {price} €/人
              </p>
            </div>
          </div>
        </Link>

        <div className="flex justify-center p-2">
          <button className="w-full rounded-2xl bg-primary-600">
            <p className="p-1 text-base text-white">搶先報名</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default TourCard;
