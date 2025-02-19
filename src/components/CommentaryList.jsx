import React from "react";
import { Link } from "react-router-dom";

const CommentaryList = ({ name, date, userImg, commentaryText }) => {
  return (
    <>
      <div className="max-w-[30vw] rounded-2xl border border-primary-200 shadow-md">
        <Link to="/">
          <div className="flex p-2">
            <img src="/images/star.svg" alt="" className="h-2 md:h-6 lg:h-4" />
            <img src="/images/star.svg" alt="" className="h-2 md:h-6 lg:h-4" />
            <img src="/images/star.svg" alt="" className="h-2 md:h-6 lg:h-4" />
            <img src="/images/star.svg" alt="" className="h-2 md:h-6 lg:h-4" />
            <img
              src="/images/empty-star.svg"
              alt=""
              className="h-2 md:h-6 lg:h-4"
            />
          </div>
          <div className="flex">
            <div className="flex items-center gap-2 p-2 justify-between">
              <div className="flex flex-col items-center p-1">
                <img
                  className="h-8 w-8 rounded-full object-cover md:h-8 md:w-8 lg:h-8 lg:w-8"
                  src={userImg}
                  alt={name}
                />

                <div className="">
                  <p className="text-sm text-primary-500 md:text-base lg:text-[14px]">
                    {name}
                  </p>
                  <p className="text-[12px] leading-[18px] tracking-1.5 text-grey-400 md:text-[14px] md:leading-[20px] lg:text-[12px] lg:leading-[22px]">
                    {date}
                  </p>
                </div>
              </div>
              <p className="ext-[12px] flex-grow leading-[18px] tracking-1.5 text-grey-400 md:text-[14px] md:leading-[20px] lg:text-[16px] lg:leading-[22px] flex-1">
                {commentaryText}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CommentaryList;
