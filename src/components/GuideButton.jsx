import React from "react";
import { Link } from "react-router-dom";

import { TfiHandPointRight } from "react-icons/tfi";

const GuideButton = ({
  to = "/search-tourguides#target-section",
  label = "我要預約導遊",
  color = "bg-primary-600",
  hoverColor="hover:bg-primary-200"
}) => {
  return (
    <Link to={to} className="block w-full">
      <button
        className={`m-auto mt-2 flex max-w-full justify-center rounded-2xl ${color} ${hoverColor} px-[15%] py-3 transition-colors duration-200 hover:bg-primary-200 active:outline active:outline-gray-200 active:bg-transparent active:text-grey-400`}
      >
        <TfiHandPointRight className="text-2xl text-white" />
        <span className="ml-2 font-bold tracking-1.5 text-white">{label}</span>
      </button>
    </Link>
  );
};

export default GuideButton;
