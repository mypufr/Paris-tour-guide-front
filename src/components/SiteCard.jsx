import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SiteCard = ({
  imageUrl,
  tripName,
  date,
  duration,
  NumPeople,
  description,
  price,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Animation duration can be adjusted here
  }, []);

  return (
    <>
      {/* <div className="max-w-sm rounded-3xl border-2 border-secondary-200 bg-white shadow-lg"
      // data-aos="zoom-in-right"
      //    data-aos-easing="ease-in-sine"
      >
        <Link to="/" >
          <div className="rounded-3xl">
            <img
              className="inline-block rounded-t-3xl object-cover h-[300px]"
              src={imageUrl}
              alt={tripName}
            />

            <div className="p-3">
              <div className="flex items-center justify-between">
                <h6 className="m-2 text-2xl font-bold text-blue-50">
                  {tripName}
                </h6>
                <span className="flex">
                  <img
                    src="images/star.svg"
                    alt=""
                    className="inline-block h-20 max-w-6"
                  />
                  <img src="images/star.svg" alt="" className="max-w-6" />
                  <img src="images/star.svg" alt="" className="max-w-6" />
                  <img src="images/star.svg" alt="" className="max-w-6" />
                  <img
                    src="images/empty-star.svg"
                    alt=""
                    className="max-w-6"
                  />
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <img
                      src="images/vector_title.png"
                      alt=""
                      className="inline-block h-5 max-w-5"
                    />
                    <p className="text-grey-500 text-xl font-bold">
                      {duration}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <img
                      src="images/vector_title.png"
                      alt=""
                      className="inline-block h-5 max-w-5"
                    />
                    <p className="text-grey-500 text-xl font-bold">
                      最多{NumPeople}人為限
                    </p>
                  </div>
                </div>

                <p className="text-[14px] leading-[19.6px] tracking-1.5 text-gray-400">
                  {description}
                </p>

                <div className="flex justify-between py-4">
                  <div className="flex justify-end space-x-2">
                    <img src="images/Group.svg" alt="" />
                    <p className="text-sm leading-[15.4px] tracking-1.5 text-primary-500">
                      出發日期：{date}
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <img src="image/Group.svg" alt="" />
                    <p className="text-xl leading-[15.4px] tracking-1.5 text-secondary-700">
                      {price} €/人
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>

<div className="flex justify-center">

        <button className="rounded-b-2xl bg-secondary-400 w-full">
          <p className="p-3 text-2xl text-white">馬上報名</p>
        </button>

</div>
      </div> */}

      <div className="max-w-sm rounded-3xl border-2 border-primary-200 bg-white shadow-lg">
        <Link to="/">
          <div className="rounded-xl">
            <img
              className="inline-block h-[200px] w-auto rounded-t-3xl object-cover"
              src={imageUrl}
              alt={tripName}
            />

            <div className="">
              {/* title */}
              <div className="flex justify-center items-center space-x-1 py-3">
                <img src="/images/red-balon.png" alt="" className="h-4 inline-block" />

                <h6 className="text-base text-gray-500">{tripName}</h6>
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

              <div className="grid grid-cols-3 gap-1">
                <div className="flex  col-span-1 justify-center">
                  <div className="flex flex-col justify-between items-center scrollbar-active">
                    <p className="text-grey-500 text-[12px] ">{duration}</p>
                    <span className="inline-block rounded-2xl border border-transparent bg-background-2 px-2 text-[12px] leading-[18px] text-grey-600 ">
                      {/* {specialities1} */}奧賽美術館
                    </span>
                    <span className="inline-block rounded-2xl border border-transparent bg-background-2 px-2 text-[12px] leading-[18px] text-grey-600">
                      {/* {specialities2} */}羅丹博物館
                    </span>
                    <span className="inline-block rounded-2xl border border-transparent bg-background-2 px-2 text-[12px] leading-[18px] text-grey-600">
                      {/* {specialities3} */}橘園美術館
                    </span>
                  </div>




                  
                </div>

                <p className="col-span-2 text-[14px] leading-[19.6px] tracking-1.5 text-grey-400 max-h-[100px] overflow-y-scroll line-clamp-5">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 px-2">
              <img src="image/Group.svg" alt="" />
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
