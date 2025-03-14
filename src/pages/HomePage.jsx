import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AOS from "aos";
import "aos/dist/aos.css";
import "./homepage.css";

import { motion, AnimatePresence } from "motion/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TfiHandPointRight } from "react-icons/tfi";

import data from "../data/data.json";
import DistrictsData from "../data/districts.json";
import {
  District1,
  District2,
  District3,
  District4,
  District5,
  District6,
  District7,
  District8,
  District9,
  District10,
  District11,
  District12,
  District13,
  District14,
  District15,
  District16,
  District17,
  District18,
  District19,
  District20,
} from "../data/districtData.js";
import TripsData from "../data/trips.json";
import SlidesData from "../data/slides.json";

// import component

import Card from "../components/Card";
import TourCard from "../components/tourCard.jsx";
import TripCard from "../components/TripCard";
import TourguideList from "../components/TourguideList";
import { settings3 } from "../components/helpers/sliderSettings.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const [searchQuery, setSearchQuery] = useState(""); // 存放使用者輸入的關鍵字
  const [tours, setTours] = useState([]); // 存放所有行程資料
  const [filteredTours, setFilteredTours] = useState([]); // 存放篩選後的行程

  const [postObject, setPostObject] = useState(null);
  const [postComment, setPostComment] = useState(null);
  const [postProfile, setPostProfile] = useState(null);

  const [popularTourguidesList, setPopularTourguidesList] = useState([]);

  const handleCardClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
  };

  const sliderRef = useRef(null);

  const toursSliderRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(1);

  const [toursCurrentSlide, settoursCurrentSlide] = useState(1);

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slideseToScroll: 2,
    arrows: true,
    rows: 2,
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

  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slideseToScroll: 2,
    arrows: true,
    rows: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },

      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 320,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    // pagination: {
    //   clickable: true,
    // },
    // navigation: true,
  };

  const themes = [
    "法式美食",
    "浪漫蜜月行",
    "親子家庭遊",
    "時尚購物",
    "歷史建築",
    "藝術博物館",
    "文哲學巡禮",
    "自然風光",
  ];

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [popupPosition, setPopupPosition] = useState({
    left: "10px",
    top: "10px",
  });
  const [recommendedGuides, setRecommendedGuides] = useState([]);

  // List of districts with their respective info
  // const districts = {
  //   1: (
  //     <div>
  //       {District1.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   2: (
  //     <div>
  //       {District2.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   3: (
  //     <div>
  //       {District3.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   4: (
  //     <div>
  //       {District4.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   5: (
  //     <div>
  //       {District5.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   6: (
  //     <div>
  //       {District6.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   7: (
  //     <div>
  //       {District7.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   8: (
  //     <div>
  //       {District8.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   9: (
  //     <div>
  //       {District9.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   10: (
  //     <div>
  //       {District10.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   11: (
  //     <div>
  //       {District11.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   12: (
  //     <div>
  //       {District12.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   13: (
  //     <div>
  //       {District13.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   14: (
  //     <div>
  //       {District14.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   15: (
  //     <div>
  //       {District15.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   16: (
  //     <div>
  //       {District16.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   17: (
  //     <div>
  //       {District17.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   18: (
  //     <div>
  //       {District18.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   19: (
  //     <div>
  //       {District19.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  //   20: (
  //     <div>
  //       {District20.map((district, index) => (
  //         <TourguideList
  //           key={index}
  //           name={district.name}
  //           district={district.district}
  //           img={district.img}
  //           specialities={district.specialities}
  //           language={district.language}
  //         />
  //       ))}
  //     </div>
  //   ),
  // };

  // Handler for when a district is clicked
  const handleDistrictClick = (event, district) => {
    event.preventDefault();
    let x = event.clientX;
    let y = event.clientY;
    setSelectedDistrict(district);
    console.log(x, y);

    setPopupPosition({
      left: `${x * 0.35}px`, // Offset by 3.5% of the window width
      top: `${y * 0.1}px`, // Offset by 10% of the window height
    });
    console.log(popupPosition);
    getRecommendedGuides(district);
  };

  // 根據區域呼叫後端 API
  const getRecommendedGuides = async (district) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/district/${district}`,
      );
      console.log("推薦導遊：", res.data);
      setRecommendedGuides(res.data);
    } catch (error) {
      console.error(
        "取得推薦導遊失敗：",
        error.response?.data || error.message,
      );
    }
  };

  const getPopularTourguidesList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/popular-tourguides",
      );
      setPopularTourguidesList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getToursByKeyWord = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/tours");
      setTours(res.data || []); // 確保 `tours` 是陣列
      setFilteredTours(res.data);
    } catch (error) {
      console.error("❌ 無法獲取行程資料:", error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Animation duration can be adjusted here
    // axios.get("http://localhost:3000/posts").then(function (JsonRes) {
    //   console.log(JsonRes);
    //   setPostObject(JsonRes.data[0]);
    // }, []);
    getPopularTourguidesList();
  }, []);

  useEffect(() => {
    getToursByKeyWord();
  }, []);

  // 取得所有行程
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/tours");
        console.log(res.data)
        setTours(res.data || []);
      } catch (error) {
        console.error("❌ 無法獲取行程資料:", error);
      }
    };

    fetchTours();
  }, []);

  // 監聽搜尋輸入並篩選行程
  useEffect(() => {
    if (!searchQuery) {
      setFilteredTours(tours); // 若無輸入則顯示所有行程
    } else {
      const safeSearchQuery = searchQuery || "";
      const filtered = (tours || []).filter((tour) =>
        (tour.sites || []).some((site) =>
          site.toLowerCase().includes(safeSearchQuery),
        ),
      );
      setFilteredTours(filtered);
    }
  }, [searchQuery, tours]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SlidesData.length);
    }, 3000); // 每3秒切換
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* trip themes */}
      <ul className="container hidden items-center justify-between text-base leading-[22.4px] text-grey-400 lg:flex lg:px-4 lg:py-2 xl:w-10/12 xl:justify-evenly xl:py-7">
        <li className="lg:border-r-1 xl:border-r-1 lg:border-grey-100 lg:pr-6 xl:border xl:border-y-0 xl:border-l-0 xl:px-8 xl:pr-8">
          <Link to="/" className="text-base">
            <span>法式美食</span>
          </Link>
        </li>
        <li className="border-x-1 lg:border-y-1 border border-y-0 border-r-0 border-grey-100 lg:px-6 xl:border-0 xl:px-0">
          <Link to="/">
            <span>浪漫蜜月行</span>
          </Link>
        </li>
        <li className="border-x-1 lg:border-y-1 xl:border-r-1 xl:border-l-1 border border-y-0 border-r-0 border-grey-100 lg:px-6 xl:border xl:border-y-0 xl:px-8">
          <Link to="/">
            <span>親子家庭遊</span>
          </Link>
        </li>
        <li className="border-x-1 lg:border-y-1 border border-y-0 border-r-0 border-grey-100 lg:px-6 xl:border-0 xl:px-0">
          <Link to="/">
            <span>時尚購物</span>
          </Link>
        </li>
        <li className="border-x-1 lg:border-y-1 xl:border-r-1 xl:border-l-1 border border-y-0 border-r-0 border-grey-100 lg:px-6 xl:border xl:border-y-0 xl:px-8">
          <Link to="/">
            <span>歷史建築</span>
          </Link>
        </li>
        <li className="border-x-1 lg:border-y-1 border border-y-0 border-r-0 border-grey-100 lg:px-6 xl:border-0 xl:px-0">
          <Link to="/">
            <span>藝術博物館</span>
          </Link>
        </li>
        <li className="border-x-1 lg:border-y-1 xl:border-r-1 xl:border-l-1 border border-y-0 border-r-0 border-grey-100 lg:px-6 xl:border xl:border-y-0 xl:px-8">
          <Link to="/">
            <span>文哲學巡禮</span>
          </Link>
        </li>
        <li className="border-x-1 lg:border-y-1 border border-y-0 border-r-0 border-grey-100 pr-0 lg:px-6 xl:border-0 xl:px-0">
          <Link to="/">
            <span>自然風光</span>
          </Link>
        </li>
      </ul>

      {/* <ul className="container hidden items-center justify-between text-base leading-[22.4px] text-grey-400 lg:flex lg:px-4 lg:py-2 xl:w-10/12 xl:justify-evenly xl:py-7">
  {themes.map((theme, index) => (
    <li
      key={index}
      className={`border-x-1 lg:border-y-1 border border-y-0 border-r-0 border-grey-100 lg:px-6 xl:border-0 xl:px-0
        ${index % 2 === 0 ? "xl:border-r-1 xl:border-l-1 xl:border xl:border-y-0 xl:px-8" : ""}
      `}
    >
      <Link to="/">
        <span>{theme}</span>
      </Link>
    </li>
  ))}
</ul>; */}

      {/* banner: Slides show */}
      <div className="relative overflow-hidden">
        <div className="relative flex h-[700px] w-full items-center justify-center overflow-hidden">
          <AnimatePresence>
            <motion.img
              key={index} // 每次 index 變動時，重新渲染
              src={SlidesData[index].imgUrl}
              className="absolute h-full w-full rounded-lg object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            />
          </AnimatePresence>
        </div>

        <div className="absolute left-[15vw] top-[17%] z-10 w-full md:top-[10%] xl:top-[15%] 2xl:left-[18%] 2xl:top-[17%] min-[1920px]:top-[20%]">
          <div className="flex-col text-start">
            <p className="noto-sans-tc-bold-mobile md:noto-sans-tc-bold text-shadow leading-[1.2] tracking-4 text-white shadow-black drop-shadow-2xl min-[200px]:text-2xl md:text-[40px] 2xl:text-[64px]">
              尋找你的完美巴黎旅程
            </p>

            <p className="text-shadow hidden font-bold tracking-4 text-white shadow-black drop-shadow-2xl md:block md:pt-6 md:text-lg 2xl:pt-20 2xl:text-2xl">
              輕盈漫步在巴黎的街巷。
            </p>
            <div>
              <p className="text-shadow hidden font-bold tracking-4 text-white shadow-black drop-shadow-2xl md:block md:pt-2 md:text-lg lg:pt-4 2xl:pt-10 2xl:text-2xl">
                無論你心繫歷史的脈動、美食的馨香，還是藝術的深邃，
              </p>
              <p className="text-shadow hidden font-bold tracking-4 text-white shadow-black drop-shadow-2xl md:block md:pt-0 md:text-lg 2xl:text-2xl">
                我們都為你精選了最契合靈魂的旅程。
              </p>
            </div>
            <p className="text-shadow hidden font-bold tracking-4 text-white shadow-black drop-shadow-2xl md:block md:pt-2 md:text-lg lg:pt-4 2xl:pt-10 2xl:text-2xl">
              一段符合你心之所向的旅程，正在靜靜等待與你邂逅。
            </p>

            <div className="flex items-center">
              <div className="mt-6 w-full lg:relative lg:mt-5 2xl:pt-10">
                <input
                  type="text"
                  className="-left-8 m-auto rounded-lg border border-gray-300 bg-white p-[13px] pr-10 text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-[200px]:w-8/12 md:w-6/12 lg:w-5/12 lg:pr-0 xl:h-12 xl:w-6/12 2xl:w-[35%]"
                  placeholder="尋找你的完美巴黎旅程"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // 更新關鍵字
                />
                <div className="absolute inset-y-0 right-[28vw] top-14 flex items-center rounded-r-lg bg-primary-600 p-5 md:right-[45vw] md:top-[80%] lg:right-[58vw] lg:top-0 lg:p-3 xl:right-[50vw] 2xl:top-10 min-[1536px]:right-[64vw] min-[1920px]:right-[63vw]">
                  <svg
                    className="h-4 w-4 text-white lg:h-5 lg:w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() =>
                      navigate(
                        `/search?query=${encodeURIComponent(searchQuery)}`,
                      )
                    }
                  >
                    <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 mt-16 grid grid-cols-4 grid-rows-2 gap-x-2 gap-y-2 min-[390px]:left-0 md:left-0 md:mt-4 md:w-8/12 lg:-left-3 lg:w-5/12 lg:gap-y-[1px] xl:left-0 xl:mt-0 xl:flex xl:w-6/12 xl:justify-between xl:space-x-0 min-[1920px]:w-[37.5%]">
              <button className="lg:text-shadow-light w-full rounded-xl bg-background-2 p-1 text-[13px] lg:mx-1 lg:mt-4 xl:mx-0">
                法式美食
              </button>
              <button className="lg:text-shadow-light w-full rounded-xl bg-background-2 p-1 text-[13px] lg:mx-1 lg:mt-4 xl:mx-0">
                浪漫蜜月行
              </button>
              <button className="lg:text-shadow-light w-full rounded-xl bg-background-2 p-1 text-[13px] lg:mx-1 lg:mt-4 xl:mx-0">
                親子家庭遊
              </button>
              <button className="lg:text-shadow-light w-full rounded-xl bg-background-2 p-1 text-[13px] lg:mx-1 lg:mt-4 xl:mx-0">
                時尚購物
              </button>
              <button className="lg:text-shadow-light w-full rounded-xl bg-background-2 p-1 text-[13px] lg:mx-1 lg:mt-4 xl:mx-0">
                歷史建築
              </button>
              <button className="lg:text-shadow-light w-full rounded-xl bg-background-2 p-1 text-[13px] lg:mx-1 lg:mt-4 xl:mx-0">
                藝術博物館
              </button>
              <button className="lg:text-shadow-light w-full rounded-xl bg-background-2 p-1 text-[13px] lg:mx-1 lg:mt-4 xl:mx-0">
                文哲學巡禮
              </button>
              <button className="lg:text-shadow-light w-full rounded-xl bg-background-2 p-1 text-[13px] lg:mx-1 lg:mt-4 xl:mx-0">
                自然風光
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center space-x-4 hover:cursor-pointer 2xl:mt-[80px]">
        <img
          src="https://i.imgur.com/zoB5vaQ.png"
          alt=""
          className="inline-block h-[40px]"
        />
        <h3 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600 2xl:text-[40px]">
          分區搜尋專屬導遊
        </h3>
        <img
          src="https://i.imgur.com/zoB5vaQ.png"
          alt=""
          className="inline-block h-[40px]"
        />
      </div>

      <div className="relative z-10 mt-5 2xl:mt-[60px]">
        <div className="flex items-center justify-center">
          <p className="text-1xl absolute left-[51.5%] top-[45.5%] text-secondary-700 text-white">
            4
          </p>
          <img
            src="https://i.imgur.com/wTyuAmr.png"
            useMap="#parisMap"
            alt="Paris District Map"
            data-aos="zoom-in-left"
            data-aos-easing="ease-in-sine"
          />
        </div>

        <div className="">
          {/* Display selected district info */}
          {selectedDistrict && (
            <div
              className="absolute rounded-[28px] border border-gray-300 bg-background-blur p-4 shadow-lg"
              style={{
                left: `${popupPosition.left}`,
                top: `${popupPosition.top}`,
              }}
            >
              <h3 className="space-x-2 py-6 text-xl font-bold leading-7 tracking-4 text-primary-600">
                <img
                  src="https://i.imgur.com/zoB5vaQ.png"
                  alt=""
                  className="inline-block"
                />
                <span>與{selectedDistrict}區導遊預定私人遊覽</span>
              </h3>

              <div>
                {recommendedGuides.length > 0 ? (
                  recommendedGuides.map((guide) => (
                    <TourguideList
                      key={guide._id}
                      id={guide.id}
                      name={guide.name}
                      imgUrl={guide.imgUrl}
                      themes={
                        Array.isArray(guide.themes)
                          ? guide.themes.join("、")
                          : guide.themes
                      }
                      languages={
                        Array.isArray(guide.languages)
                          ? guide.languages.join("、")
                          : guide.languages
                      }
                    />
                  ))
                ) : (
                  <p className="text-gray-500">Loading...</p>
                )}
              </div>
              <div className="mt-6 space-y-4">
                <Link to="/book-trips" className="block">
                  <button className="flex w-full justify-center rounded-2xl bg-primary-600 py-4 font-bold tracking-1.5 text-white">
                    <TfiHandPointRight className="text-2xl" />
                    <span className="ml-2">馬上預約</span>
                  </button>
                </Link>

                <Link to="sites-info" className="mt-2 block">
                  <button className="w-full rounded-2xl bg-transparent py-4 font-bold tracking-1.5 text-primary-600 outline outline-1">
                    所有{selectedDistrict}區推薦景點
                  </button>
                </Link>
              </div>
            </div>
          )}
          {/* Map for clickable areas */}
          <map name="parisMap">
            <area
              shape="poly"
              coords="536,334,531,340,527,347,523,356,524,367,531,368,539,367,547,370,561,375,567,379,577,383,584,385,592,389,600,394,609,395,616,399,623,404,637,412,631,405,646,412,646,404,643,396,643,388,647,382,650,375,643,366,635,362,625,358,617,355,607,351,595,349,588,346,582,342,574,339,567,335,558,332,547,328,539,326"
              href="#"
              onClick={(event) => handleDistrictClick(event, 1)}
              alt="Paris 1"
              className="cursor-pointer"
            />
            <area
              shape="poly"
              coords="585,303,583,310,578,319,572,327,579,332,586,334,596,339,609,340,613,346,618,343,623,349,630,353,637,353,642,356,650,357,657,351,657,345,663,338,666,331,657,325,647,321,635,316,629,314,621,311,613,307,600,306,591,303"
              href="#"
              onClick={(event) => handleDistrictClick(event, 2)}
              alt="Paris 2"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="675,333,673,342,669,349,666,356,662,365,668,376,659,372,675,376,684,382,696,394,704,394,709,398,712,405,718,407,724,410,724,399,723,390,720,379,717,367,714,358,712,350,707,344,697,341,691,335,685,333"
              href="#"
              onClick={(event) => handleDistrictClick(event, 3)}
              alt="Paris 3"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="658,381,652,387,651,403,647,397,658,406,666,411,673,414,682,415,687,421,692,428,698,433,705,439,713,441,717,447,722,452,726,458,728,447,731,441,728,431,725,422,723,415,714,410,707,407,700,401,687,395,679,389,670,386"
              href="#"
              onClick={(event) => handleDistrictClick(event, 4)}
              alt="Paris 4"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              // coords="582,399,580,409,578,414,574,421,572,430,568,437,564,449,557,452,549,451,543,455,536,459,533,466,527,470,520,476,512,479,505,484,504,492,513,494,520,498,527,501,535,502,541,506,549,507,555,514,562,516,570,518,576,521,582,522,588,526,595,523,598,513,602,500,607,492,610,479,614,471,618,462,620,453,622,445,625,435,622,426,614,418,606,412,598,406,590,403"

              coords="631,439,628,447,628,454,626,462,621,473,618,481,614,490,611,499,609,510,604,518,600,525,609,528,617,532,625,533,633,538,639,542,646,540,654,541,660,542,668,541,679,541,687,539,694,537,702,533,706,525,709,517,714,510,714,501,717,493,717,482,638,437"
              href="#"
              onClick={(event) => handleDistrictClick(event, 5)}
              alt="Paris 5"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="583,406,582,415,578,422,576,431,572,438,568,446,563,453,556,455,547,455,541,461,536,473,524,478,515,485,518,491,524,493,539,500,532,497,546,502,555,504,560,508,567,512,573,514,579,516,586,520,592,522,595,512,597,504,603,496,605,488,607,478,612,473,613,462,614,452,618,446,623,437,619,427,614,420,607,415,598,412,589,407"
              href="#"
              onClick={(event) => handleDistrictClick(event, 6)}
              alt="Paris 6"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="432,372,428,379,424,383,421,391,413,402,406,409,401,415,400,426,406,429,412,441,420,446,425,451,431,457,437,460,441,469,446,474,453,477,459,482,465,483,472,482,480,476,486,483,489,491,499,488,503,482,510,478,516,473,524,468,532,463,536,455,543,451,552,449,562,447,563,435,568,428,572,417,575,405,580,396,572,390,564,385,551,380,559,380,544,376,536,376,523,374,515,371,501,368,491,372,483,373,472,371,462,371,451,367,439,366,445,368
"
              href="#"
              onClick={(event) => handleDistrictClick(event, 7)}
              alt="Paris 7"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="407,315,407,304,412,320,413,330,414,338,417,344,422,349,429,355,439,362,446,365,452,370,463,370,470,368,478,368,487,368,498,370,507,367,514,368,514,360,517,352,522,346,525,336,530,331,533,324,537,317,541,311,543,304,546,295,543,285,545,277,542,265,542,252,542,244,539,236,532,239,522,240,511,243,502,244,494,246,484,248,474,253,464,254,456,256,448,261,441,265,431,270,422,274,415,277,412,283,406,290,409,295"
              href="#"
              onClick={(event) => handleDistrictClick(event, 8)}
              alt="Paris 8"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="550,238,551,246,552,257,551,275,552,268,552,282,552,288,551,296,548,303,544,311,543,318,540,327,534,336,530,346,525,352,526,357,520,362,532,360,539,359,544,351,551,341,559,332,565,323,574,314,579,301,575,307,589,300,598,302,605,302,613,306,619,309,628,311,641,315,635,309,641,296,642,287,645,279,646,271,650,263,650,253,650,244,650,237,644,229,636,232,631,237,621,240,612,243,602,243,594,236,586,232,576,231,567,227,559,227,551,227"
              href="#"
              onClick={(event) => handleDistrictClick(event, 9)}
              alt="Paris 9"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="652,233,654,240,658,249,655,257,657,267,655,275,653,283,653,289,650,295,647,303,654,320,649,311,660,322,667,321,670,327,677,327,684,330,691,335,699,334,706,336,714,336,723,330,729,329,742,323,750,323,756,318,763,315,771,314,765,304,756,294,748,289,746,280,744,270,741,259,741,249,742,239,737,234,725,231,715,227,708,227,699,230,690,228,679,225,670,226,661,228"
              href="#"
              onClick={(event) => handleDistrictClick(event, 10)}
              alt="Paris 10"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="717,347,721,363,722,354,726,371,728,376,731,388,732,397,733,409,737,415,739,423,740,430,744,436,752,436,761,436,765,443,772,444,778,445,785,451,794,454,803,455,811,460,821,462,827,465,836,466,842,463,849,467,859,467,867,469,867,458,865,446,860,436,857,426,850,421,840,418,836,410,833,403,826,391,826,379,821,368,815,362,807,356,800,349,793,343,788,334,780,326,776,316,770,319,763,323,754,325,746,330,737,333,730,336,722,342"
              href="#"
              onClick={(event) => handleDistrictClick(event, 11)}
              alt="Paris 11"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="739,448,736,456,735,466,740,472,740,478,743,487,748,495,754,505,759,512,764,519,771,529,775,538,785,545,790,554,796,563,801,570,806,575,810,581,815,588,822,596,827,601,835,606,837,612,843,618,853,617,864,617,872,614,884,610,892,604,884,593,881,586,884,577,890,571,897,565,902,561,908,554,914,552,923,553,932,556,940,560,945,552,945,540,945,530,948,522,949,512,951,501,954,492,952,481,943,481,934,481,923,477,913,478,905,480,893,480,884,477,874,477,866,477,858,477,848,475,840,474,833,474,822,473,813,468,803,465,795,461,787,454,776,450,764,446,757,445,748,443
"
              href="#"
              onClick={(event) => handleDistrictClick(event, 12)}
              alt="Paris 12"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="621,547,623,564,623,557,620,570,621,579,621,587,620,596,620,605,622,613,622,624,621,634,620,642,628,646,633,658,636,664,638,676,637,684,636,693,634,699,646,697,652,691,660,690,666,688,676,691,684,693,691,697,701,694,710,692,717,693,726,692,733,688,740,684,746,680,754,677,761,673,768,669,775,662,783,657,791,652,800,645,808,641,813,636,820,632,827,628,834,624,824,618,817,613,810,606,805,597,799,586,793,581,789,575,784,570,779,564,772,558,765,550,758,542,753,534,747,529,744,515,739,508,734,499,729,493,728,503,722,513,720,521,715,526,716,534,714,541,707,547,698,547,690,553,679,554,670,554,661,554,652,551,645,550,637,550,627,550"
              href="#"
              onClick={(event) => handleDistrictClick(event, 13)}
              alt="Paris 13"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="538,510,548,517,556,522,563,525,572,528,580,532,589,538,596,540,606,543,613,544,612,557,611,564,611,571,610,580,610,590,611,599,611,606,610,615,610,625,610,633,611,643,613,651,620,658,623,663,626,669,628,676,627,684,627,693,623,698,615,694,609,693,602,693,596,691,589,687,582,681,573,676,565,671,558,669,551,666,542,665,535,662,526,658,518,653,503,649,510,657,494,646,486,645,480,644,472,645,465,639,457,636,449,636,438,636,444,627,453,621,461,613,467,606,472,597,480,588,488,579,492,571,497,563,503,558,513,554,520,548,524,540,530,532,533,525,535,517"
              href="#"
              onClick={(event) => handleDistrictClick(event, 14)}
              alt="Paris 14"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="394,430,388,438,380,445,373,451,367,459,361,466,357,471,350,474,350,482,342,482,340,488,336,496,332,504,326,507,321,515,317,523,312,531,305,541,301,549,295,556,291,565,286,571,291,578,294,592,289,600,292,607,294,616,302,615,311,613,318,610,323,604,327,594,334,590,342,595,351,599,357,602,364,608,372,611,383,615,389,616,395,620,404,624,411,628,418,631,424,632,431,631,435,625,439,617,445,613,452,603,458,596,462,590,465,584,469,577,475,571,483,566,487,561,492,555,497,548,503,541,509,534,515,528,519,518,524,510,526,505,517,502,508,499,500,497,491,497,484,497,478,488,471,488,464,492,455,491,449,485,442,477,436,471,430,466,424,461,417,455,412,450,407,445,401,438"
              href="#"
              onClick={(event) => handleDistrictClick(event, 15)}
              alt="Paris 15"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="325,273,332,276,341,275,346,279,353,284,359,288,367,292,374,294,382,299,389,300,396,304,399,313,400,320,404,326,407,334,408,342,411,348,412,355,416,361,420,367,419,374,415,382,412,389,405,390,403,398,398,404,392,406,388,414,384,420,375,423,371,431,366,437,360,443,353,450,346,455,341,463,335,469,330,475,325,484,319,487,314,493,311,501,305,507,302,518,296,526,292,534,287,541,284,549,278,555,272,564,266,572,258,578,249,578,242,575,233,577,229,570,224,563,222,555,217,548,214,541,221,539,226,533,231,527,231,521,234,513,238,503,239,494,242,485,238,478,231,475,232,462,236,453,240,445,244,438,247,430,249,421,252,413,256,404,259,397,263,388,267,382,270,375,271,367,278,358,282,349,286,342,289,334,293,327,296,318,303,309,312,302,313,294,318,287,319,278"
              href="#"
              onClick={(event) => handleDistrictClick(event, 16)}
              alt="Paris 16"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="341,269,350,269,359,272,365,277,374,279,380,284,388,287,394,291,401,291,406,285,414,278,420,270,429,268,438,262,445,256,456,254,463,252,472,248,480,245,488,243,496,243,503,239,510,238,517,236,524,233,532,230,535,222,535,212,534,201,534,191,536,182,536,175,538,166,541,158,542,149,544,141,547,130,549,121,554,113,544,111,536,113,526,118,517,121,509,122,501,127,494,132,485,134,476,135,469,138,462,141,453,143,452,151,441,158,438,165,431,171,425,174,417,180,413,188,407,196,396,198,388,196,381,193,378,201,373,206,367,212,360,216,355,224,349,229,343,236,341,244,341,252,337,263"
              href="#"
              onClick={(event) => handleDistrictClick(event, 17)}
              alt="Paris 17"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="564,109,559,123,557,130,556,139,554,147,551,157,550,165,546,173,545,183,545,193,546,201,546,210,548,219,551,226,559,222,568,220,575,223,582,227,596,233,602,238,608,236,614,234,623,233,629,230,639,227,651,222,664,220,670,215,679,215,687,217,695,219,707,218,717,215,723,210,725,202,727,194,734,185,735,177,738,171,743,164,747,156,750,148,747,142,743,133,741,126,739,115,739,108,732,107,723,109,714,109,706,108,698,110,688,109,678,111,668,109,659,108,649,108,640,110,630,110,623,111,612,111,603,110,592,110,583,109,576,106
"
              href="#"
              onClick={(event) => handleDistrictClick(event, 18)}
              alt="Paris 18"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="747,111,747,121,747,129,744,137,752,142,754,150,750,158,746,167,744,176,740,183,737,192,736,201,732,213,730,221,736,225,742,230,748,233,750,239,750,247,750,256,752,264,750,273,757,278,762,285,766,292,770,300,776,305,784,304,793,302,800,299,808,297,816,293,824,288,832,287,842,287,849,287,858,286,864,285,871,286,879,284,886,279,892,275,899,272,905,270,911,265,920,262,927,256,918,252,910,248,900,242,890,236,882,233,876,228,873,222,868,215,867,207,867,200,871,192,873,184,872,175,867,168,868,159,860,147,855,141,850,134,845,128,841,122,837,117,828,119,818,114,808,114,799,114,788,115,781,114,773,113,765,111,753,109"
              href="#"
              onClick={(event) => handleDistrictClick(event, 19)}
              alt="Paris 19"
              className="cursor-pointer"
            />

            <area
              shape="poly"
              coords="789,317,796,322,799,327,804,332,808,339,813,346,819,354,824,363,829,370,834,377,839,387,839,395,841,403,842,411,850,413,859,417,866,422,870,430,872,440,876,448,876,456,879,465,883,470,891,467,899,468,918,470,908,469,924,467,929,472,937,472,944,472,952,473,954,462,954,453,954,444,955,436,958,430,955,421,951,412,945,403,945,394,944,382,944,373,944,364,944,355,944,345,945,333,945,322,945,311,943,301,939,290,936,284,933,274,931,263,926,269,916,271,910,278,902,280,896,286,888,290,880,293,872,294,863,292,855,292,845,293,837,293,831,296,825,302,819,303,811,307,802,309,794,311"
              href="#"
              onClick={(event) => handleDistrictClick(event, 20)}
              alt="Paris 20"
              className="cursor-pointer"
            />
          </map>
        </div>
      </div>

      <div>
        <img
          src="https://i.imgur.com/r1iTcL1.png"
          alt="decorations Paris sites"
        />
      </div>

      {/* slides show: popular tourist guides */}
      <div className="mt-10">
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
      </div>
      <button
              onClick={() => sliderRef.current.slickPrev()}
              className="hover:text-primary-400 p-2 text-grey-950 z-10"
            >
              <SlArrowLeft />
            </button>
      <div className=" m-auto my-20 max-w-full min-[425px]:max-w-[95%] min-[768px]:max-w-[85%] lg:max-w-[67.5%]">
        <div>
          <Slider {...settings1} arrows={false} ref={sliderRef}>
            {popularTourguidesList.map((item, index) => (
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
            ))}
          </Slider>
          <div className="flex items-center justify-center space-x-8 2xl:mt-6">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="hover:text-primary-400 p-2 text-grey-950 z-10"
            >
              <SlArrowLeft />
            </button>

            {/* 放置 pagination */}
            <div className="pagination-container text-xl font-bold text-primary-600 z-10">
              <span>{currentSlide}</span> /{" "}
              <span className="text-grey-950">{data.length}</span>
              {/* 可使用 Pagination 元件或根據 Slider 狀態自訂 */}
            </div>

            <button
              onClick={() => sliderRef.current.slickNext()}
              className="hover:text-primary-400 text-grey-950 z-10"
            >
              <SlArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* background settings */}

      <div className="bg-popular_sites relative mt-[-140px] bg-gradient-to-t from-white/80 via-white/50 to-transparent">
        <div className="hidden lg:block">
          <img
            src="https://i.imgur.com/MzjNbOk.png"
            alt=""
            className="h-[200px] w-full object-cover"
          />
          <img
            src="https://i.imgur.com/mydRBqI.png"
            alt=""
            className="h-[733px] w-full"
          />
        </div>

        <div className="mt-8 lg:absolute lg:left-[43%] lg:top-[20%] lg:mt-16">
          <div className="flex justify-center space-x-4 hover:cursor-pointer">
            <img
              src="https://i.imgur.com/zoB5vaQ.png"
              alt=""
              className="inline-block h-[40px]"
            />
            <h4 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600 2xl:text-[40px]">
              熱門旅程
            </h4>
            <img
              src="https://i.imgur.com/zoB5vaQ.png"
              alt=""
              className="inline-block h-[40px]"
            />
          </div>
        </div>

        {/* slides show: popular sites */}
        <div className="m-auto min-[425px]:max-w-[95%] md:mt-4 min-[768px]:max-w-[85%] lg:absolute lg:left-[15%] lg:top-[30%] lg:w-[68%]">
          <div className="relative mt-2 lg:mt-20">


          <button
              onClick={() => toursSliderRef.current.slickPrev()}
              className="absolute left-[-50px] top-1/2 -translate-y-1/2 hover:text-primary-400  text-grey-950 z-10 rounded-full bg-gray-200 p-4"
            >
              <SlArrowLeft size={20} />
            </button>


            <Slider {...settings2}  ref={toursSliderRef}>
              {tours.map((tour, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(tour.id)}
                  className=""
                >
                  <TripCard
                    key={tour.id}
                    imageUrl={tour.imgUrl}
                    tourName={tour.tourName}
                    date={tour.date}
                    sites={tour.sites}
                    duration={tour.duration}
                    description={tour.description}
                    price={tour.price}
                  />
                </div>
              ))}

              {/* {TripsData.map((data, index) => (
                <div key={index} className="p-4 md:p-0">
                  <div className="transform space-x-0 transition-transform duration-300 hover:scale-105">
                    <TripCard
                      tripName={data.tourName}
                      imageUrl={data.imgUrl}
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
              ))} */}
            </Slider>

            <button
              onClick={() => toursSliderRef.current.slickNext()}
              className="absolute right-[-50px] top-1/2 -translate-y-1/2 hover:text-primary-400 text-grey-950 z-10 rounded-full bg-gray-200 p-4"
            >
              <SlArrowRight size={20}/>
            </button>
          </div>
        </div>
      </div>

      {/* 預約導遊和報名行程 */}

      <div className="mb-12">
        <div className="mb-8 mt-[80px] flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="https://i.imgur.com/zoB5vaQ.png"
            alt=""
            className="inline-blockh h-[40px]"
          />
          <h5 className="text-3xl font-bold leading-[3rem] tracking-4 text-primary-600 2xl:text-[40px]">
            預約導遊和報名行程
          </h5>
          <img
            src="https://i.imgur.com/zoB5vaQ.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>

        <div className="flex flex-col items-center justify-center md:space-x-0 lg:flex lg:flex-row lg:items-stretch lg:space-x-6">
          <div className="mt-10 flex max-w-[90%] flex-col rounded-2xl border-0 md:border md:border-grey-200 lg:min-h-[1000px] lg:max-w-[34%]">
            <div className="border-1 mb-3 rounded-2xl border border-grey-200 sm:border-0">
              <span className="block rounded-t-2xl bg-primary-300 py-4 text-center text-2xl font-bold text-white lg:py-10">
                預約導遊
              </span>

              <div className="flex-1 p-2 lg:mt-10">
                <div className="grid gap-4 lg:flex lg:grid-cols-2 lg:flex-col lg:justify-between lg:gap-10 lg:space-y-10 lg:px-8">
                  <div className="flex items-center space-x-2 lg:space-x-4">
                    <img
                      src="https://i.imgur.com/1aTjRc7.png"
                      alt=""
                      className="h-[65px] min-w-[100px] object-cover lg:max-w-[200px]"
                      data-aos="zoom-in-left"
                      data-aos-easing="ease-in-sine"
                    />
                    <div
                      className="space-y-2 lg:max-w-[360px] lg:space-y-4"
                      data-aos="zoom-in-right"
                      data-aos-easing="ease-in-sine"
                    >
                      <p className="text-[14px] font-bold tracking-4 text-grey-950 lg:text-xl">
                        Step 1 瀏覽導遊資歷與專長
                      </p>
                      <p className="text-[12px] leading-[19.6px] tracking-1.5 text-grey-400 lg:text-[14px]">
                        在平台上探索各種導遊的個人檔案，了解他們的資歷、專長領域，並觀看他們的自我介紹影片。挑選最適合你需求的在地專家。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 lg:space-x-4">
                    <img
                      src="https://i.imgur.com/Urcn1PC.png"
                      alt=""
                      className="h-[65px] min-w-[100px] object-cover lg:max-w-[200px]"
                      data-aos="zoom-in-left"
                      data-aos-easing="ease-in-sine"
                    />
                    <div
                      className="space-y-2 lg:max-w-[360px] lg:space-y-4"
                      data-aos="zoom-in-right"
                      data-aos-easing="ease-in-sine"
                    >
                      <p className="text-[14px] font-bold tracking-4 text-grey-950 lg:text-xl">
                        Step 2 與導遊聯絡
                      </p>
                      <p className="text-[12px] leading-[19.6px] tracking-1.5 text-grey-400 lg:text-[14px]">
                        登入會員後，通過私訊與選定的導遊聯絡，詳細溝通你的旅行需求、預期時間和特別喜好，確保導遊能為你提供量身定制的服務。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 lg:space-x-4">
                    <img
                      src="https://i.imgur.com/5NmpdbL.png"
                      alt=""
                      className="h-[65px] min-w-[100px] object-cover lg:max-w-[200px]"
                      data-aos="zoom-in-left"
                      data-aos-easing="ease-in-sine"
                    />
                    <div
                      className="space-y-2 lg:max-w-[360px] lg:space-y-4"
                      data-aos="zoom-in-right"
                      data-aos-easing="ease-in-sine"
                    >
                      <p className="text-[14px] font-bold tracking-4 text-grey-950 lg:text-xl">
                        Step 3 開啟旅程
                      </p>
                      <p className="text-[12px] leading-[19.6px] tracking-1.5 text-grey-400 lg:text-[14px]">
                        一切確認後，準備好你的行囊，迎接一段由專業導遊帶領的難忘巴黎旅程吧！
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 mt-auto flex justify-center pb-10">
              <Link to="/search-tourguides" className="block w-full">
                <button className="m-auto mt-2 flex max-w-full justify-center rounded-2xl bg-primary-600 px-[15%] py-3 transition-colors duration-200 hover:bg-secondary-200 active:border active:border-secondary-200 active:bg-transparent">
                  <TfiHandPointRight className="text-2xl text-white" />

                  <span className="ml-2 font-bold tracking-1.5 text-white">
                    我要預約導遊
                  </span>
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-10 flex max-w-[90%] flex-col rounded-2xl border-0 md:border md:border-grey-200 lg:min-h-[1000px] lg:max-w-[34%]">
            <div className="border-1 mb-3 rounded-2xl border border-grey-200 sm:border-0">
              <span className="block rounded-t-2xl bg-secondary-300 py-4 text-center text-2xl font-bold text-white lg:py-10">
                報名行程
              </span>

              <div className="flex-1 p-2 lg:mt-10">
                <div className="grid gap-4 lg:flex lg:grid-cols-2 lg:flex-col lg:gap-10 lg:space-y-10 lg:px-8">
                  <div className="flex items-center space-x-2 lg:space-x-4">
                    <img
                      src="https://i.imgur.com/HnhEgvw.png"
                      alt=""
                      className="h-[95.43px] max-w-[100px] object-cover lg:max-w-[200px]"
                      data-aos="zoom-in-left"
                      data-aos-easing="ease-in-sine"
                    />
                    <div
                      className="space-y-2 lg:max-w-[360px] lg:space-y-4"
                      data-aos="zoom-in-right"
                      data-aos-easing="ease-in-sine"
                    >
                      <p className="text-[14px] font-bold tracking-4 text-grey-950 lg:text-xl">
                        Step 1 瀏覽行程提案
                      </p>
                      <p className="text-[12px] leading-[19.6px] tracking-1.5 text-grey-400 lg:text-[14px]">
                        在平台上瀏覽各種精心策劃的行程提案，從文化探險到美食之旅，總有一個行程能讓你心動不已。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 lg:space-x-4">
                    <img
                      src="https://i.imgur.com/siL2mH0.png"
                      alt=""
                      className="h-[95.43px] max-w-[100px] object-cover lg:max-w-[200px]"
                      data-aos="zoom-in-left"
                      data-aos-easing="ease-in-sine"
                    />
                    <div
                      className="space-y-2 lg:max-w-[360px] lg:space-y-4"
                      data-aos="zoom-in-right"
                      data-aos-easing="ease-in-sine"
                    >
                      <p className="text-[14px] font-bold tracking-4 text-grey-950 lg:text-xl">
                        Step 2 報名行程
                      </p>
                      <p className="text-[12px] leading-[19.6px] tracking-1.5 text-grey-400 lg:text-[14px]">
                        選定心儀的行程後，立即登入會員報名，確保你的名額。你還可以和其他參與者交流，分享期待與興奮。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 lg:space-x-4">
                    <img
                      src="https://i.imgur.com/H6qjFno.png"
                      alt=""
                      className="h-[95.43px] max-w-[100px] object-cover lg:max-w-[200px]"
                      data-aos="zoom-in-left"
                      data-aos-easing="ease-in-sine"
                    />
                    <div
                      className="space-y-2 lg:max-w-[360px] lg:space-y-4"
                      data-aos="zoom-in-right"
                      data-aos-easing="ease-in-sine"
                    >
                      <p className="text-[14px] font-bold tracking-4 text-grey-950 lg:text-xl">
                        Step 3 開團確認通知
                      </p>
                      <p className="text-[12px] leading-[19.6px] tracking-1.5 text-grey-400 lg:text-[14px]">
                        選定心儀的行程後，立即登入會員報名，確保你的名額。你還可以和其他參與者交流，分享期待與興奮。
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 lg:space-x-4">
                    <img
                      src="https://i.imgur.com/Q5toHw4.png"
                      alt=""
                      className="h-[95.43px] max-w-[100px] object-cover lg:max-w-[200px]"
                      data-aos="zoom-in-left"
                      data-aos-easing="ease-in-sine"
                    />
                    <div
                      className="space-y-2 lg:max-w-[360px] lg:space-y-4"
                      data-aos="zoom-in-right"
                      data-aos-easing="ease-in-sine"
                    >
                      <p className="text-[14px] font-bold tracking-4 text-grey-950 lg:text-xl">
                        Step 4 開啟旅程
                      </p>
                      <p className="text-[12px] leading-[19.6px] tracking-1.5 text-grey-400 lg:text-[14px]">
                        一切確認後，準備好你的行囊，迎接一段由專業導遊帶領的難忘巴黎旅程吧！
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 mt-auto flex justify-center pb-10">
              <Link to="/search-tourguides" className="block w-full">
                <button className="m-auto mt-2 flex max-w-full justify-center rounded-2xl bg-secondary-400 px-[15%] py-3 transition-colors duration-200 hover:bg-secondary-200 active:border active:border-secondary-200 active:bg-transparent">
                  <TfiHandPointRight className="text-2xl text-white" />
                  <span className="ml-2 font-bold tracking-1.5 text-white">
                    馬上報名行程
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Clouds decorations */}

      <div className="lg:relative lg:mb-[15%]">
        <div className="hidden lg:absolute lg:-top-6 lg:left-[1%] lg:block lg:-rotate-12">
          <img src="https://i.imgur.com/dn5n8ac.png" alt="" />
        </div>

        <div className="lg:rotate-10 hidden lg:absolute lg:right-[1%] lg:top-0 lg:block 2xl:-top-40">
          <img src="https://i.imgur.com/dn5n8ac.png" alt="" />
        </div>

        {/* Tree decorations */}
        <div className="hidden 2xl:absolute 2xl:left-16 2xl:top-[85px] 2xl:block">
          <img
            src="https://i.imgur.com/ku7iNV8.png"
            alt=""
            className="h-auto max-w-[98%]"
          />
        </div>

        <div className="hidden 2xl:absolute 2xl:right-[7%] 2xl:top-[190px] 2xl:block 2xl:-rotate-3">
          <img
            src="https://i.imgur.com/0q6kIet.png"
            alt=""
            className="h-auto max-w-[89%]"
          />
        </div>

        <div className="hidden 2xl:absolute 2xl:-top-5 2xl:right-2 2xl:block">
          <img
            src="https://i.imgur.com/Ze8tmid.png"
            alt=""
            className="h-auto max-w-[98%]"
          />
        </div>
      </div>
    </>
  );
}
