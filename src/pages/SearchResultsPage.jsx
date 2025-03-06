import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LuSearchCheck } from "react-icons/lu";

import data from "../data/data.json";

import Card from "../components/Card";

import { settings3 } from "../components/helpers/sliderSettings";
import { settings4 } from "../components/helpers/sliderSettings";

function SearchResultsPage() {
  const [tourguideInfo, setTourguideInfo] = useState([]);

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
    // navigate(`/search-tourguides/tourguide-profile/${id}`);
  };

  const getTourguideInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/tourguideInfo`);
      console.log(res.data);

      setTourguideInfo(res.data.data); // 確保是陣列
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };

  useEffect(() => {
    getTourguideInfo();
  }, []);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const adultCount = queryParams.get("adultCount");
  const childCount = queryParams.get("childCount");
  const theme = queryParams.get("theme");

  return (
    <>
      <div className="mt-10 flex items-center justify-center space-x-4">
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[30px]"
        />
        <h2 className="text-[28px] font-bold leading-[3rem] tracking-4 text-primary-600">
          您選定的搜尋條件
        </h2>
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[30px]"
        />
      </div>

      <div className="relative my-[10px] flex h-[25vh] items-center justify-center">
        {/* Background Icon */}
        <LuSearchCheck className="absolute z-0 h-[20vh] w-[20vh] opacity-10" />

        {/* Overlay content */}
        <div className="text relative z-10">
          <h2 className="mb-4 text-xl text-secondary-400">
            出發日期： <span className="text-primary-700">{startDate} </span>{" "}
          </h2>
          <h2 className="mb-4 text-xl text-secondary-400">
            離開日期： <span className="text-primary-700"> {endDate}</span>{" "}
          </h2>
          <h2 className="mb-4 text-xl text-secondary-400">
            參加人數：{" "}
            <span className="text-primary-700">
              {adultCount}位大人、{childCount}位小孩
            </span>{" "}
          </h2>
          <h2 className="text-xl text-secondary-400">
            行程主題： <span className="text-primary-700"> {theme} </span>
          </h2>
        </div>
      </div>

      <div className="mt-[20px] flex items-center justify-center space-x-4">
        <img
          src="/images/website_logo.png"
          alt=""
          className="inline-block h-[30px]"
        />
        <h2 className="text-[28px] font-bold leading-[3rem] tracking-4 text-primary-600">
          搜尋您的專屬導遊區，有{tourguideInfo.length}位導遊可為您服務
        </h2>
        <img
          src="/images/website_logo.png"
          alt=""
          className="inline-block h-[30px]"
        />
      </div>

      {/* slides show 1: search results */}
      {/* <div className="m-auto my-20 max-w-[67.5%]">
        <div className="mt-8">
          <Slider {...settings4} className="overflow-clip">
            {data.map((tourguide, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(data.id)}
                className=""
              >
                <div className="transform space-x-0 transition-transform duration-300 hover:scale-105">
                  <Card
                  id={tourguide.id}
                    imgSrc={tourguide.img}
                    title={tourguide.name}
                    price={tourguide.price_adult}
                    themes={tourguide.themes}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div> */}

      <div className="m-auto pt-10 max-w-[67.5%]">
        <div className="grid grid-cols-3 gap-4">
          {/* <Slider {...settings3} className="overflow-clip"> */}
            {tourguideInfo.map((item, index) => (
                <div
                key={index}
                onClick={() => handleCardClick(item.id)}
                className=""
              >
                <Card
                  key={index}
                  id={item.id}
                  imgSrc={item.imgUrl}
                  title={item.name}
                  price={item.price_adult}
                  themes={item.themes}
                  onClick={() => handleCardClick(item.id)}
                  className="cursor-pointer"
                  />
                   </div>
                ))
               }
              {/* </Slider> */}
        </div>
      </div>

      

      <div className="mt-auto flex justify-center pt-6 pb-4">
        <button className="mt-2 flex w-[10%] justify-center rounded-2xl bg-secondary-400 p-3 transition-colors duration-200 hover:bg-secondary-200 active:border active:border-secondary-200 active:bg-transparent">
          <img src="images/BsHandIndex.svg" alt="" className="inline-block" />

          <span className="ml-2 font-bold tracking-1.5 text-white">
            查看更多
          </span>
        </button>
      </div>
      {/* slides show 2: other recommandations */}

      <div className="mt-10 flex justify-center space-x-4 hover:cursor-pointer">
        <img
          src="/images/website_logo.png"
          alt=""
          className="inline-block h-[40px]"
        />
        <h2 className="text-[28px] font-bold leading-[3rem] tracking-4 text-primary-600">
          還有其他導遊正等你隨時預約!
        </h2>
        <img
          src="/images/website_logo.png"
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
          <Slider {...settings3} className="overflow-clip">
          {tourguideInfo.map((item, index) => (
                <div 
                key={index}
                onClick={() => handleCardClick(item.id)}
                className=""
              >
                <Card
                  key={index}
                  id={item.id}
                  imgSrc={item.imgUrl}
                  title={item.name}
                  price={item.price_adult}
                  themes={item.themes}
                  onClick={() => handleCardClick(item.id)}
                  className="cursor-pointer"
                  />
                   </div>
                ))
               }
          </Slider>
        </div>
        

        
      </div>
    </>
  );
}

export default SearchResultsPage;
