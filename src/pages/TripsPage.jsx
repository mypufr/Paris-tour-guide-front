import React, { useState, useRef } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import data from "../data/data.json";
import Card from "../components/Card";
import TripsData from "../data/trips.json";
import TripCard from "../components/TripCard";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

function TripsPage() {
  const [currentTab, setCurrentTab] = useState("group");
  const [currentSlide, setCurrentSlide] = useState(1);

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slideseToScroll: 2,
    arrows: true,
    rows: 1,
    afterChange: (index) => setCurrentSlide(index + 1),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },

      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },

      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },

      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
        },
      },
    ],
  };

  const sliderRef = useRef(null);

  const handleCardClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
  };
  return (
    <>
      {/* <div className="h-[200px] bg-green-800 text-center text-3xl font-bold text-white">
        Trips Page
      </div> */}
      <div role="tablist" className="tabs tabs-lifted px-10">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="關於我"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          關於我
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="可預約時段"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          可預約時段
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="導遊評價"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-6"
        >
          導遊評價
        </div>
      </div>
      <br />
      <br />
      <div className="mx-auto mt-5 w-3/4">
        {/* 選單 (Tab) */}
        <div
          role="tablist"
          className="min-h-[40px} tabs-boxed tabs flex items-center justify-start gap-4 bg-transparent"
        >
          <a
            role="tab"
            className={`tab ${currentTab === "group" ? "tab-active" : ""}`}
            onClick={() => setCurrentTab("group")}
          >
            團體行程開團中
          </a>
          <a
            role="tab"
            className={`tab ${currentTab === "private" ? "tab-active" : ""}`}
            onClick={() => setCurrentTab("private")}
          >
            預定私人行程
          </a>
          <a
            role="tab"
            className={`tab ${currentTab === "recommend" ? "tab-active" : ""}`}
            onClick={() => setCurrentTab("recommend")}
          >
            導演推薦景點
          </a>
        </div>
        {/* 內容區域 */}
        <div className="mt-5 grid w-full grid-cols-3 items-center gap-4">
          {/* 左側 Pagination 按鈕 */}
          <div className="flex w-full flex-col justify-center gap-2">
            <p>等你加入，現在就出發!</p>
            {(() => {
              switch (currentTab) {
                case "group":
                  return (
                    <>
                      <div className="flex items-center justify-center space-x-8 2xl:mt-6">
                        <button
                          onClick={() => sliderRef.current.slickPrev()}
                          className="hover:text-primary-400 p-2 text-grey-950"
                        >
                          <SlArrowLeft />
                        </button>

                        {/* 放置 pagination */}
                        <div className="pagination-container text-xl font-bold text-primary-600">
                          <span>{currentSlide}</span> /{" "}
                          <span className="text-grey-950">{data.length}</span>
                          {/* 可使用 Pagination 元件或根據 Slider 狀態自訂 */}
                        </div>

                        <button
                          onClick={() => sliderRef.current.slickNext()}
                          className="hover:text-primary-400 text-grey-950"
                        >
                          <SlArrowRight />
                        </button>
                      </div>
                      {/* <a href="#group3" className="btn btn-xs">
                        3
                      </a>
                      <a href="#group4" className="btn btn-xs">
                        4
                      </a> */}
                    </>
                  );
                case "private":
                  return (
                    <>
                      <a href="#private1" className="btn btn-xs">
                        A
                      </a>
                      <a href="#private2" className="btn btn-xs">
                        B
                      </a>
                      <a href="#private3" className="btn btn-xs">
                        C
                      </a>
                      <a href="#private4" className="btn btn-xs">
                        D
                      </a>
                    </>
                  );
                case "recommend":
                  return (
                    <>
                      <a href="#recommend1" className="btn btn-xs">
                        a
                      </a>
                      <a href="#recommend2" className="btn btn-xs">
                        b
                      </a>
                      <a href="#recommend3" className="btn btn-xs">
                        c
                      </a>
                      <a href="#recommend4" className="btn btn-xs">
                        d
                      </a>
                    </>
                  );
                default:
                  return null;
              }
            })()}
          </div>

          {/* 右側 Carousel 區域 */}
          <div className="col-span-2">
            <div className="carousel w-full">
              {(() => {
                switch (currentTab) {
                  case "group":
                    return (
                      <>
                        <div className="w-full">
                          <Slider {...settings1} arrows={false} ref={sliderRef}>
                            {data.map((data, index) => (
                              <div
                                key={index}
                                className="slide-item"
                                onClick={() => handleCardClick(data.id)}
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
                      </>
                    );
                  case "private":
                    return (
                      <>
                        <div id="private1" className="carousel-item w-full">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                            className="w-full"
                          />
                        </div>
                        <div id="private2" className="carousel-item w-full">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                            className="w-full"
                          />
                        </div>
                        <div id="private3" className="carousel-item w-full">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                            className="w-full"
                          />
                        </div>
                        <div id="private4" className="carousel-item w-full">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                            className="w-full"
                          />
                        </div>
                      </>
                    );
                  case "recommend":
                    return (
                      <>
                        <div id="recommend1" className="carousel-item w-full">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                            className="w-full"
                          />
                        </div>
                        <div id="recommend2" className="carousel-item w-full">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                            className="w-full"
                          />
                        </div>
                        <div id="recommend3" className="carousel-item w-full">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                            className="w-full"
                          />
                        </div>
                        <div id="recommend4" className="carousel-item w-full">
                          <img
                            src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                            className="w-full"
                          />
                        </div>
                      </>
                    );
                  default:
                    return null;
                }
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* slides show: popular tourist guides */}
      {/* <div className="mt-10">
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="https://i.imgur.com/zoB5vaQ.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600 2xl:text-[40px]">
            熱門導遊
          </h2>
          <img
            src="https://i.imgur.com/zoB5vaQ.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>
      </div> */}      <div className="flex">
        <div className="flex w-1/3 items-center justify-center space-x-8 2xl:mt-6">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="hover:text-primary-400 p-2 text-grey-950"
          >
            <SlArrowLeft />
          </button>

          {/* 放置 pagination */}
          <div className="pagination-container text-xl font-bold text-primary-600">
            <span>{currentSlide}</span> /{" "}
            <span className="text-grey-950">{data.length}</span>
            {/* 可使用 Pagination 元件或根據 Slider 狀態自訂 */}
          </div>

          <button
            onClick={() => sliderRef.current.slickNext()}
            className="hover:text-primary-400 text-grey-950"
          >
            <SlArrowRight />
          </button>
        </div>
        <div className="w-2/3">
          <Slider {...settings1} arrows={false} 
          // ref={sliderRef}
          >
            {data.map((data, index) => (
              <div
                key={index}
                className="slide-item grid gap-4 p-1 sm:grid-cols-1 sm:p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                onClick={() => handleCardClick(data.id)}
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

    </>
  );
}

export default TripsPage;
