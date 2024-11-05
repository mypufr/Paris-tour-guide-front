import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LuSearchCheck } from "react-icons/lu";

import data from "../data/data.json";

import Card from "../components/Card";

import { settings3 } from "../components/helpers/sliderSettings";
import { settings4 } from "../components/helpers/sliderSettings";

function SearchResultsPage() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
  };

  return (
    <>

<div className="flex justify-center space-x-4 mt-10">
        <img
          src="images/vector_title.png"
          alt=""
          className="inline-block h-[40px]"
        />
        <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
        您選定的搜尋條件
        </h2>
        <img
          src="images/vector_title.png"
          alt=""
          className="inline-block h-[40px]"
        />
      </div>

<div className="relative flex items-center justify-center h-[25vh] mt-[10px] ">
  {/* Background Icon */}
  <LuSearchCheck className="absolute h-[20vh] w-[20vh] opacity-10 z-0" />

  {/* Overlay content */}
  <div className="relative z-10 text">
    <h2 className="text-2xl font-bold text-secondary-400 mb-4">需求日期： <span className="text-primary-700"> 2024年10月19日 </span> </h2>
    <h2 className="text-2xl font-bold text-secondary-400 mb-4">參加人數： <span className="text-primary-700"> 4位成人，4位兒童</span> </h2>
    <h2 className="text-2xl font-bold text-secondary-400">參觀主題： <span className="text-primary-700"> 博物館導覽 </span></h2>
  </div>
</div>

      <div className="flex justify-center space-x-4 mt-[-20px]">
        <img
          src="images/website_logo.png"
          alt=""
          className="inline-block h-[40px]"
        />
        <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
          搜尋您的專屬導遊區，有10位導遊可為您服務
        </h2>
        <img
          src="images/website_logo.png"
          alt=""
          className="inline-block h-[40px]"
        />
      </div>

      {/* slides show 1: search results */}
      <div className="m-auto my-20 max-w-[67.5%]">
        <div className="mt-8">
          <Slider {...settings4} className="overflow-clip">
            {data.map((data, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(data.id)}
                className=""
              >
                <div className="transform space-x-0 transition-transform duration-300 hover:scale-105">
                  <Card
                    imgSrc={data.img}
                    title={data.name}
                    price={data.price}
                    specialities1={data.speciality1}
                    specialities2={data.speciality2}
                    specialities3={data.speciality3}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>




      <div className="flex justify-center mb-4 mt-auto pb-10">
              <button className="mt-2 flex w-[10%] justify-center rounded-2xl bg-secondary-400  p-3 transition-colors duration-200 hover:bg-secondary-200 active:border active:border-secondary-200 active:bg-transparent">
                <img
                  src="images/BsHandIndex.svg"
                  alt=""
                  className="inline-block"
                />

                <span className="ml-2 font-bold tracking-1.5 text-white">
                  查看更多
                </span>
              </button>
            </div>
      {/* slides show 2: other recommandations */}

      <div className="mt-10 flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/website_logo.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            還有其他導遊正等你隨時預約!
          </h2>
          <img
            src="images/website_logo.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

      <div className="m-auto max-w-[67.5%] py-10">
        <div className="mb-20">
          {/* <Slider {...settings2}>
              {TripsData.map((data, index) => (
                <div key={index}>
                  <div className="transform space-x-0 transition-transform duration-300 hover:scale-105">
                    <TripCard
                      tripName={data.tripName}
                      imageUrl={data.img}
                      description={data.description}
                      date={data.date}
                      site1={data.site1}
                      site2={data.site2}
                      site3={data.site3}
                      site4={data.site4}
                      site5={data.site5}
                    />
                  </div>
                </div>
              ))}
            </Slider> */}
          <Slider {...settings3}>
            {data.map((data, index) => (
              <div key={index} className="">
                <div className="transform space-x-0 transition-transform duration-300 hover:scale-105">
                  <Card
                    imgSrc={data.img}
                    title={data.name}
                    price={data.price}
                    specialities1={data.speciality1}
                    specialities2={data.speciality2}
                    specialities3={data.speciality3}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default SearchResultsPage;
