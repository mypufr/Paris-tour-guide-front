import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

import { UserContext } from "../../context/userContext";

import "./homepage.css";

import { motion, AnimatePresence } from "motion/react";
import SlidesData from "../data/slidesSearchTourguidesPage.json";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import DatePicker from "react-datepicker";
import { zhTW } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../utils/i18n";
import { useTranslation } from "react-i18next";

function SearchTourguidesPage() {
  const [index, setIndex] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const [selectedTheme, setSelectedTheme] = useState("行程主題");
  const [selectedGuides, setSelectedGuides] = useState([]);


  const increaseAdultCount = () => {
    if (adultCount < 10) {
      setAdultCount(adultCount + 1);
    }
  };

  const increaseChildCount = () => {
    if (childCount < 10) {
      setChildCount(childCount + 1);
    }
  };


  const decreaseAdultCount = () => {
    if (adultCount >= 1) {
      setAdultCount(adultCount - 1);
    }
  };

  const decreaseChildCount = () => {
    if (childCount >= 1) {
      setChildCount(childCount - 1);
    }
  };

  const navigate = useNavigate();

  const handleSearchClick = async () => {
    const queryParams = new URLSearchParams({
      startDate: startDate ? startDate.toISOString().split("T")[0] : "",
      endDate: endDate ? endDate.toISOString().split("T")[0] : "",
      theme: selectedTheme,
    }).toString();

    try {
      const res = await axios.get(
        `http://localhost:8000/api/guides?theme=${selectedTheme}`,
      );
      console.log(res);
      setSelectedGuides(res.data);
    } catch (error) {
      console.error("❌ 無法獲取導遊:", error.response?.data || error.message);
    }

    navigate(`/search-tourguides/search-results?${queryParams}`);
  };

  const handleThemeChange = async (event) => {
    const newTheme = event.target.value;
    setSelectedTheme(newTheme);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/guides?theme=${newTheme}`,
      );
      console.log(res.data);
      setSelectedGuides(res.data);

      const handleSearchClick = async () => {
        const queryParams = new URLSearchParams({
          startDate: startDate ? startDate.toISOString().split("T")[0] : "",
          endDate: endDate ? endDate.toISOString().split("T")[0] : "",
          theme: selectedTheme,
        }).toString();

        try {
          const res = await axios.get(
            `http://localhost:8000/api/guides?theme=${selectedTheme}`,
          );
          console.log(res);
          setSelectedGuides(res.data);
          navigate(`/search-tourguides/search-results?${queryParams}`);

        } catch (error) {
          console.error(
            "❌ 無法獲取導遊:",
            error.response?.data || error.message,
          );
        }
      };
    } catch (error) {
      console.error("❌ 無法獲取導遊:", error.response?.data || error.message);
    }
  };

  const { t } = useTranslation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.getItem("user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SlidesData.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        className="group relative m-auto h-[680px] w-full py-0 md:h-[500px] lg:h-[780px]"
        id="target-section"
      >
        <img
          src="/images/background_popular_sites_cutted.png"
          alt=""
          className="absolute inset-0 h-[750px] w-full object-cover object-top"
          style={{
            maskImage:
              "linear-gradient(to center, transparent 5%, black 100%))",
            WebkitMaskImage:
              "linear-gradient(to center, transparent 5%, black 100%",
          }}
        />

        <div className="wave-mask relative top-20 flex h-[700px] w-full items-center justify-center overflow-hidden">
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

        <div
          className={`absolute left-[15%] top-[20%] max-w-[70vw] md:left-[25%] md:top-[15%] lg:top-[30%] ${i18n.language === "fr" ? "lg:left-[35rem]" : ""} ${i18n.language === "en" ? "lg:left-[30rem]" : ""} ${i18n.language === "中文" ? "lg:left-[40rem]" : ""} `}
        >
          <h1
            className={`noto-sans-tc-bold-mobile md:noto-sans-tc-bold text-shadow leading-[1.2] tracking-4 text-white shadow-black drop-shadow-2xl min-[200px]:text-2xl md:text-[40px] 2xl:text-[64px]`}
          >
            {t("title")}
          </h1>

          {/* Search options */}
          <div className="mt-2 lg:mt-10">
            <div className="my-6 flex flex-col justify-center lg:mt-10 lg:flex-row lg:space-x-8">
              <div className="relative mt-10 w-full max-w-lg space-y-3 lg:space-y-8">
                <div className="mt-4 flex min-w-[400px] justify-center px-4 lg:mt-0">
                  <Link>
                    <button
                      className="flex w-[19vw] items-center justify-between rounded-lg border border-gray-300 bg-white p-1 lg:space-x-20 lg:px-1 lg:py-4"
                      onClick={() =>
                        document.getElementById("calendar_modal").showModal()
                      }
                    >
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

                      <span className="text-base text-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-xl lg:font-bold">
                        {startDate && endDate ? (
                          <p className="flex flex-col justify-center text-primary-700">
                            <span className="text-base">
                              {startDate.toLocaleDateString()} 出發
                            </span>

                            <span className="text-base">
                              {endDate.toLocaleDateString()} 離開
                            </span>
                          </p>
                        ) : (
                          <p className="text-gray-400">{t("dateRange")}</p>
                        )}
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

                <dialog
                  id="calendar_modal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box bg-white">
                    <h3 className="text-lg font-bold text-primary-700">
                      {" "}
                      請選擇日期範圍
                    </h3>
                    <div className="flex justify-center py-4">
                      <DatePicker
                        className=""
                        locale={zhTW}
                        selected={startDate}
                        onChange={(update) => {
                          setDateRange(update);
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        monthsShown={2}
                        inline
                        calendarClassName="flex gap-6 bg-primary-50 rounded-lg  border-none"
                        minDate={
                          new Date(new Date().setDate(new Date().getDate() + 2))
                        } 
                      />
                    </div>


                    <div className="text-center">
                      {startDate && endDate ? (
                        <p className="text-grey-600">
                          選擇的日期範圍：
                          <span className="font-bold text-primary-600">
                            {startDate.toLocaleDateString("zh-TW", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                            -{" "}
                            {endDate.toLocaleDateString("zh-TW", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </p>
                      ) : (
                        <p className="text-gray-400">請選擇開始和結束日期</p>
                      )}
                    </div>
                    <div className="modal-action">
                      <form method="dialog">
                        <button className="btn">確認</button>
                      </form>
                    </div>
                  </div>
                </dialog>



       



                <div className="mt-4 flex justify-center px-4 lg:mt-0">
                  <Link>
                    <button
                      className="flex w-[19vw] items-center justify-between rounded-lg border border-gray-300 bg-white p-1 lg:space-x-20 lg:px-1 lg:py-4"
                      onClick={() =>
                        document.getElementById("theme_modal").showModal()
                      }
                    >
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
                      <span className="text-base text-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-xl lg:font-bold">
                        {selectedTheme ? (
                          <p className="text-gray-400">
                            <span className="text-[20px]">
                              {/* {selectedTheme} */}
                              {t("search")}
                            </span>
                          </p>
                        ) : (
                          <p className="text-gray-400"></p>
                        )}
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

                <dialog
                  id="theme_modal"
                  className="modal fixed top-[30vh] m-auto h-[50vh] max-w-sm rounded-lg bg-white p-6"
                >
                  <div className="grid grid-cols-2 rounded-lg bg-white p-10">
                    <h2 className="col-span-2 mb-4 text-lg font-bold text-primary-600">
                      選擇行程主題
                    </h2>

                    {/* 選擇主題的選項 */}

                    {[
                      "法式美食",
                      "浪漫蜜月行",
                      "親子家庭遊",
                      "時尚購物",
                      "歷史建築",
                      "藝術博物館",
                      "文哲學巡禮",
                      "自然風光",
                    ].map((theme, index) => (
                      <div key={index} className="form-control">
                        <label className="label flex cursor-pointer items-center space-x-2">
                          <input
                            type="radio"
                            name="theme-radio"
                            className="radio checked:bg-primary-500"
                            value={theme}
                            checked={selectedTheme === theme}
                            onChange={handleThemeChange}
                          />
                          <span className="label-text w-full text-left">
                            {theme}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="modal-action text-center">
                    <form method="dialog" className="inline-block">
                      <div className="flex justify-center gap-4">
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => setSelectedTheme("")}
                        >
                          取消
                        </button>

                        <button className="btn bg-primary-200 text-primary-600">
                          確認
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-2 lg:mt-8">
            {/* <Link to="/search-tourguides/search-results"> */}
            <button
              className="absolute left-[25%] flex min-w-[50%] rounded-3xl bg-primary-500 py-3 lg:bottom-[-15%] lg:left-[30%] lg:min-w-[40%]"
              onClick={handleSearchClick}
            >
              <div className="relative flex-grow">
                <span className="pr-2 text-[13px] font-bold text-white lg:pr-4 lg:text-xl">
                  {t("quickSearch")}
                </span>
                <svg
                  className="absolute right-3 top-1 inline-block h-6 w-6 pl-1 text-white"
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

          </div>
        </div>
      </div>

      <div className="my-4 flex justify-center space-x-2 hover:cursor-pointer lg:my-10">
        <img
          src="https://i.imgur.com/zoB5vaQ.png"
          alt=""
          className="inline-block h-6 lg:h-[40px]"
        />
        <h2 className="text-2xl font-bold tracking-4 text-primary-600 lg:text-[40px]">
          特色服務
        </h2>
        <img
          src="https://i.imgur.com/zoB5vaQ.png"
          alt=""
          className="inline-block h-6 lg:h-[40px]"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="m-auto mb-[5%] max-w-[1296px]">
          <ul className="lg: grid gap-6 md:grid-cols-2 md:gap-20 lg:grid-cols-3 xl:flex xl:justify-between">
            <li
              className="flex h-full max-w-[240px] flex-col items-center justify-center"
              data-aos="zoom-out"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine"
            >
              <p className="py-5 text-xl font-bold tracking-4 text-grey-950 lg:text-2xl">
                100%私人導覽
              </p>
              <img
                src="https://images.unsplash.com/photo-1609126133105-5c00c5cdd30f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="block h-[200px] rounded-xl object-cover"
              />
              <p className="mt-2 flex-grow py-3 text-justify text-sm tracking-1.5 text-primary-950 lg:text-xl">
                享受完全專屬於您的私人導遊體驗，不會與其他遊客分享導遊。
              </p>
            </li>
            <li
              className="flex h-full max-w-[240px] flex-col items-center justify-center"
              data-aos="zoom-out"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine"
            >
              <p className="py-5 text-xl font-bold tracking-4 text-grey-950 lg:text-2xl">
                客製化行程
              </p>
              <img
                src="https://images.unsplash.com/photo-1473969631237-f466cf342b1f?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="block h-[200px] rounded-xl object-cover"
              />
              <p className="mt-2 flex-grow py-3 text-justify text-sm tracking-1.5 text-primary-950 lg:text-xl">
                根據您的興趣和需求，設計出 完全符合您個人偏好的獨特行程
              </p>
            </li>
            <li
              className="flex h-full max-w-[240px] flex-col items-center justify-center"
              data-aos="zoom-out"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine"
            >
              <p className="py-5 text-xl font-bold tracking-4 text-grey-950 lg:text-2xl">
                獲取當地視角
              </p>
              <img
                src="https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="block h-[200px] rounded-xl object-cover"
              />
              <p className="mt-2 flex-grow py-3 text-justify text-sm tracking-1.5 text-primary-950 lg:text-xl">
                透過我們的專家帶領，發掘旅遊指南中找不到的熱點
              </p>
            </li>
            <li
              className="flex h-full max-w-[240px] flex-col items-center justify-center"
              data-aos="zoom-out"
              data-aos-offset="100"
              data-aos-easing="ease-in-sine"
            >
              <p className="py-5 text-xl font-bold tracking-4 text-grey-950 lg:text-2xl">
                彈性取消政策
              </p>
              <img
                src="https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="block h-[200px] rounded-xl object-cover"
              />
              <p className="mt-2 flex-grow py-3 text-justify text-sm tracking-1.5 text-primary-950 lg:text-xl">
                無論是計劃有變,還是臨時有事，您都可以輕鬆取消或更改預訂，而不會產生任何額外費用
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SearchTourguidesPage;
