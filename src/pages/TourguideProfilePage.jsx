import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { UserContext } from "../../context/userContext";

import {
  addPrivateOrder,
  setGroupOrdersInfo,
} from "../store/reducers/orderSlice.jsx";

import data from "../data/data.json";
import SiteCard from "../components/SiteCard";
import CommentaryList from "../components/CommentaryList";
import Card from "../components/Card";
import TourCard from "../components/tourCard";
import ResponsiveTabs from "../components/ReponsiveTabs.jsx";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-day-picker/dist/style.css";

import AOS from "aos";
import "aos/dist/aos.css";

import { FaFacebook } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TfiHandPointRight } from "react-icons/tfi";

import { DayPicker } from "react-day-picker";
import DatePicker from "react-datepicker";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import TourguideList from "../components/TourguideList";

import { zhTW } from "date-fns/locale";


function TourguideProfilePage() {
  const { user, setUser } = useContext(UserContext);

  const [toursSlidesLength, setToursSlidesLength] = useState(0);
  const [sitesSlidesLength, setSitesSlidesLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tab-1");
  const [currentTab, setCurrentTab] = useState("group");
  const [currentSlide, setCurrentSlide] = useState(1);
  const [date, setDate] = useState(null);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const [commentary, setCommentary] = useState("");
  const [tourguideInfo, setTourguideInfo] = useState("");

  const [sites, setSites] = useState([]);
  const [tourguideInfoById, setTourguideInfoById] = useState("");
  const [tours, setTours] = useState([]);

  const [selectedTime, setSelectedTime] = useState(null);

  const [availableSlots, setAvailableSlots] = useState([]); // 從 API 獲取的時段
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const [selectedTheme, setSelectedTheme] = useState("");

  const [email, setEmail] = useState("");
  const [senderName, setSenderName] = useState("");

  const [message, setMessage] = useState("");

  const [popularTourguidesList, setPopularTourguidesList] = useState([]);

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slideseToScroll: 2,
    arrows: true,
    rows: 1,
    afterChange: (index) => setCurrentSlide(index + 1),
    adaptiveHeight: true,
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

  const settings5 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex + 1),
  };

  const targetRef = useRef(null); 
  const sliderRef = useRef(null);

  const messageModalRef = useRef(null);
  const successModalRef = useRef(null);
  const loginModalRef = useRef(null);

  const secondSliderRef = useRef(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAlertLogin = () => {
    document.getElementById("alertLogin_modal").showModal();
    navigate("/login");
  };

  const handleEditMessageClick = () => {
    if (!user) {
      // alert("請先登入!");

      // navigate("/login");
      document.getElementById("alertLogin_modal").showModal();
    } else {
      document.getElementById("message_modal").showModal();
    }
  };

  const handleSendMessageClick = async () => {
    if (!message.trim()) {
      alert("請輸入留言內容！");
      return;
    }

    try {
      console.log(message, tourguideInfoById._id);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/messages`,
        {
          tourguideName: tourguideInfoById.name,
          email: email,
          senderName: senderName,
          message: message, // 傳送留言內容
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("留言成功", res.data);

      document.getElementById("message_modal")?.close(); // 關閉 Modal

      setMessage(""); // 清空輸入框
      setSenderName(""); // 清空寄件者名稱
      setEmail(""); // 清空 Email
      document.getElementById("sendMessageSuccess_modal").showModal(); // 關閉 Modal
    } catch (error) {
      console.error("留言失敗", error.res?.data || error.message);
    }
  };

  const handleCloseModal = () => {
    document.getElementById("message_modal")?.close();
  };

  // const handleCardClick = (id) => {
  //   navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
  //   // navigate(`/search-tourguides/tourguide-profile/${id}`);
  // };

  const handlePrivateTripsClick = (id) => {
    console.log(user);
    if (!user) {
      console.error("❌ user is undefined! 確保 user 已經載入:", user);

      document.getElementById("alertLogin_modal").showModal();

      return;
    }

    if (!selectedDate) {
      document.getElementById("alertDate_modal").showModal();
      return;
    }
    if (!selectedSlot) {
      document.getElementById("alertSlot_modal").showModal();
      return;
    }
    if (!selectedTheme) {
      document.getElementById("alertTheme_modal").showModal();
      return;
    }
    if (!adultCount && !childCount) {
      document.getElementById("alertPeopleNum_modal").showModal();
      return;
    }

    dispatch(
      addPrivateOrder({
        userEmail: user.email,
        userName: user.username,
        selectedDate,
        selectedSlot,
        adultCount,
        childCount,
        selectedTheme,
        tourguideInfo: tourguideInfoById,
      }),
    );
    navigate(
      `/search-tourguides/tourguide-profile/${id}/private-trips/confirm-order`,
    );
  };

  // const handleGroupOrder = () => {
  //   dispatch(
  //     setGroupOrdersInfo({
  //       selectedDate,
  //       adultCount,
  //       childCount,
  //       selectedTour: "",
  //       tourguideInfo: tourguideInfoById,
  //       tourInfo: {},
  //     })
  //   );
  // };

  const getCommentaries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/commentaries`);
      // console.log(res.data);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };

  const getTourguideInfo = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tourguideInfo`);
      // console.log(res.data);
      setTourguideInfo(res.data.data);
    } catch (error) {
      console.error("Error fetching tour guide data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTourguideInfoById = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/tourguideInfo/${id}`,
      );
      // console.log(res.data);
      setTourguideInfoById(res.data);
      setAvailableSlots(res.data.available_slots);
    } catch (error) {
      console.error("Error fetching tour guide data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTours = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tours`);
      console.log(res.data); // array
      setTours(res.data);

      setToursSlidesLength(res.data.length);
      // console.group(res.data);
    } catch (error) {
      console.error("Error fetching tour guide data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSites = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sites`);
      // console.log(res.data);
      setSites(res.data);
      setSitesSlidesLength(res.data.length);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };

  const getPopularTourguidesList = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/popular-tourguides`,
        {
          withCredentials: true,
        },
      );
      setPopularTourguidesList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredSlots = date
    ? availableSlots.filter(
        (slot) => slot.date === date.toISOString().split("T")[0],
      )
    : [];

  const handleSelectTime = (time, slot) => {
    setSelectedTime(time);
    console.log("選擇的時段:", slot.date, time);

    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" }); // 2. 觸發滾動
    }

    if (!time || !slot) {
      setSelectedSlot(""); // 清空預約時段
      return;
    }
    setSelectedDate(slot.date);
    setSelectedSlot(time);
  };

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

  // 減少人數
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

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

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
    AOS.init({ duration: 1000 }); // Animation duration can be adjusted here
    getSites();
    getTourguideInfoById();
    getTours();
  }, [id]);

  useEffect(() => {
    if (filteredSlots.length === 0) {
      setSelectedSlot("");
      setSelectedDate("");
    }
  }, [filteredSlots]);

  useEffect(() => {
    console.log(user);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser._id) {
      setUser(storedUser);
    }
    getPopularTourguidesList();
  }, []);

  return (
    <>
      <div
        className="flex  max-h-[640px] justify-center py-[2vh] text-3xl font-bold text-grey-950"
        id="target-section"
      >
        <div className="w-full bg-primary-50 py-4 md:py-11 ">
          <div className="mx-auto w-full md:w-3/4">
            <div className="flex flex-col justify-center gap-6 md:flex-row md:justify-evenly">
              <div className="w-full md:w-auto">
                <div className="sm:mb-[60px] flex items-center justify-center space-x-2 hover:cursor-pointer">
                  <img
                    src="/images/vector_title.png"
                    alt=""
                    className="inline-block h-[30px]"
                  />
                  <h2 className="text-[24px] font-bold text-primary-600 md:text-[28px]">
                    你的專屬導遊 : {tourguideInfoById.name}
                  </h2>
                  <img
                    src="/images/vector_title.png"
                    alt=""
                    className="inline-block h-[30px]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-[2vw] px-4 md:grid-cols-2 md:px-11">
                  <div className="col-span-1 flex justify-center">
                    <img
                      src={tourguideInfoById.imgUrl}
                      alt=""
                      className="object-center-30 inline-block h-[40vh] max-h-[421px] sm:w-full rounded-xl object-cover"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col items-center md:justify-around gap-2">
                    <div className="flex space-x-2">
                      {tourguideInfoById?.themes?.length > 0 && (
                        <span className="text-xl text-[#324561]">
                          {tourguideInfoById.themes.join("、")}
                        </span>
                      )}
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
                      <p className="text-sm text-grey-400">80人已評價{}</p>
                    </div>

                    <div className="flex space-x-2">
                      {tourguideInfoById?.languages?.map((language, index) => (
                        <button
                          key={index}
                          className="inline-block rounded-full bg-background-2 px-5"
                        >
                          <p className="text-[13px] text-grey-600">
                            {language}
                          </p>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center sm:flex-col gap-2">
                      <span className="text-xl text-primary-800">大人 </span>
                      <span className="text-base text-grey-650">
                        {tourguideInfoById.price_adult}€ /小時
                      </span>
                    </div>

                    <div className="flex items-center sm:flex-col gap-2 ">
                      <span className="text-xl text-primary-800">兒童 </span>
                      <span className="text-base text-grey-650">
                        {" "}
                        {tourguideInfoById.price_child}€ /小時
                      </span>
                    </div>

                    <button
                      className="hover:text-grey-500 mt-14 sm:mt-2 flex w-3/4 justify-center rounded-2xl bg-primary-600 px-[15%] py-3 transition-colors duration-200 hover:bg-primary-200 active:border active:border-gray-500"
                      onClick={() => handleEditMessageClick()}
                    >
                      <img
                        src="images/BsHandIndex.svg"
                        alt=""
                        className="inline-block"
                      />
                      <TfiHandPointRight className="text-2xl text-white" />
                      <span className="ml-2 text-base text-white">
                        留言給{tourguideInfoById.name}
                      </span>
                    </button>

                    <dialog id="message_modal" className="modal">
                      <div className="modal-box bg-primary-50">
                        <h3 className="text-lg font-normal text-primary-500">
                          留言給{" "}
                          <span className="text-secondary-700">
                            {tourguideInfoById.name}
                          </span>
                          導遊
                        </h3>

                        <p className="text-end text-base font-normal text-grey-950">
                          <span className="text-xl font-bold text-red-400">
                            *
                          </span>
                          為必填{" "}
                        </p>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessageClick();
                          }}
                        >
                          <div className="flex flex-col gap-4 p-4">
                            <div className="">
                              <label className="input input-bordered flex items-center gap-2">
                                <span className="text-xl font-bold text-red-400">
                                  *
                                </span>
                                姓名
                                <input
                                  type="text"
                                  placeholder="請輸入您的姓名"
                                  className="grow"
                                  value={senderName}
                                  onChange={(e) =>
                                    setSenderName(e.target.value)
                                  }
                                  required
                                />
                              </label>
                              <label className="input input-bordered flex items-center gap-2">
                                <span className="text-xl font-bold text-red-400">
                                  *
                                </span>
                                電子郵件信箱
                                <input
                                  type="email"
                                  className="grow"
                                  placeholder="請輸入您的電子郵件信箱"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                              </label>
                            </div>

                            <span className="label-text-alt text-end text-primary-600">
                              必填
                            </span>
                            <textarea
                              className="input-border input mt-[-10px] w-full grow rounded-lg border p-2 text-lg font-bold text-gray-700 placeholder:label-text"
                              placeholder="您的留言..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                            />
                          </div>

                          <div className="modal-action">
                            <button
                              className="btn btn-outline border-primary-200 text-primary-700"
                              onClick={handleCloseModal}
                            >
                              取消
                            </button>

                            <button type="submit" className="btn btn-primary">
                              送出
                            </button>
                          </div>
                        </form>
                      </div>
                    </dialog>

                    <dialog
                      id="alertLogin_modal"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box space-y-2">
                        <h3 className="text-lg font-bold">請先登入!</h3>
                        <p className="py-4 text-lg font-normal"></p>
                        <div className="modal-action">
                          <form method="dialog" className="flex gap-4">
                            <button
                              className="btn bg-primary-700 text-primary-700 text-white"
                              onClick={() => navigate("/login")}
                            >
                              <span>登入</span>
                            </button>
                            <button className="btn btn-outline text-secondary-600">
                              <span>取消</span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>

                    <dialog
                      id="sendMessageSuccess_modal"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box space-y-2">
                        <h3 className="text-lg font-bold">留言成功!</h3>
                        <p className="py-4 text-lg font-normal"></p>
                        <div className="modal-action">
                          <form method="dialog" className="flex gap-4">
                            <button className="btn bg-primary-700 text-primary-700 text-white">
                              <span>查看所有留言</span>
                            </button>
                            <button className="btn btn-outline text-secondary-600">
                              <span>我知道了</span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative lg:mb-[15%]">
              <div className="hidden md:absolute md:-bottom-[6rem] md:left-[-15%] md:block md:-rotate-12">
                <img src="https://i.imgur.com/dn5n8ac.png" alt="" />
              </div>

              <div className="rotate-10 absolute hidden md:-top-[26rem] md:right-[-10%] md:block">
                <img src="https://i.imgur.com/dn5n8ac.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
{/* 
<ResponsiveTabs /> */}
  
      {/* tab */}
      <div className="flex pt-20">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full">
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
                        ? "120px"
                        : "245px",
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
                導遊簡介
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
            <div className="relative mt-4 rounded-3xl">
              {activeTab === "tab-1" && (
                <div role="tabpanel" id="panel-1">
                  <div className="">
                    <div className="py-2">
                      {/* Profile description */}
                      <div className="grid border-spacing-1 grid-cols-3 space-y-4 border border-primary-200 px-4 pt-6">
                        <div className="col-span-2 h-[50vh]">
                          <div className="my-6 flex items-center space-x-6">
                            <img
                              src="/images/website_logo.png"
                              alt=""
                              className="inline-block h-[30px]"
                            />
                            <h3 className="text-xl font-bold leading-[3rem] tracking-4 text-primary-600">
                              關於{tourguideInfoById.name}
                            </h3>
                          </div>

                          <div className="h-[35vh] overflow-y-scroll p-1 scrollbar scrollbar-track-primary-100 scrollbar-thumb-primary-500">
                            <p className="bg-white px-2 text-xl">
                              {" "}
                              {tourguideInfoById.profile}
                            </p>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="flex items-center justify-center space-x-6 pt-4">
                            <img
                              src="/images/website_logo.png"
                              alt=""
                              className="inline-block h-[30px]"
                            />
                            <h4 className="text-xl font-bold leading-[3rem] tracking-4 text-primary-600">
                              {tourguideInfoById.name}的連結
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
                <div role="tabpanel" id="panel-2" className="border-t-2 pl-4">
                  <div
                    // popoverTarget="rdp-popover"
                    className="my-10 grid grid-cols-2 text-xl font-bold text-primary-300"
                    style={{ anchorName: "--rdp" }}
                  >
                    <div className="col-span-1 flex pb-[1rem]">
                      <div
                        popover="auto"
                        id="rdp-popover"
                        className="dropdown mt-[5vh]"
                        style={{ positionAnchor: "--rdp" }}
                      >
                        {/* <DayPicker
                          className="react-day-picker rounded-xl border border-primary-200 bg-white p-6 shadow-lg"
                          numberOfMonths={1}
                          classNames={{
                            day: "items-center justify-center text-lg hover:bg-gray-200 rounded-full",
                          }}
                          mode="single"
                          selected={date}
                          onSelect={(d) =>
                            setDate(new Date(d.setHours(12, 0, 0, 0)))
                          } // 確保時區不變
                        /> */}
                        <DayPicker
                          className="react-day-picker rounded-xl border border-primary-200 bg-white p-6 shadow-lg"
                          numberOfMonths={1}
                          classNames={{
                            day: "items-center justify-center text-lg hover:bg-gray-200 rounded-full",
                          }}
                          mode="single"
                          selected={date}
                          onSelect={(d) =>
                            setDate(new Date(d.setHours(12, 0, 0, 0)))
                          } // 確保時區不變
                          minDate={
                            new Date(
                              new Date().setDate(new Date().getDate() + 2),
                            )
                          } // 限制三天後才可選擇
                        />
                      </div>
                    </div>

                    {/* 顯示可用時段 */}
                    <ul className="col-span-1 mt-2">
                      {filteredSlots.length > 0 ? (
                        filteredSlots.map((slot, index) => (
                          <div key={index} className="my-2 w-full space-y-6">
                            <p className="text-xl font-semibold">
                              {slot.date}可預約的空檔:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {slot.time.map((timeSlot, timeIndex) => (
                                <button
                                  key={timeIndex}
                                  className="rounded-lg bg-gray-400 px-4 py-2 font-normal text-white hover:bg-blue-600"
                                  onClick={() =>
                                    handleSelectTime(timeSlot, slot)
                                  }
                                >
                                  ⏰ {timeSlot}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <li className="text-center text-2xl text-red-500">
                          ⚠️ 無可預約時段
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "tab-3" && (
                <div
                  role="tabpanel"
                  id="panel-3"
                  className="overflow-hidden border-t-2"
                >
                  <div className="flex max-w-full gap-10">
                    {/* 第一欄：標題與圖片 */}
                    <div className="flex w-full flex-col items-center justify-center">
                      <h2 className="text-base leading-[3rem] tracking-4 text-primary-600">
                        <span className="text-grey-950">
                          {tourguideInfoById.name}
                        </span>{" "}
                        10位客人的評價
                      </h2>
                      <p className="text-grey-400">
                        <span className="pr-2 text-xl font-bold text-red-500">
                          4
                        </span>
                        / 5 (80人已評價)
                      </p>

                      <div className="flex justify-center gap-4 p-4">
                        <img
                          src="/images/Frame 1000004544.png"
                          alt=""
                          className="h-auto max-w-full object-contain"
                        />
                        <img
                          src="/images/Frame 1000004546.png"
                          alt=""
                          className="h-auto max-w-full object-contain"
                        />
                      </div>
                    </div>

                    {/* 第二欄：評論列表 */}
                    <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full h-[520px] w-3/4 overflow-y-scroll scrollbar scrollbar-track-primary-100 scrollbar-thumb-primary-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        {tourguideInfoById.commentaries.map(
                          (comment, index) => (
                            <div key={index} className="p-3">
                              <div className="transform transition-transform duration-300 hover:scale-105">
                                <CommentaryList
                                  userImg={data.userImg}
                                  name={comment.user}
                                  commentaryText={comment.comment}
                                  date={comment.date}
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                      {commentary}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 第二選單 (Tab) */}
      <div className="mx-auto w-3/4">
        <div
          role="tablist"
          className="min-h-[40px} tabs-boxed tabs mt-5 flex items-center justify-start gap-4 bg-transparent"
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
                      <div className="flex flex-col text-primary-600">
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
                            <span className="text-grey-950">
                              {toursSlidesLength}
                            </span>
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
                      <div className="flex flex-col text-primary-600">
                        <p
                          className="flex-start text-xl"
                          data-aos="zoom-in"
                          data-aos-offset="300"
                          data-aos-easing="ease-in-sine"
                        >
                          玩樂巴黎必打卡之地!
                        </p>

                        <img
                          src="/images/Paris_by_dist.png"
                          alt=""
                          className="inline-block p-[5vh]"
                          data-aos="zoom-in"
                          data-aos-offset="300"
                          data-aos-easing="ease-in-sine"
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
                            <span className="text-grey-950">
                              {sitesSlidesLength}
                            </span>
                            {/* 可使用 Pagination 元件或根據 Slider 狀態自訂 */}{" "}
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
                        <div
                          className="w-full"
                          data-aos="zoom-in"
                          data-aos-offset="300"
                          data-aos-easing="ease-in-sine"
                        >
                          <Slider
                            {...settings1}
                            arrows={false}
                            ref={sliderRef}
                            className=""
                          >
                            {tours.map((tour, index) => (
                              <div key={index}>
                                <TourCard
                                  tourName={tour.tourName}
                                  imageUrl={tour.imgUrl}
                                  description={tour.description}
                                  date={tour.date.slice(0, 1)}
                                  sites={tour.sites.slice(0, 3)}
                                  duration={tour.duration}
                                  price={tour.price}
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </>
                    );
                  case "private":
                    return (
                      <div className="flex" ref={targetRef} id="target-section">
                        <div className="mt-10 w-full">
                          <div className="col-span-1 flex w-[38vw] flex-col items-center justify-center space-y-8 border border-grey-200 p-10">
                            <p className="text-xl">
                              除了團體行程，我們的導遊提供靈活的私人行程，採用時薪制計費，讓您可以根據自己的需求與時間安排，預訂專屬的導覽服務。
                            </p>

                            <div className="mt-4 flex min-w-[400px] justify-center px-4 lg:mt-0">
                              <Link>
                                <button
                                  className="flex w-[32vw] items-center justify-between space-x-20 rounded-lg border border-gray-300 bg-background-2 px-4 py-4"
                                  onClick={() =>
                                    document
                                      .getElementById("calendar_modal")
                                      .showModal()
                                  }
                                >
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
                                  <div className="flex flex-col items-center">
                                    <p className="text-md font-bold text-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                      出發日期:
                                      <span className="font-normal">
                                        {" "}
                                        {selectedDate}
                                      </span>
                                    </p>
                                    <p className="text-md font-bold text-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                      預約時段:
                                      <span className="font-normal">
                                        {" "}
                                        {selectedSlot}
                                      </span>
                                    </p>
                                  </div>
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
                              className="modal modal-bottom mx-auto h-[80vh] w-1/2 bg-white sm:modal-middle"
                            >
                              <div
                                className="grid grid-cols-2 bg-white text-xl font-bold text-primary-300"
                                style={{ anchorName: "--rdp" }}
                              >
                                <div className="flex">
                                  <div
                                    popover="auto"
                                    id="rdp-popover"
                                    className="dropdown"
                                    style={{ positionAnchor: "--rdp" }}
                                  >
                                    <DayPicker
                                      className="react-day-picker rounded-xl border border-primary-200 bg-white p-4 shadow-lg"
                                      numberOfMonths={1}
                                      classNames={{
                                        day: "items-center justify-center text-lg hover:bg-gray-200 rounded-full",
                                      }}
                                      mode="single"
                                      selected={date}
                                      onSelect={(d) =>
                                        setDate(
                                          new Date(d.setHours(12, 0, 0, 0)),
                                        )
                                      } // 確保時區不變
                                    />
                                  </div>
                                </div>
                                <ul className="">
                                  {filteredSlots.length > 0 ? (
                                    filteredSlots.map((slot, index) => (
                                      <div
                                        key={index}
                                        className="w-full space-y-6"
                                      >
                                        <p className="text-center text-xl font-semibold">
                                          {slot.date}可預約的空檔:
                                        </p>
                                        <div className="flex flex-wrap justify-start gap-2">
                                          {slot.time.map(
                                            (timeSlot, timeIndex) => (
                                              <button
                                                key={timeIndex}
                                                className="rounded-lg bg-gray-400 p-2 text-sm text-white hover:bg-blue-600"
                                                onClick={() =>
                                                  handleSelectTime(
                                                    timeSlot,
                                                    slot,
                                                  )
                                                }
                                              >
                                                {timeSlot}
                                              </button>
                                            ),
                                          )}
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <>
                                      <li className="text-center text-2xl text-red-500">
                                        ⚠️ 無可預約時段
                                      </li>
                                    </>
                                  )}
                                </ul>
                              </div>

                              <div></div>

                              {/* 已選日期顯示 */}
                              <div className="text-center">
                                {selectedDate && selectedSlot ? (
                                  <p className="text-lg text-grey-600">
                                    選擇的日期：
                                    {new Date(selectedDate).toLocaleDateString(
                                      "zh-TW",
                                      {
                                        month: "numeric",
                                        day: "numeric",
                                      },
                                    )}
                                    ，選擇的時段：
                                    <span className="font-bold text-primary-600">
                                      {selectedSlot}
                                    </span>
                                  </p>
                                ) : (
                                  <p className="text-lg text-gray-400">
                                    請選擇日期和時段
                                  </p>
                                )}
                              </div>

                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="btn">確認</button>
                                </form>
                              </div>
                            </dialog>

                            {/* 人數選擇 */}

                            <div className="mt-4 flex justify-center px-4 lg:mt-0">
                              <Link>
                                <button
                                  className="flex w-[32vw] items-center justify-between space-x-20 rounded-lg border border-gray-300 bg-background-2 px-4 py-4"
                                  onClick={() =>
                                    document
                                      .getElementById("touristNum_modal")
                                      .showModal()
                                  }
                                >
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
                                  <span className="text-base text-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-xl lg:font-bold">
                                    {adultCount || childCount ? (
                                      <p className="text-primary-700">
                                        <span className="text-base">
                                          {adultCount}位大人
                                          {"、"}
                                          {childCount}位小孩
                                        </span>
                                      </p>
                                    ) : (
                                      <p className="text-base text-primary-700">
                                        參加人數
                                      </p>
                                    )}
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

                            <dialog
                              id="touristNum_modal"
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="flex flex-col items-center space-y-8 rounded-lg bg-white p-20">
                                <h2 className="text-xl font-bold text-primary-700">
                                  選擇人數
                                </h2>

                                <div className="flex items-center space-x-4 rounded-lg border bg-white p-2 shadow-md">
                                  <button
                                    onClick={decreaseAdultCount}
                                    className="rounded-lg bg-gray-200 px-3 py-2 text-lg font-bold hover:bg-gray-300"
                                  >
                                    −
                                  </button>

                                  <span className="text-xl font-semibold text-gray-800">
                                    {adultCount}位大人
                                  </span>

                                  <button
                                    onClick={increaseAdultCount}
                                    className="rounded-lg bg-blue-500 px-3 py-2 text-lg font-bold text-white hover:bg-blue-600"
                                  >
                                    +
                                  </button>
                                </div>

                                <div className="flex items-center space-x-4 rounded-lg border bg-white p-2 shadow-md">
                                  <button
                                    onClick={decreaseChildCount}
                                    className="rounded-lg bg-gray-200 px-3 py-2 text-lg font-bold hover:bg-gray-300"
                                  >
                                    −
                                  </button>

                                  <span className="text-xl font-semibold text-gray-800">
                                    {childCount}位小孩
                                  </span>

                                  <button
                                    onClick={increaseChildCount}
                                    className="rounded-lg bg-blue-500 px-3 py-2 text-lg font-bold text-white hover:bg-blue-600"
                                  >
                                    +
                                  </button>
                                </div>

                                <p className="m-2 p-2 text-gray-600">
                                  目前選擇{" "}
                                  <span className="font-bold text-primary-600">
                                    {adultCount}位大人、 {childCount}位小孩
                                  </span>{" "}
                                </p>
                                <div className="modal-action">
                                  <form method="dialog">
                                    <button className="btn">確認</button>
                                  </form>
                                </div>
                              </div>
                            </dialog>

                            {/* 行程主題 */}

                            <div className="mt-4 flex justify-center px-4 lg:mt-0">
                              <Link>
                                <button
                                  className="flex w-[32vw] items-center justify-between space-x-20 rounded-lg border border-gray-300 bg-background-2 px-4 py-4"
                                  onClick={() =>
                                    document
                                      .getElementById("theme_modal")
                                      .showModal()
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
                                  <span className="text-primary-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:text-xl lg:font-bold">
                                    {selectedTheme ? (
                                      <p className="text-primary-700">
                                        <span className="text-base">
                                          {selectedTheme}
                                        </span>
                                      </p>
                                    ) : (
                                      <p className="text-base text-primary-700">
                                        行程主題
                                      </p>
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
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="grid grid-cols-2 rounded-lg bg-white p-10">
                                <h2 className="col-span-2 mb-4 text-lg font-bold text-primary-600">
                                  選擇行程主題
                                </h2>

                                {/* 選擇主題的選項 */}

                                {tourguideInfoById.themes.map(
                                  (theme, index) => (
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
                                  ),
                                )}

                                <div className="modal-action">
                                  <form method="dialog">
                                    <div className="mx-auto flex gap-4">
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
                              </div>
                            </dialog>

                            <div className="flex flex-col items-center justify-center space-y-8 px-8">
                              <p className="text-2xl">您目前選擇的導遊</p>

                              <div className="flex items-center justify-center space-x-6">
                                <img
                                  src={tourguideInfoById.imgUrl}
                                  alt=""
                                  className="inline-block h-20 w-20 rounded-full"
                                />
                                <p className="text-xl">
                                  {tourguideInfoById.name}
                                </p>
                              </div>

                              <button
                                className="flex w-full justify-center space-x-20 rounded-lg border border-secondary-300 bg-secondary-400 px-4 py-4 text-white transition-colors duration-200 hover:bg-secondary-200 active:border-secondary-200"
                                onClick={() =>
                                  handlePrivateTripsClick(tourguideInfoById.id)
                                }
                              >
                                <p>私人行程馬上預定</p>
                              </button>
                            </div>
                            {/* alertLogin_modal */}
                            <dialog
                              id="alertLogin_modal"
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="modal-box space-y-2">
                                <h3 className="text-lg font-bold">請先登入!</h3>
                                <p className="py-4 text-lg font-normal"></p>
                                <div className="modal-action">
                                  <form method="dialog" className="flex gap-4">
                                    <button
                                      className="btn bg-primary-700 text-primary-700 text-white"
                                      onClick={() => navigate("/login")}
                                    >
                                      <span>登入</span>
                                    </button>
                                    <button className="btn btn-outline text-secondary-600">
                                      <span>取消</span>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                            {/* alertDate_modal */}
                            <dialog
                              id="alertDate_modal"
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="modal-box space-y-2">
                                <h3 className="text-lg font-bold">
                                  請選擇日期!
                                </h3>
                                <p className="py-4 text-lg font-normal"></p>
                                <div className="modal-action">
                                  <form method="dialog" className="flex gap-4">
                                    <button className="btn btn-outline text-secondary-600">
                                      <span>我知道了</span>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                            {/* alertSlot_modal */}
                            <dialog
                              id="alertLogin_modal"
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="modal-box space-y-2">
                                <h3 className="text-lg font-bold">
                                  請選擇時段!
                                </h3>
                                <p className="py-4 text-lg font-normal"></p>
                                <div className="modal-action">
                                  <form method="dialog" className="flex gap-4">
                                    <button className="btn btn-outline text-secondary-600">
                                      <span>我知道了</span>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </dialog>

                            {/* alertTheme_modal */}
                            <dialog
                              id="alertTheme_modal"
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="modal-box space-y-2">
                                <h3 className="text-lg font-bold">
                                  請選擇行程主題!
                                </h3>
                                <p className="py-4 text-lg font-normal"></p>
                                <div className="modal-action">
                                  <form method="dialog" className="flex gap-4">
                                    <button className="btn btn-outline text-secondary-600">
                                      <span>我知道了</span>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </dialog>

                            {/* alertPeopleNum_modal */}
                            <dialog
                              id="alertLogin_modal"
                              className="modal modal-bottom sm:modal-middle"
                            >
                              <div className="modal-box space-y-2">
                                <h3 className="text-lg font-bold">
                                  請至少選擇一位參加人數！
                                </h3>
                                <p className="py-4 text-lg font-normal"></p>
                                <div className="modal-action">
                                  <form method="dialog" className="flex gap-4">
                                    <button className="btn btn-outline text-secondary-600">
                                      <span>我知道了</span>
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                          </div>
                        </div>
                      </div>
                    );
                  case "recommend":
                    return (
                      <>
                        <div className="w-full">
                          <Slider {...settings1} arrows={false} ref={sliderRef}>
                            {sites.map((site, index) => (
                              <div key={index}>
                                <SiteCard
                                  siteName={site.siteName}
                                  imageUrl={site.imgUrl}
                                  description={site.description}
                                  date={site.date.slice(0, 1)}
                                  duration={site.duration}
                                  NumPeople={site.NumPeople}
                                  price={site.price}
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

      {/* service: Grid rwd */}
      <div className="">
        <div className="my-[80px] bg-[url('https://i.imgur.com/mydRBqI.png')] bg-cover bg-center py-20">
          <div className="mb-[60px] flex items-center justify-center space-x-2 hover:cursor-pointer">
            <img
              src="/images/vector_title.png"
              alt=""
              className="inline-block h-[30px]"
            />
            <h2 className="text-[28px] font-bold text-primary-600">服務內容</h2>
            <img
              src="/images/vector_title.png"
              alt=""
              className="inline-block h-[30px]"
            />
          </div>

          <div className="m-auto mt-10 max-w-[1296px]">
            <div className="mx-auto w-3/4">
              {/* ul */}

              <div className="grid grid-cols-1 gap-10 space-y-[1%] sm:grid-cols-2 lg:grid-cols-4">
                <div
                  className="flex flex-col items-center justify-between rounded-lg border border-transparent bg-white p-5 text-center shadow-md"
                  data-aos="zoom-in"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <p className="py-5 text-[16px] font-bold tracking-4 text-gray-500">
                    行程規畫建議
                  </p>

                  <img src="/images/organize-trips.png" alt="" />
                  <p className="mt-2 text-justify text-[14px] tracking-1.5 text-grey-400">
                    針對個人或小團體的專屬導覽行程,根據客戶需求量身定制
                  </p>
                </div>

                <div
                  className="flex flex-col items-center justify-between rounded-lg border border-transparent bg-white p-5 text-center shadow-md"
                  data-aos="zoom-in"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <p className="py-5 text-[16px] font-bold tracking-4 text-gray-500">
                    語言翻譯
                  </p>

                  <img src="/images/photographer.png" alt="" />
                  <p className="mt-2 text-justify text-[14px] tracking-1.5 text-grey-400">
                    提供雙語或多語導覽,並在必要時進行語言翻譯,幫助遊客與當地人交流
                  </p>
                </div>

                <div
                  className="flex flex-col items-center justify-between rounded-lg border border-transparent bg-white p-5 text-center shadow-md"
                  data-aos="zoom-in"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <p className="py-5 text-[16px] font-bold tracking-4 text-gray-500">
                    交通協助
                  </p>

                  <img src="/images/chauffeur-service.png" alt="" />
                  <p className="mt-2 text-justify text-[14px] tracking-1.5 text-grey-400">
                    協助安排機場接送、地鐵指導、出租車預訂等交通需求
                  </p>
                </div>

                <div
                  className="flex flex-col items-center justify-between rounded-lg border border-transparent bg-white p-6 text-center shadow-md"
                  data-aos="zoom-in"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <p className="py-5 text-[16px] font-bold tracking-4 text-gray-500">
                    美食餐廳預訂
                  </p>

                  <img
                    src="/images/reservation-restaurants.png"
                    alt=""
                    className="h-[60px]"
                  />
                  <p className="mt-2 text-justify text-[14px] tracking-1.5 text-grey-400">
                    根據遊客口味推薦當地特色餐廳,並協助預訂座位
                  </p>
                </div>

                <div
                  className="flex flex-col items-center justify-between rounded-lg border border-transparent bg-white p-5 text-center shadow-md"
                  data-aos="zoom-in"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <p className="py-5 text-[16px] font-bold tracking-4 text-gray-500">
                    購物導覽
                  </p>

                  <img src="/images/Group.png" alt="" />
                  <p className="mt-2 text-justify text-[14px] tracking-1.5 text-grey-400">
                    透過我們的專家帶領,發掘旅遊指南中找不到的熱點
                  </p>
                </div>

                <div
                  className="flex flex-col items-center justify-between rounded-lg border border-transparent bg-white p-5 text-center shadow-md"
                  data-aos="zoom-in"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <p className="py-5 text-[16px] font-bold tracking-4 text-gray-500">
                    攝影服務
                  </p>

                  <img src="/images/pro Photographer.png" alt="" />
                  <p className="mt-2 text-justify text-[14px] tracking-1.5 text-grey-400">
                    透提供旅途中的攝影服務,幫助遊客記錄美好瞬間
                  </p>
                </div>

                <div
                  className="flex flex-col items-center justify-between rounded-lg border border-transparent bg-white p-5 text-center shadow-md"
                  data-aos="zoom-in"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <p className="py-5 text-[16px] font-bold tracking-4 text-gray-500">
                    24/小時緊急支援
                  </p>

                  <img src="/images/24-hours.png" alt="" />
                  <p className="mt-2 text-justify text-[14px] tracking-1.5 text-grey-400">
                    在旅遊期間提供全天候的緊急支援服務,確保客人安全無憂
                  </p>
                </div>

                <div
                  className="flex flex-col items-center justify-between rounded-lg border border-transparent bg-white p-5 text-center shadow-md"
                  data-aos="zoom-in"
                  data-aos-offset="300"
                  data-aos-easing="ease-in-sine"
                >
                  <p className="py-5 text-[16px] font-bold tracking-4 text-gray-500">
                    夜間導覽
                  </p>

                  <img src="/images/10005403_4344131 4.png" alt="" />
                  <p className="mt-2 text-justify text-[14px] tracking-1.5 text-grey-400">
                    提供巴黎夜景導覽,如塞納河遊船、夜間燈光秀、夜市探訪等
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More recommaned tourguides */}
      <div
        className="mb-[20px] flex items-center justify-center space-x-2 hover:cursor-pointer"
        id="target-section"
      >
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[30px]"
        />
        <h2 className="text-md font-bold tracking-4 text-primary-600 2xl:text-[40px] 2xl:leading-[3rem]">
          還有下面{popularTourguidesList.length}位導遊，等你隨時預約!
        </h2>
        <img
          src="/images/vector_title.png"
          alt=""
          className="inline-block h-[30px]"
        />
      </div>

      <div className="my- m-auto w-3/4">
        <div className="m-auto mb-20 max-w-full min-[425px]:max-w-[95%] min-[768px]:max-w-[85%] lg:max-w-[67.5%]">
          <div>
            <Slider {...settings1} arrows={false} ref={sliderRef}>
              {popularTourguidesList.map((item, index) => (
                <div
                  key={index}
                  // onClick={() => handleCardClick(item.id)}
                  className=""
                >
                  <Card
                    key={index}
                    id={item.id}
                    imgSrc={item.imgUrl}
                    title={item.name}
                    price={item.price_adult}
                    themes={item.themes}
                    // onClick={() => handleCardClick(item.id)}
                    className="cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
            <div className="mt-6 flex items-center justify-center space-x-8 2xl:mt-6">
              <button
                onClick={() => sliderRef.current.slickPrev()}
                className="hover:text-primary-400 z-10 p-2 text-grey-950"
              >
                <SlArrowLeft />
              </button>

              <div className="pagination-container z-10 text-xl font-bold text-primary-600">
                <span>{currentSlide}</span> /{" "}
                <span className="text-grey-950">
                  {popularTourguidesList.length}
                </span>
              </div>

              <button
                onClick={() => sliderRef.current.slickNext()}
                className="hover:text-primary-400 z-10 text-grey-950"
              >
                <SlArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex items-center justify-center space-x-8 2xl:mb-[8rem]">
        <button
          onClick={() => secondSliderRef.current.slickPrev()}
          className="hover:text-primary-400 p-2 text-grey-950"
        >
          <SlArrowLeft />
        </button>


        <div className="pagination-container text-xl font-bold text-primary-600">
          <span>{currentSlide}</span> /{" "}
  {data.length}
        </div>

        <button
          onClick={() => secondSliderRef.current.slickNext()}
          className="hover:text-primary-400 text-grey-950"
        >
          <SlArrowRight />
        </button>
      </div> */}
    </>
  );
}

export default TourguideProfilePage;
