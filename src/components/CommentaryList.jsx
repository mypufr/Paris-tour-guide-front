import React from "react";
import { Link } from "react-router-dom";

const CommentaryList = ({ name, date, userImg, commentaryText }) => {
  return (
    <>
      <div className="max-w-[30vw] rounded-2xl border-red-900 shadow-lg">
        <Link to="/">
          <div className="flex flex-col p-6">
            <div className="flex py-4">
              <img src="images/star.svg" alt="" className="h-6 md:h-6 lg:h-7" />
              <img src="images/star.svg" alt="" className="h-6 md:h-6 lg:h-7" />
              <img src="images/star.svg" alt="" className="h-6 md:h-6 lg:h-7" />
              <img src="images/star.svg" alt="" className="h-6 md:h-6 lg:h-7" />
              <img src="images/empty-star.svg" alt="" className="h-6 md:h-6 lg:h-7" />
            </div>

            <p className="flex-grow ext-[12px] md:text-[14px] lg:text-[16px] leading-[18px] md:leading-[20px] lg:leading-[22px] tracking-1.5 text-grey-400">
              {commentaryText}
            </p>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <img
                  className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full object-cover"
                  src={userImg}
                  alt={name}
                />

                <div className="ml-4">

                <p className="text-sm md:text-base lg:text-lg font-bold text-secondary-950">{name}</p>
                <p className="text-[12px] md:text-[14px] lg:text-[16px] leading-[18px] md:leading-[20px] lg:leading-[22px] tracking-1.5 text-grey-400">
                  {date}
                </p>

                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CommentaryList;
