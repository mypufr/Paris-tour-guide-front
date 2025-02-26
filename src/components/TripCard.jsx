import React from "react";
import { Link } from "react-router-dom";
import { FaRegCalendarCheck } from "react-icons/fa";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

const TripCard = ({
  imageUrl,
  tourName,
  date,
  sites,
  description,
}) => {
  return (
    <div className="rounded-2xl bg-background-2 bg-white shadow-lg md:max-w-sm lg:border-2 lg:border-secondary-200 md:">
      <Link to="/book-trips">



        <div className="relative border-1 rounded-2xl border border-primary-200 overflow-hidden">
          <img
            className="h-[257px] w-full rounded-xl object-cover md:h-[150px] xl:h-[360px]"
            src={imageUrl}
            alt={tourName}
          />
               {/* Hover 時出現的半透明遮罩 */}
               <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
            <span className="text-xl font-bold text-white">馬上預約</span>
          </div>

          <div className="space-y-2 px-4 py-[18.5px]">
            <div className="flex space-x-2">
              <img
                src="https://i.imgur.com/zoB5vaQ.png"
                alt=""
                className="inline-block h-5 max-w-5"
              />
              <h6 className="mb-2 text-[13px] font-bold text-blue-50 2xl:text-xl">
                {tourName}
              </h6>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-start md:gap-2]">
              {[sites].map(
                (site, index) =>
                  site && (
                    <span
                      key={index}
                      className="inline-block rounded-2xl border border-transparent bg-grey-600 px-2 text-[13px] leading-[18px] text-white md:bg-background-2 md:text-grey-600"
                    >
                      {site}
                    </span>
                  ),
              )}
            </div>

            <p className="text-[14px] leading-[19.6px] tracking-1.5 text-gray-400">
              {/* {description} */}
              {truncateText(description, 60)}
            </p>

            <div className="hidden lg:flex lg:justify-end lg:space-x-2">
              {/* <img src="/images/Group.svg" alt="" /> */}
              <FaRegCalendarCheck className="text-primary-300"/>
              <p className="text-[11px] leading-[15.4px] tracking-1.5 text-primary-500">
                {date}
              </p>
            </div>

            <div className="lg:hidden flex justify-center md:py-3">
              <button className="w-full rounded-xl bg-secondary-400 px-[10%] py-3 transition-colors duration-200 hover:bg-primary-300 active:border active:border-primary-600 active:bg-transparent">
                <div to="/search-tourguides" className="flex justify-center">
                  <img
                    src="images/BsHandIndex.svg"
                    alt=""
                    className="inline-block h-6 pr-1"
                  />

                  <span className="font-bold tracking-1.5 text-white mt-auto">
                    報名行程
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TripCard;
