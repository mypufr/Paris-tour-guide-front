import React from "react";
import { Link } from "react-router-dom";

const TourguideList = ({ name, imgUrl, themes, languages }) => {
  return (
    <>
    
    <div className=""
    >
      <Link to="/">
        <div className="flex rounded-2xl p-4 bg-white mb-4">
          <img
            className="rounded-full object-cover w-24 h-24"
            src={imgUrl}
            alt={name}
          />
          <div className="ml-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
              <span className="text-base font-bold text-secondary-950">
                {name}
              </span>
              <span className="flex">
              <img src="images/star.svg" alt="" className="h-6"/>
              <img src="images/star.svg" alt="" className="h-6"/>
              <img src="images/star.svg" alt="" className="h-6"/>
              <img src="images/star.svg" alt="" className="h-6"/>
              <img src="images/empty-star.svg" alt="" className="h-6"/>
              </span>
              </div>
              <span className="text-[14px] leading-[19.6px] tracking-1.5 text-grey-400">
                專長：{themes}
              </span>
              <span className="text-[14px] leading-[19.6px] tracking-1.5 text-grey-400">
                語言：{languages}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  
      </>
  );
};

export default TourguideList;
