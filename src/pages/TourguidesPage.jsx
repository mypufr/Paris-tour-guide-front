import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navbar, Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";


import data from "../data/data.json"

function TourguidesPage() {
  const slides = [
    {
      url: "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1520503652613-5a55d772ec77?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1504896287989-ff1fbde00199?q=80&w=2533&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1501622549218-2c3ef86627cb?q=80&w=2373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      url: "https://images.unsplash.com/photo-1528535619428-a995242b9096?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="group relative m-auto w-full py-16 sm:h-[300px] md:h-[700px] lg:h-[780px]">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="relative h-full w-full bg-cover bg-center duration-500"
        >
          <div className="absolute left-[33%] top-[10%]">
            <h1 className="noto-sans-tc-bold py-3 leading-[1.2] text-white drop-shadow-lg">
              尋找你的專屬在地導遊
            </h1>
            {/* Search options */}
            <div className="mt-10 flex justify-center">
              <div className="relative w-full max-w-lg space-y-8">
                <div className="flex justify-center">
                  <Link>
                    <button className="flex w-full space-x-20 rounded-lg border border-gray-300 bg-background-2 px-4 py-4">
                      <svg
                        className="h-8 w-8"
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
                        className="h-8 w-8 text-red-500"
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
                        className="h-8 w-8"
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
                        className="h-8 w-8"
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
                        className="inline-block h-8 w-8"
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
                        className="h-8 w-8"
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
              </div>
            </div>
            {/* Search Button */}
            <div className="mt-10">
              <Link to="/search-tourguides/search-results">
                <button className="absolute bottom-[-10%] left-[32%] flex w-[35%] rounded-3xl bg-primary-500 py-3">
                  <div className="relative flex-grow">
                    <span className="text-xl font-bold text-white">
                      立即搜尋
                    </span>
                    <svg
                      className="absolute right-3 top-1 inline-block h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>

        <div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>

        <div className="top-4 flex justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="cursor-pointer text-2xl"
            ></div>
          ))}
        </div>
      </div>

        <Outlet />
      <div className="flex justify-center space-x-4 hover:cursor-pointer">
        <img
          src="../../src/assets/image/vector_title.png"
          alt=""
          className="inline-block h-[40px]"
        />
        <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
          特色服務
        </h2>
        <img
          src="../../src/assets/image/vector_title.png"
          alt=""
          className="inline-block h-[40px]"
        />
      </div>

      <div className="my-[80px] py-[1%]">
        <div className="m-auto mb-[5%] max-w-[1296px]">
          <ul className="flex justify-evenly">
            <li className="flex h-full max-w-[240px] flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-grey-950">
                100%私人導覽
              </p>
              <img
                src="../../src/assets/image/step-1-1.png"
                alt=""
                className="block object-cover"
              />
              <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                享受完全專屬於您的私人導遊體驗，不會與其他遊客分享導遊。
              </p>
            </li>
            <li className="flex h-full max-w-[240px] flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-grey-950">
                客製化行程
              </p>
              <img
                src="../../src/assets/image/step-1-1.png"
                alt=""
                className="block object-cover"
              />
              <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                根據您的興趣和需求，設計出 完全符合您個人偏好的獨特行程
              </p>
            </li>
            <li className="flex h-full max-w-[240px] flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-grey-950">
                獲取當地視角
              </p>
              <img
                src="../../src/assets/image/step-1-1.png"
                alt=""
                className="block object-cover"
              />
              <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                透過我們的專家帶領，發掘旅遊指南中找不到的熱點
              </p>
            </li>
            <li className="flex h-full max-w-[240px] flex-col items-center justify-center">
              <p className="py-5 text-2xl font-bold tracking-4 text-grey-950">
                彈性取消政策
              </p>
              <img
                src="../../src/assets/image/step-1-1.png"
                alt=""
                className="block object-cover"
              />
              <p className="mt-2 flex-grow py-3 text-justify text-xl tracking-1.5 text-primary-950">
                無論是計劃有變,還是臨時有事，您都可以輕鬆取消或更改預訂，而不會產生任何額外費用
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TourguidesPage;
