import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import data from "../data/data.json";
import TripsData from "../data/trips.json";
import SingleTripData from "../data/singleSite.json";
import CommentaryData from "../data/commentaries.json";

import TripCard from "../components/TripCard";
import SiteCard from "../components/SiteCard";
import CommentaryList from "../components/CommentaryList";
import Card from "../components/Card";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-day-picker/dist/style.css";

import AOS from "aos";
import "aos/dist/aos.css";

import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import { MdRestaurant } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";
import { LuHelpingHand } from "react-icons/lu";
import { MdNightlight } from "react-icons/md";
import { MdFlight } from "react-icons/md";
import { MdGTranslate } from "react-icons/md";
import { DayPicker } from "react-day-picker";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

// import { settings5 } from "../components/helpers/sliderSettings";
import { settings3 } from "../components/helpers/sliderSettings";
import { settings4 } from "../components/helpers/sliderSettings";

function TourguideProfilePage() {
  const { id } = useParams();
  const CardData = data.find((item) => item.id === parseInt(id));
  console.log(CardData);

  if (!CardData) {
    return <div>Results not found</div>;
  }
  const [activeTab, setActiveTab] = useState("tab-1");
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

  const navigate = useNavigate();

  const handleSendMessageClick = () => {
    navigate(`/search-tourguides/tourguide-profile/${id}/message`);
  };

  const handlePrivateTripsClick = () => {
    navigate(`/search-tourguides/tourguide-profile/${id}/private-trips`);
  };

  const handleCardClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}`);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Animation duration can be adjusted here
  }, []);

  return (
    <>
      <div className="flex justify-center py-[5vh] text-3xl font-bold text-grey-950">
        <div className=" w-full bg-primary-100 py-10">
          <div className="mx-auto w-3/4">
            <div className="flex justify-evenly">
              {/* Tourguide profile */}
              <div className="">
                {/* title */}
                <div
                  className="mb-[60px] flex justify-center space-x-2 hover:cursor-pointer"
                  id="target-section"
                >
                  <img
                    src="/images/vector_title.png"
                    alt=""
                    className="inline-block h-[30px]"
                  />
                  <h2 className="text-[28px] font-bold  text-primary-600">
                    您的專屬導遊 : {CardData.name}
                  </h2>
                  <img
                    src="/images/vector_title.png"
                    alt=""
                    className="inline-block h-[30px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-[2vw] px-11">
                  <div className="col-span-1">
                    <img
                      src={CardData.img}
                      alt=""
                      className="object-center-30 inline-block w-full min-h-[421px] rounded-3xl object-cover"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-around">
                    <div className="flex space-x-2">
                      <p className="text-xl text-[#324561]">
                        {CardData.speciality1}
                      </p>

                      <p className="text-xl text-[#324561]">
                        {CardData.speciality2}
                      </p>

                      <p className="text-xl text-[#324561]">
                        {CardData.speciality3}
                      </p>
                    </div>

                    <div className="flex items-center space-x-6">
                      <span className="flex">
                        <img
                          src="/images/star.svg"
                          alt=""
                          className="inline-block h-4 max-w-6"
                        />
                        <img
                          src="/images/star.svg"
                          alt=""
                          className="inline-block h-4 max-w-6"
                        />
                        <img
                          src="/images/star.svg"
                          alt=""
                          className="inline-block h-4 max-w-6"
                        />
                        <img
                          src="/images/star.svg"
                          alt=""
                          className="inline-block h-4 max-w-6"
                        />
                        <img
                          src="/images/empty-star.svg"
                          alt=""
                          className="inline-block h-4 max-w-6"
                        />
                      </span>
                      <p className="text-sm text-grey-400">80人已評價</p>
                    </div>

                    <div className="space-x-2">
                      <button className="inline-block rounded-full bg-background-2 px-5">
                        <p className="text-[13px] text-grey-600">
                          {/* {CardData.speciality1} */}
                          中文
                        </p>
                      </button>

                      <button className="inline-block rounded-full bg-background-2 px-5">
                        <p className="text-[13px] text-grey-600">
                          {/* {CardData.speciality1} */}
                          英文
                        </p>
                      </button>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xl text-primary-800">大人 </span>
                      <span className="text-grey-650 text-base">
                        {CardData.price}€ /小時
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xl text-primary-800">兒童 </span>
                      <span className="text-grey-650 text-base">
                        {" "}
                        {CardData.price - 3}€ /小時
                      </span>
                    </div>

                    <div className=" ">
                      <button
                        className="w-full rounded-lg  bg-primary-600 px-4 py-4 text-base text-white"
                        onClick={handleSendMessageClick}
                      >
                        <p>留言給{CardData.name}</p>
                      </button>
                    </div>
                  </div>

                  {/* Profile description */}
                  {/* <div className="mt-6 border-spacing-2 space-y-4 rounded-2xl border border-primary-200 px-4 py-6">
                <div className="my-6 flex justify-center space-x-6">
                  <img
                    src="/images/website_logo.png"
                    alt=""
                    className="h-3xl inline-block"
                  />
                  <h3 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
                    關於{CardData.name}
                  </h3>
                </div>
                <p className="text-2xl">
                  大家好，我是{CardData.name}，您的專屬巴黎導遊！
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
                    src="/images/website_logo.png"
                    alt=""
                    className="h-3xl inline-block"
                  />
                  <h4 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
                    關於{CardData.name}的連結
                  </h4>
                </div>

                <ul>
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
                </ul>
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* single trip title */}
        {/* <div className="mt-10 flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            {CardData.name} 的定點深度導覽
          </h2>
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div> */}

        {/* single trips : Grid*/}
        {/* <div className="m-auto my-20 grid max-w-[75%] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {SingleTripData.slice(0, 6).map((data, index) => (
            <div key={index}>
              <div
                className=""
                data-aos="zoom-in"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
              >
                <SiteCard
                  tripName={data.tripName}
                  imageUrl={data.imgUrl}
                  description={data.description}
                  date={data.date}
                  duration={data.duration}
                  NumPeople={data.NumPeople}
                  price={data.price}
                />
              </div>
            </div>
          ))}
        </div> */}

        {/* thematic trip title */}
        {/* <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            {CardData.name} 的主題式導覽行程
          </h2>
          <img
            src="/images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div> */}
        {/* thematic trips : Grid*/}

        {/* <div className="m-auto my-20 grid max-w-[75%] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TripsData.slice(0, 6).map((data, index) => (
            <div key={index}>
              <div
                className="duration-400 relative transform overflow-hidden rounded-3xl transition-all hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
                data-aos="zoom-in-left"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
              >
                <TripCard
                  tripName={data.tripName}
                  imageUrl={data.imgUrl}
                  description={data.description}
                  date={data.date}
                  duration={data.duration}
                  NumPeople={data.NumPeople}
                  site1={data.site1}
                  site2={data.site2}
                  site3={data.site3}
                  site4={data.site4}
                  site5={data.site5}
                />
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* 測試tab */}
      <div className="mx-auto flex w-3/4 pb-10">
        <div className="mx-auto px-8 sm:px-4">
          <div className="sm:w-full">
            {/* Tab 列表 */}
            <div
              role="tablist"
              aria-label="tabs"
              className="relative mx-auto flex h-12 w-full items-center justify-start px-1"
            >
              {/* 動態背景，移動到選擇的 Tab */}
              <div
                className={`absolute top-0 h-12 w-28 border-b-2 bg-primary-100 shadow-md transition-all duration-300`}
                style={{
                  left:
                    activeTab === "tab-1"
                      ? "0px"
                      : activeTab === "tab-2"
                        ? "108px"
                        : "230px",
                }}
              ></div>

              {/* 第一個 Tab */}
              <button
                role="tab"
                aria-selected={activeTab === "tab-1"}
                id="tab-1"
                className={`relative z-10 block h-12 px-6 text-left transition-all${
                  activeTab === "tab-1"
                    ? "bg-primary-100 font-bold text-primary-600"
                    : "text-gray-950"
                }`}
                onClick={() => setActiveTab("tab-1")}
              >
                關於我
              </button>

              {/* 第二個 Tab */}
              <button
                role="tab"
                aria-selected={activeTab === "tab-2"}
                id="tab-2"
                className={`relative z-10 block h-10 rounded-full px-6 text-left transition-all ${
                  activeTab === "tab-2"
                    ? "font-bold text-primary-600"
                    : "text-gray-950"
                }`}
                onClick={() => setActiveTab("tab-2")}
              >
                可預約時段
              </button>

              {/* 第三個 Tab */}
              <button
                role="tab"
                aria-selected={activeTab === "tab-3"}
                id="tab-3"
                className={`relative z-10 block h-10 rounded-full px-6 text-left transition-all ${
                  activeTab === "tab-3"
                    ? "font-bold text-primary-600"
                    : "text-gray-950"
                }`}
                onClick={() => setActiveTab("tab-3")}
              >
                導遊評價
              </button>
            </div>

            {/* Tab Panel 區域 */}
            <div className="relative rounded-3xl">
              {activeTab === "tab-1" && (
                <div role="tabpanel" id="panel-1">
                  <div className="">
                    <div className="py-2">
                      {/* Profile description */}
                      <div className="grid border-spacing-1 grid-cols-3 space-y-4 border border-primary-200 px-4 pt-6">
                        <div className="col-span-2 h-[50vh]">
                          <div className="my-6 flex space-x-6">
                            <img
                              src="/images/website_logo.png"
                              alt=""
                              className="h-3xl inline-block"
                            />
                            <h3 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
                              關於{CardData.name}
                            </h3>
                          </div>

                          <div className="h-[35vh] overflow-y-scroll scrollbar scrollbar-track-primary-100 scrollbar-thumb-primary-500">
                            <p className="bg-white p-4 text-xl">
                              大家好，我是{CardData.name}，您的專屬巴黎導遊！
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
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="flex justify-center space-x-6 pt-4">
                            <img
                              src="/images/website_logo.png"
                              alt=""
                              className="h-3xl inline-block"
                            />
                            <h4 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600">
                              {CardData.name}的連結
                            </h4>
                          </div>

                          <ul>
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
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tab-2" && (
                <div role="tabpanel" id="panel-2">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Second tab panel
                  </h2>
                  <p className="mt-4 text-gray-600">
                    這是第二個 Tab 的內容。Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Assumenda voluptatum harum
                    tempore porro iure veniam, facere rem nemo architecto illum
                    tempora pariatur quis? Quas autem, accusamus atque
                    perferendis distinctio corporis.
                  </p>

                  <div
                    // popoverTarget="rdp-popover"
                    className="input-border input my-10 text-xl font-bold text-primary-300"
                    style={{ anchorName: "--rdp" }}
                  >
                    {date
                      ? `${date.toLocaleDateString()}還有這些空檔:`
                      : "請選擇日期"}
                    這是第二個 Tab 的內容。Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Assumenda voluptatum harum
                    tempore porro iure veniam, facere rem nemo architecto illum
                    tempora pariatur quis? Quas autem, accusamus atque
                    perferendis distinctio corporis.
                  </div>

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
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tab-3" && (
                <div role="tabpanel" id="panel-3">
                  <div className="grid grid-cols-3 gap-x-60">
                    {/* 第一欄：標題與圖片 */}
                    <div className="col-span-1 flex flex-col items-center justify-center space-y-6">
                      <h2 className="text-normal leading-[3rem] tracking-4 text-primary-500">
                        {CardData.name} 15位客人的評價
                      </h2>
                      <p className="text-grey-950">
                        <span className="font-bold text-red-500">5</span> /5
                        (80人已評價)
                      </p>

                      <div className="flex justify-evenly gap-4">
                        <img
                          src="/images/Frame 1000004544.png"
                          alt=""
                          className="inline-block"
                        />
                        <img
                          src="/images/Frame 1000004546.png"
                          alt=""
                          className="inline-block"
                        />
                      </div>
                    </div>

                    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full col-span-2 h-[40vh] overflow-y-scroll scrollbar scrollbar-track-primary-100 scrollbar-thumb-primary-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        {CommentaryData.map((data, index) => (
                          <div
                            key={index}
                            // onClick={() => handleCardClick(data.id)}
                            className="p-3"
                          >
                            <div className="transform space-x-0 transition-transform duration-300 hover:scale-105">
                              <CommentaryList
                                userImg={data.userImg}
                                name={data.name}
                                commentaryText={data.commentaryText}
                                date={data.date}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 第二選單 (Tab) */}
      <div className="mx-auto mt-10 w-3/4">
        <div
          role="tablist"
          className="min-h-[40px} tabs-boxed tabs flex items-center justify-start gap-4 bg-transparent"
        >
          <a
            role="tab"
            className={`tab ${currentTab === "group" ? "tab-active" : ""} border border-primary-700 text-primary-700`}
            onClick={() => setCurrentTab("group")}
          >
            團體行程開團中
          </a>
          <a
            role="tab"
            className={`tab ${currentTab === "private" ? "tab-active" : ""} border border-primary-700 text-primary-700`}
            onClick={() => setCurrentTab("private")}
          >
            預定私人行程
          </a>
          <a
            role="tab"
            className={`tab ${currentTab === "recommend" ? "tab-active" : ""} border border-primary-700 text-primary-700`}
            onClick={() => setCurrentTab("recommend")}
          >
            導演推薦景點
          </a>
        </div>
        {/* 內容區域 */}
        <div className="mt-5 grid w-full grid-cols-3 items-center gap-4">
          {/* 左側 Pagination 按鈕 */}
          <div className="flex w-full flex-col justify-center gap-2">
            {(() => {
              switch (currentTab) {
                case "group":
                  return (
                    <>
                      <div className="flex flex-col text-primary-700">
                        <p className="flex-start text-xl">
                          等你加入，現在就出發!
                        </p>

                        <img
                          src="/images/Image Group.png"
                          alt=""
                          className="inline-block p-[5vh]"
                        />

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
                      </div>
                    </>
                  );
                case "private":
                  return <></>;
                case "recommend":
                  return (
                    <>
                      <div className="text-center">
                        <p>玩樂巴黎必打卡之地!</p>

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
                      </div>
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
                        <div className="mt-10">
                          <div className="border-grey-200 flex w-full max-w-lg flex-col items-center justify-center space-y-8 border p-10">
                            <p className="text-xl">
                              除了團體行程，我們的導遊提供靈活的私人行程，採用時薪制計費，讓您可以根據自己的需求與時間安排，預訂專屬的導覽服務。
                            </p>
                            <div className="flex justify-center">
                              <Link>
                                <button className="flex w-full space-x-20 rounded-lg border border-gray-300 bg-background-2 px-4 py-4">
                                  <svg
                                    className="h-8"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="grey"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    {" "}
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                    />{" "}
                                    <rect
                                      x="4"
                                      y="5"
                                      width="16"
                                      height="16"
                                      rx="2"
                                    />{" "}
                                    <line x1="16" y1="3" x2="16" y2="7" />{" "}
                                    <line x1="8" y1="3" x2="8" y2="7" />{" "}
                                    <line x1="4" y1="11" x2="20" y2="11" />{" "}
                                    <rect x="8" y="15" width="2" height="2" />
                                  </svg>
                                  <span className="text-xl font-bold text-primary-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    需求日期
                                  </span>
                                  <svg
                                    className="h-8 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="grey"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1"
                                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                    />
                                  </svg>
                                </button>
                              </Link>
                            </div>

                            <div className="flex justify-center">
                              <Link>
                                <button className="flex w-full space-x-20 rounded-lg border border-gray-300 bg-background-2 px-4 py-4">
                                  <svg
                                    className="h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="grey"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                  <span className="text-xl font-bold text-primary-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    參加人數
                                  </span>
                                  <svg
                                    className="h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="grey"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1"
                                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                    />
                                  </svg>
                                </button>
                              </Link>
                            </div>

                            <div className="flex justify-center">
                              <Link>
                                <button className="flex w-full space-x-20 rounded-lg border border-gray-300 bg-background-2 px-4 py-4">
                                  <svg
                                    className="inline-block h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="grey"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                    />
                                  </svg>
                                  <span className="text-xl font-bold text-primary-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    參觀主題
                                  </span>
                                  <svg
                                    className="h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="grey"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="1"
                                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                    />
                                  </svg>
                                </button>
                              </Link>
                            </div>

                            <div className="flex flex-col items-center justify-center space-y-8 px-8">
                              <p className="text-2xl">您目前選擇的導遊</p>

                              <div className="flex items-center justify-center space-x-6">
                                <img
                                  src={CardData.img}
                                  alt=""
                                  className="inline-block h-20 w-20 rounded-full"
                                />
                                <p className="text-xl">{CardData.name}</p>
                              </div>

                              <button
                                className="flex w-full justify-center space-x-20 rounded-lg border border-secondary-300 bg-secondary-400 px-4 py-4 text-white"
                                onClick={handlePrivateTripsClick}
                              >
                                <p>私人行程馬上預定</p>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  case "recommend":
                    return (
                      <>
                        <div className="w-full">
                          <Slider {...settings1} arrows={false} ref={sliderRef}>
                            {SingleTripData.slice(0, 6).map((data, index) => (
                              <div key={index}>
                                <SiteCard
                                  tripName={data.tripName}
                                  imageUrl={data.imgUrl}
                                  description={data.description}
                                  date={data.date}
                                  duration={data.duration}
                                  NumPeople={data.NumPeople}
                                  price={data.price}
                                />
                              </div>
                            ))}
                          </Slider>
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

      {/* service*/}
      <div className="mt-[10rem] flex justify-center space-x-4 hover:cursor-pointer">
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[40px]"
        />
        <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
          {CardData.name} 的服務內容
        </h2>
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[40px]"
        />
      </div>

      {/* service: Grid rwd */}
      <div className="my-[80px]">
        <div className="m-auto max-w-[1296px]">
          {/* ul */}
          <div className="grid grid-cols-1 gap-10 space-y-[1%] sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">
                行程規畫建議
              </p>
              {/* <MdFlight className="text-[48px]" /> */}
              <img src="/images/organize-trips.png" alt="" />
              <p className="mt-2 text-justify text-xl tracking-1.5 text-primary-950">
                針對個人或小團體的專屬導覽行程,根據客戶需求量身定制
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">
                語言翻譯
              </p>
              {/* <MdGTranslate className="text-[48px]" /> */}
              <img src="/images/photographer.png" alt="" />

              <p className="mt-2 text-xl tracking-1.5 text-primary-950">
                提供雙語或多語導覽,並在必要時進行語言翻譯
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">
                交通協助
              </p>
              {/* <MdOutlineEmojiTransportation className="text-[48px]" /> */}
              <img src="/images/chauffeur-service.png" alt="" />
              <p className="mt-2 text-xl tracking-1.5 text-primary-950">
                協助安排機場接送、地鐵指導、出租車預訂等交通需求
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">
                美食餐廳推薦和預訂
              </p>
              {/* <MdRestaurant className="text-[48px]" /> */}
              <img src="/images/reservation-restaurants.png" alt="" />
              <p className="mt-2 text-xl tracking-1.5 text-primary-950">
                根據遊客口味推薦當地特色餐廳,並協助預訂座位
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">
                購物導覽
              </p>
              {/* <FaShoppingBag className="text-[48px]" /> */}
              <img src="/images/Group.png" alt="" />
              <p className="mt-2 text-xl tracking-1.5 text-primary-950">
                透過我們的專家帶領，發掘旅遊指南中找不到的熱點
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">
                攝影服務
              </p>
              {/* <MdAddAPhoto className="text-[48px]" /> */}
              <img src="/images/pro Photographer.png" alt="" />
              <p className="mt-2 text-xl tracking-1.5 text-primary-950">
                透提供旅途中的攝影服務,幫助遊客記錄美好瞬間
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">
                24/小時緊急支援
              </p>
              {/* <LuHelpingHand className="text-[48px]" /> */}
              <img src="/images/24-hours.png" alt="" />
              <p className="mt-2 text-xl tracking-1.5 text-primary-950">
                在旅遊期間提供全天候的緊急支援服務,確保客人安全無憂
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">
                夜間導覽
              </p>
              {/* <MdNightlight className="text-[48px]" /> */}
              <img src="/images/10005403_4344131 4.png" alt="" />
              <p className="mt-2 text-xl tracking-1.5 text-primary-950">
                提供巴黎夜景導覽,如塞納河遊船、夜間燈光秀、夜市探訪等
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* More recommaned tourguides */}
      <div className="mt-10 flex justify-center space-x-4 hover:cursor-pointer">
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[40px]"
        />
        <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
          還有下面9位導遊，等你隨時預約!
        </h2>
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[40px]"
        />
      </div>
      <div className="m-auto my-20 w-[67.5%]">
        <div className="mt-8">
          <Slider {...settings3}>
            {data.map((data, index) => (
              <div key={index} onClick={() => handleCardClick(data.id)}>
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

export default TourguideProfilePage;
