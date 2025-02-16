import React, { useState, useRef } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-day-picker/dist/style.css";

import data from "../data/data.json";
import Card from "../components/Card";
import TripsData from "../data/trips.json";
import TripCard from "../components/TripCard";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { DayPicker } from "react-day-picker";
// import Pikaday from "pikaday";

// import "./TripsPage.css";

function TripsPage() {
  const [currentTab, setCurrentTab] = useState("group");
  const [currentSlide, setCurrentSlide] = useState(1);
  const [date, setDate] = useState(null);

  const myDatepicker = useRef(null);

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
    // navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
  };
  return (
    <>


<div className="text-center font-bold"><h1>Under construction</h1></div>


      <div role="tablist" className="tabs tabs-lifted mx-auto mt-5 w-3/4">
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

       <div className="max-w-[50%]" >
            {/* title */}
            <div className="m-10 flex justify-center space-x-4 hover:cursor-pointer" id="target-section">
              <img
                src="images/vector_title.png"
                alt=""
                className="inline-block h-[40px]"
              />
              <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
                您的專屬導遊 : 
                {/* {CardData.name} */}
              </h2>
              <img
                src="images/vector_title.png"
                alt=""
                className="inline-block h-[40px]"
              />
            </div>
            <img
              src="UI_Paris/public/images/step-2-3.png"
    
              
              // {CardData.img}
              
              alt=""
              className="object-center-30 inline-block max-h-[640.31px] w-full rounded-3xl object-cover"
            />
            <div className="py-10">
              <div className="my-4 flex justify-between">
                <div className="flex space-x-2">
                  <button className="inline-block rounded-full border border-secondary-300 px-5">
                    <p className="text-xl text-secondary-600">
                      {/* {CardData.speciality1} */}
                    </p>
                  </button>
                  <button className="inline-block rounded-full border border-secondary-300 px-5">
                    <p className="text-xl text-secondary-600">
                      {/* {CardData.speciality2} */}
                    </p>
                  </button>
                  <button className="inline-block rounded-full border border-secondary-300 px-5">
                    <p className="text-xl text-secondary-600">
                      {/* {CardData.speciality3} */}
                    </p>
                  </button>
                </div>

                <div className="flex flex-col">
                  <span>大人 
                    {/* {CardData.price} */}
                    € /小時</span>
                  <span>兒童 
                    {/* {CardData.price - 3} */}
                    € /小時</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
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
                <p>80人已評價</p>
              </div>

              <div className="flex items-center justify-between space-x-6">
                <p>語言：中文、英文</p>

                <button
                  className="flex max-w-full justify-center space-x-20 rounded-lg border border-gray-300 bg-primary-700 px-4 py-4 text-white"
                  // onClick={handleSendMessageClick}
                >
                  <p>留言給
                    {/* {CardData.name} */}
                    
                    </p>
                </button>
              </div>

              {/* Profile description */}
              <div className="mt-6 border-spacing-2 space-y-4 rounded-2xl border border-primary-200 px-4 py-6">
                <div className="my-6 flex justify-center space-x-6">
                  <img
                    src="images/website_logo.png"
                    alt=""
                    className="h-3xl inline-block"
                  />
                  <h3 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
                    {/* 關於{CardData.name} */}
                  </h3>
                </div>
                <p className="text-2xl">
                  {/* 大家好，我是{CardData.name}，您的專屬巴黎導遊！ */}
                  <br />
                  <br />
                  我已經在巴黎生活了七年，並且有超過五年的導遊經驗。這些年來，我有幸帶領來自世界各地的遊客深入探索這座充滿魅力的城市。
                  <br />
                  <br />
                  我對巴黎的熱愛源於她豐富的歷史、迷人的文化以及多姿多彩的生活方式。無論是漫步在塞納河畔、欣賞盧浮宮的藝術珍寶，還是探索隱藏在小巷中的法式咖啡館，我都希望能將巴黎的每一個角落最真實、最動人的一面展現在您的面前。
                  <br />
                  <br />
                  在這五年多的導遊生涯中，我帶領過各種不同需求和背景的團隊，包括家庭旅遊、小型私人團體、商務考察團等。我擅長根據每位客人的興趣和喜好，設計出個性化的旅遊行程。不管您是藝術愛好者、美食饕客，還是歷史迷，我都能為您量身定制一個完美的巴黎之旅。
                  <br />
                  <br />
                  除了帶團之外，我也積極參與當地文化活動和導覽培訓，這讓我不僅擁有豐富的知識，更能為您提供最新、最有趣的巴黎資訊。我的目標是讓每一位客人都能在輕鬆愉快的氛圍中，感受巴黎的獨特魅力，並帶著滿滿的美好回憶離開。
                  <br />
                  <br />
                  希望能在巴黎與您相遇，一起走過這座充滿故事的城市，留下屬於您的巴黎篇章！
                </p>

                <div className="flex justify-center space-x-6 pt-4">
                  <img
                    src="images/website_logo.png"
                    alt=""
                    className="h-3xl inline-block"
                  />
                  <h4 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
                    {/* 關於{CardData.name}的連結 */}
                  </h4>
                </div>

                {/* <ul>
                  <li className="flex items-center justify-center space-x-4">
                    <Link to="/">
                      <FaFacebook className="text-[40px]" />
                    </Link>
                    <Link
                      to="/"
                      className="inline-block rounded-full border-2 border-white p-2"
                    >
                      <RiInstagramFill className="text-[48px]" />
                    </Link>
                    <Link to="/">
                      <AiFillTwitterCircle className="text-[48px]" />
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>

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
          <div className="flex">
            <div
              popover="auto"
              id="rdp-popover"
              className="dropdown"
              style={{ positionAnchor: "--rdp" }}
            >
              <DayPicker
                className="react-day-picker rounded-xl border border-primary-200 bg-white p-6 shadow-lg"
                numberOfMonths={2}
                classNames={{
                  day: "items-center justify-center text-lg hover:bg-gray-200 rounded-full",
                }}
                mode="single"
                selected={date}
                onSelect={setDate}
              />
              {/* <DayPicker
    className="scale-110 rounded-xl bg-white p-6 shadow-lg"
    classNames={{
      months: "justify-center",
      day: "w-20 h-20  text-lg hover:bg-gray-200 rounded-full",
      caption:
      "text-lg font-bold mb-2 text-primary-500",
      row: "space-x-1",
      head_cell: "text-xl font-bold text-gray-700",
      nav: "flex justify-between mb-4",
      }}
      mode="single"
      selected={date}
      onSelect={setDate}
      /> */}
            </div>
            <div
              // popoverTarget="rdp-popover"
              className="input-border input text-xl font-bold text-primary-300"
              style={{ anchorName: "--rdp" }}
            >
              {date
                ? `${date.toLocaleDateString()}還有這些空檔:`
                : "請選擇日期"}
            </div>
          </div>
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
          <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-primary-500 scrollbar-track-primary-100 h-64 overflow-y-scroll">


 
            <h2>導遊評價</h2>

            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
            <p>這是一段很長的內容...</p>
          </div>
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
                  return <></>;
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
                      <div className="">
                        <p>
                          除了團體行程，我們的導遊提供靈活的私人行程，採用時薪制計費，讓您可以根據自己的需求與時間安排，預訂專屬的導覽服務。
                        </p>

                        {/* <div className="flex">

                        <div
                          popover="auto"
                          id="rdp-popover"
                          className="dropdown"
                          style={{ positionAnchor: "--rdp" }}
                        >
                          <DayPicker
                            className="react-day-picker scale-120 rounded-xl border border-primary-500 bg-white p-6 shadow-lg"
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                          />
                          <DayPicker
                            className="scale-110 rounded-xl bg-white p-6 shadow-lg"
                            classNames={{
                              months: "justify-center",
                              day: "w-20 h-20  text-lg hover:bg-gray-200 rounded-full",
                              caption:
                              "text-lg font-bold mb-2 text-primary-500",
                              row: "space-x-1",
                              head_cell: "text-xl font-bold text-gray-700",
                              nav: "flex justify-between mb-4",
                              }}
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              /> 
                        </div>
                              <button
                                // popoverTarget="rdp-popover"
                                className="input-border input"
                                style={{ anchorName: "--rdp" }}
                              >
                                {date ? date.toLocaleDateString() : "Pick a date"}
                              </button>



                      </div> */}
                      </div>
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
      </div> */}
      {/* <div className="flex">
        <div className="flex w-1/3 items-center justify-center space-x-8 2xl:mt-6">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="hover:text-primary-400 p-2 text-grey-950"
          >
            <SlArrowLeft />
          </button>

   
          <div className="pagination-container text-xl font-bold text-primary-600">
            <span>{currentSlide}</span> /{" "}
            <span className="text-grey-950">{data.length}</span>
     
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
      </div> */}
    </>
  );
}

export default TripsPage;
