import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

import { settings3 } from "../components/helpers/sliderSettings";
import { settings4 } from "../components/helpers/sliderSettings";


function TourguideProfilePage() {


  const { id } = useParams();
  const CardData = data.find((item) => item.id === parseInt(id));
  console.log(CardData);

  if (!CardData) {
    return <div>Results not found</div>;
  }

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
      <div className="flex flex-col justify-center py-[5vh] text-3xl font-bold text-grey-950" >
        <div className="flex justify-evenly">
          {/* left: Search criteria */}
          <div className="mt-10">
            <div className="border-grey-200 flex w-full max-w-lg flex-col items-center justify-center space-y-8 border p-10">
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
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <rect x="4" y="5" width="16" height="16" rx="2" />{" "}
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
                <p className="text-xl">
                  除了團體行程，我們的導遊提供靈活的私人行程，採用時薪制計費，讓您可以根據自己的需求與時間安排，預訂專屬的導覽服務。
                </p>

                <button
                  className="flex w-full justify-center space-x-20 rounded-lg border border-secondary-300 bg-secondary-400 px-4 py-4 text-white"
                  onClick={handlePrivateTripsClick}
                >
                  <p>私人行程馬上預定</p>
                </button>
              </div>
            </div>
          </div>

          {/* right: Tourguide profile */}
          <div className="max-w-[50%]" >
            {/* title */}
            <div className="m-10 flex justify-center space-x-4 hover:cursor-pointer" id="target-section">
              <img
                src="images/vector_title.png"
                alt=""
                className="inline-block h-[40px]"
              />
              <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
                您的專屬導遊 : {CardData.name}
              </h2>
              <img
                src="images/vector_title.png"
                alt=""
                className="inline-block h-[40px]"
              />
            </div>
            <img
              src=
    
              
              {CardData.img}
              
              alt=""
              className="object-center-30 inline-block max-h-[640.31px] w-full rounded-3xl object-cover"
            />
            <div className="py-10">
              <div className="my-4 flex justify-between">
                <div className="flex space-x-2">
                  <button className="inline-block rounded-full border border-secondary-300 px-5">
                    <p className="text-xl text-secondary-600">
                      {CardData.speciality1}
                    </p>
                  </button>
                  <button className="inline-block rounded-full border border-secondary-300 px-5">
                    <p className="text-xl text-secondary-600">
                      {CardData.speciality2}
                    </p>
                  </button>
                  <button className="inline-block rounded-full border border-secondary-300 px-5">
                    <p className="text-xl text-secondary-600">
                      {CardData.speciality3}
                    </p>
                  </button>
                </div>

                <div className="flex flex-col">
                  <span>大人 {CardData.price}€ /小時</span>
                  <span>兒童 {CardData.price - 3}€ /小時</span>
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
                  onClick={handleSendMessageClick}
                >
                  <p>留言給{CardData.name}</p>
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
                    src="images/website_logo.png"
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
              </div>
            </div>
          </div>
        </div>
        {/* single trip title */}
        <div className="mt-10 flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            {CardData.name} 的定點深度導覽
          </h2>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        {/* single trips : Grid*/}
        <div className="m-auto my-20 grid max-w-[75%] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>

        {/* thematic trip title */}
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            {CardData.name} 的主題式導覽行程
          </h2>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>
        {/* thematic trips : Grid*/}

        <div className="m-auto my-20 grid max-w-[75%] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
        </div>

        {/* service*/}
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            {CardData.name} 的服務內容
          </h2>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>


{/* service : flex rwd */}
{/* <div className="my-[80px] py-[1%]">
          <div className="m-auto mb-[5%] max-w-[1296px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-6">
              <div className="flex flex-col items-center justify-center">
                <p className="py-5 text-2xl font-bold tracking-4 text-primary-500">
                  行程規畫建議
                </p>
                <MdFlight className="text-[48px]"/>

                <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                  針對個人或小團體的專屬導覽行程,根據客戶需求量身定制
                </p>
              </div>
              <div className="flex h-full max-w-[240px] flex-col items-center justify-center space-y-2">
                <p className="py-5 text-2xl font-bold tracking-4 text-primary-500">
                  語言翻譯
                </p>
                <MdGTranslate className="text-[48px]"/>
                <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                  提供雙語或多語導覽,並在必要時進行語言翻譯,幫助遊客與當地人交流
                </p>
              </div>
              <div className="flex h-full max-w-[240px] flex-col items-center justify-center space-y-2">
                <p className="py-5 text-2xl font-bold tracking-4 text-primary-500">
                  交通協助
                </p>
                <MdOutlineEmojiTransportation className="text-[48px]"/>
                <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                  協助安排機場接送、地鐵指導、出租車預訂等交通需求
                </p>
              </div>
              <div className="flex h-full max-w-[240px] flex-col items-center justify-center space-y-2">
                <p className="py-5 text-2xl font-bold tracking-4 text-primary-500">
                  美食餐廳推薦和預訂
                </p>
                <MdRestaurant className="text-[48px]"/>
                <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                  根據遊客口味推薦當地特色餐廳,並協助預訂座位
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-6">
              <div className="flex h-full max-w-[240px] flex-col items-center justify-center space-y-2">
                <p className="py-5 text-2xl font-bold tracking-4 text-primary-500">
                  購物導覽
                </p>
                <FaShoppingBag className="text-[48px]"/>
                <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                  透過我們的專家帶領，發掘旅遊指南中找不到的熱點
                </p>
              </div>
              <div className="flex h-full max-w-[240px] flex-col items-center justify-center space-y-2">
                <p className="py-5 text-2xl font-bold tracking-4 text-primary-500">
                  攝影服務
                </p>
                <MdAddAPhoto className="text-[48px]"/>
                <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                  透提供旅途中的攝影服務,幫助遊客記錄美好瞬間
                </p>
              </div>
              <div className="flex h-full max-w-[240px] flex-col items-center justify-center space-y-2">
                <p className="py-5 text-2xl font-bold tracking-4 text-primary-500">
                  24/小時緊急支援
                </p>
                <LuHelpingHand className="text-[48px]"/>
                <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                  在旅遊期間提供全天候的緊急支援服務,確保客人安全無憂
                </p>
              </div>
              <div className="flex h-full max-w-[240px] flex-col items-center justify-center space-y-2">
                <p className="py-5 text-2xl font-bold tracking-4 text-primary-500">
                  夜間導覽
                </p>
                <MdNightlight className="text-[48px]"/>

                <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                  提供巴黎夜景導覽,如塞納河遊船、夜間燈光秀、夜市探訪等
                </p>
              </div>
            </div>
          </div>
        </div> */}



{/* service: Grid rwd */}
<div className="my-[80px] ">
  <div className="m-auto  max-w-[1296px]">
      {/* ul */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10  space-y-[1%]">

      <div className="flex flex-col items-center justify-center ">
        <p className="py-5 text-2xl font-bold  tracking-4 text-primary-700">行程規畫建議</p>
        <MdFlight className="text-[48px]" />
        <p className="mt-2 text-xl tracking-1.5 text-primary-950 text-justify">
          針對個人或小團體的專屬導覽行程,根據客戶需求量身定制
        </p>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <p className="py-5 text-2xl font-bold tracking-4 text-primary-700 ">語言翻譯</p>
        <MdGTranslate className="text-[48px]" />
        <p className="mt-2 text-xl tracking-1.5 text-primary-950">
          提供雙語或多語導覽,並在必要時進行語言翻譯
        </p>
      </div>

      <div className="flex flex-col items-center justify-center ">
        <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">交通協助</p>
        <MdOutlineEmojiTransportation className="text-[48px]" />
        <p className="mt-2 text-xl tracking-1.5 text-primary-950">
          協助安排機場接送、地鐵指導、出租車預訂等交通需求
        </p>
      </div>

      <div className="flex flex-col items-center justify-center ">
        <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">美食餐廳推薦和預訂</p>
        <MdRestaurant className="text-[48px]" />
        <p className="mt-2 text-xl tracking-1.5 text-primary-950">
          根據遊客口味推薦當地特色餐廳,並協助預訂座位
        </p>
      </div>

      <div className="flex flex-col items-center justify-center ">
        <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">購物導覽</p>
        <FaShoppingBag className="text-[48px]" />
        <p className="mt-2 text-xl tracking-1.5 text-primary-950">
          透過我們的專家帶領，發掘旅遊指南中找不到的熱點
        </p>
      </div>

      <div className="flex flex-col items-center justify-center ">
        <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">攝影服務</p>
        <MdAddAPhoto className="text-[48px]" />
        <p className="mt-2 text-xl tracking-1.5 text-primary-950">
          透提供旅途中的攝影服務,幫助遊客記錄美好瞬間
        </p>
      </div>

      <div className="flex flex-col items-center justify-center ">
        <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">24/小時緊急支援</p>
        <LuHelpingHand className="text-[48px]" />
        <p className="mt-2 text-xl tracking-1.5 text-primary-950">
          在旅遊期間提供全天候的緊急支援服務,確保客人安全無憂
        </p>
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <p className="py-5 text-2xl font-bold tracking-4 text-primary-700">夜間導覽</p>
        <MdNightlight className="text-[48px]" />
        <p className="mt-2 text-xl tracking-1.5 text-primary-950">
          提供巴黎夜景導覽,如塞納河遊船、夜間燈光秀、夜市探訪等
        </p>
      </div>
    </div>
  </div>
</div>

{/* Commentary title */}
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            {CardData.name} 15位客人的評價
          </h2>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>
        <div className="m-auto my-20 w-full md:w-[85%] lg:w-[75%] xl:w-[67.5%]">
          <div className="mt-8">
            <Slider {...settings3}>
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
            </Slider>
          </div>
        </div>
        {/* More recommaned tourguides */}
        <div className="flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            還有下面9位導遊，等你隨時預約!
          </h2>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>
        <div className="m-auto my-20 w-[67.5%]">
          <div className="mt-8">
            <Slider {...settings3}>
              {data.map((data, index) => (
                <div
                  key={index}
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
      </div>
    </>
  );
}

export default TourguideProfilePage;
