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
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const adultCount = queryParams.get("adultCount");
  const childCount = queryParams.get("childCount");
  const theme = queryParams.get("theme");

  const [tourguideInfo, setTourguideInfo] = useState([]);
  const [selectedGuides, setSelectedGuides] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");

  const themes = [
    "歷史建築",
    "藝術博物館",
    "文史哲巡禮",
    "時尚購物",
    "親子家庭遊",
    "自然風光",
    "浪漫蜜月行",
  ];

  // const [currentPage, setCurrentPage] = useState(1);

  // const itemsPerPage = 6; //設定每頁顯示筆數

  const navigate = useNavigate();


  const handleCardClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
  };

  const getTourguideInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/tourguideInfo`);

      setTourguideInfo(res.data.data); // 確保是陣列
      setSelectedGuides(res.data.data);
      setSelectedTheme(""); // 清除主題選擇
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };

  const getSelectedGuides = async (theme) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/guides?theme=${theme}`,
      );
      console.log(res);
      setSelectedGuides(res.data);

    } catch (error) {
      console.error("❌ 無法獲取導遊:", error.response?.data || error.message);
    }
  };

  const handleThemeClick = async (theme) => {
    setSelectedTheme(theme); // 更新選擇的主題
    try {
      const res = await axios.get(
        `http://localhost:8000/api/guides?theme=${theme}`,
      );
      console.log(`🔍 ${theme} 的導遊:`, res.data);
      setSelectedGuides(res.data); // 更新導遊列表
    } catch (error) {
      console.error("❌ 無法獲取導遊:", error.response?.data || error.message);
    }
  };

  useEffect(() => {

if(theme){
  setSelectedTheme(theme);
  getSelectedGuides(theme);
} else {
  getTourguideInfo();
}
  }, [theme]);

  // const totalPages = Math.ceil(tourguideInfo.length / itemsPerPage);

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
        <LuSearchCheck className="absolute z-0 h-[20vh] w-[20vh]"  style={{ opacity: 0.05 }} />

        {/* Overlay content */}
        <div className="text relative z-10">
          <h2 className="mb-4 text-xl text-primary-700 font-bold">
            出發日期： <span className="font-normal">{startDate} </span>{" "}
          </h2>
          <h2 className="mb-4 text-xl text-primary-700 font-bold">
            離開日期： <span className="font-normal"> {endDate}</span>{" "}
          </h2>
          {/* <h2 className="mb-4 text-xl text-secondary-400">
            參加人數：{" "}
            <span className="text-primary-700">
              {adultCount}位大人、{childCount}位小孩
            </span>{" "}
          </h2> */}
          <h2 className="text-xl text-primary-700 font-bold">
            行程主題： <span className="font-normal"> {selectedTheme} </span>
          </h2>
        </div>
      </div>

    

      <div className="grid grid-cols-6 w-[80vw] m-auto mb-10">
        {/* other theme options */}

        <aside className="col-span-1 mt-6">
          <div className="flex items-center justify-center gap-1 p-4 hover:cursor-pointer">
            <img
              src="/images/red-balon.png"
              alt=""
              className="inline-block h-10"
            />
            <h2 className="text-lg font-bold leading-[3rem] tracking-4 text-grey-600">
              查看其他行程主題
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            {themes.map((theme, index) => (
              <button
                key={index}
                className="mt-2 flex w-[8vw] justify-center rounded-2xl bg-primary-100 py-2 transition-colors duration-200 hover:bg-grey-200 active:border active:border-secondary-200 active:bg-transparent"
                onClick={() => handleThemeClick(theme)}
              >
                <img
                  src="images/BsHandIndex.svg"
                  alt=""
                  className="inline-block"
                />
                <span className="ml-2 tracking-1.5 text-primary-600">
                  {theme}
                </span>
              </button>
            ))}

            <div className="mt-20 flex justify-center">
              <button
                className="m-auto flex w-[8vw] justify-center rounded-2xl bg-secondary-400 p-2 transition-colors duration-200 hover:bg-secondary-200 active:border active:border-secondary-200 active:bg-transparent"
                onClick={getTourguideInfo}
              >
                <span className="ml-2 tracking-1.5 text-white">
                  查看所有導遊
                </span>
              </button>
            </div>
          </div>
        </aside>

        <main className="col-span-5 m-auto max-w-full">
          <div className="flex items-center justify-center space-x-2 p-4">
            <img
              src="/images/website_logo.png"
              alt=""
              className="inline-block h-[30px]"
            />
            <h2 className="text-[28px] font-bold leading-[3rem] tracking-4 text-primary-600">
              有{selectedGuides.length}位導遊可為您安排
              <span className="text-secondary-700">{selectedTheme}</span>行程
            </h2>
            <img
              src="/images/website_logo.png"
              alt=""
              className="inline-block h-[30px]"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-10" 
          
          // h-[80vh] overflow-y-scroll p-4 scrollbar scrollbar-track-primary-100 scrollbar-thumb-primary-600
          
          >
            {/* <Slider {...settings3} className="overflow-clip"> */}

            {selectedGuides.length > 0 ? (
              selectedGuides.map((item, index) => (
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
            ) : (
              <p>沒有找到導遊</p>
            )}

            {/* </Slider> */}
          </div>
        </main>
      </div>

      {/* <div className="join justify-center">
              <button
                className="btn join-item "
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button className="btn join-item bg-gray-50">
                {" "}
                Page {currentPage} / {totalPages}
              </button>
              <button
                className="btn join-item"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div> */}

    </>
  );
}

export default SearchResultsPage;
