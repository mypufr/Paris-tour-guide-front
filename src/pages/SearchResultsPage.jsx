import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { LuSearchCheck } from "react-icons/lu";
import Card from "../components/Card";

function SearchResultsPage() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("endDate");
  const theme = queryParams.get("theme");

  const [selectedGuides, setSelectedGuides] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const themes = [
    "歷史建築",
    "藝術博物館",
    "文史哲巡禮",
    "時尚購物",
    "親子家庭遊",
    "自然風光",
    "浪漫蜜月行",
  ];

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
  };

  const getTourguideInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/tourguideInfo`);
      setSelectedGuides(res.data.data);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };

  const getSelectedGuides = async (theme) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/guides?theme=${theme}`
      );
      setSelectedGuides(res.data);
    } catch (error) {
      console.error("❌ 無法獲取導遊:", error.response?.data || error.message);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleSelectThemeClick = (theme) => {
    setSelectedTheme(theme);


    setIsDropdownOpen(false);
    setIsOverlayVisible(false);


    getSelectedGuides(theme);
  };

  useEffect(() => {
    if (theme) {
      setSelectedTheme(theme);
      getSelectedGuides(theme);
    } else {
      getTourguideInfo();
    }
  }, [theme]);

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

      <div className="relative my-[10px] flex h-auto flex-col items-center justify-center px-4 text-center md:h-[25vh] md:flex-row">
        <LuSearchCheck
          className="absolute z-0 h-[20vh] w-[20vh]"
          style={{ opacity: 0.05 }}
        />
        <div className="text relative z-10">
          <h2 className="mb-4 text-xl font-bold text-primary-700">
            出發日期： <span className="font-normal">{startDate}</span>
          </h2>
          <h2 className="mb-4 text-xl font-bold text-primary-700">
            離開日期： <span className="font-normal"> {endDate}</span>
          </h2>
          <h2 className="text-xl font-bold text-primary-700">
            行程主題： <span className="font-normal"> {selectedTheme} </span>
          </h2>
        </div>
      </div>

      <div className="m-auto mb-10 grid w-[80vw] grid-cols-6">
        <aside className="hidden sm:flex order-2 col-span-6 mt-6 flex-wrap justify-center md:order-1 md:col-span-1 md:block">
          <div className="flex items-center justify-center gap-1 p-4 hover:cursor-pointer">
            <img
              src="/images/red-balon.png"
              alt=""
              className="inline-block h-10"
            />
            <h2 className="text-lg font-bold leading-[3rem] tracking-4 text-grey-600">
              其他行程主題
            </h2>
          </div>

          <div className="flex flex-col items-center w-full gap-4 md:w-auto">
            {themes.map((theme, index) => (
              <button
                key={index}
                className="mt-2 flex w-full max-w-[200px] justify-center rounded-2xl bg-primary-100 py-2 transition-colors duration-200 hover:bg-grey-200 active:border active:border-secondary-200 active:bg-transparent md:w-[8vw]"
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
          </div>
        </aside>

        <main className="order-1 col-span-6 m-auto max-w-full md:order-2 md:col-span-5">
          <div className="flex items-center justify-center space-x-2 p-4 max-[320px]:flex-col">
            <img
              src="/images/website_logo.png"
              alt=""
              className="inline-block h-[30px]"
            />
            <h2 className="text-sm font-bold leading-[3rem] tracking-4 text-primary-600 lg:text-[28px]">
              有{selectedGuides.length}位導遊可為您安排
              <span className="text-secondary-700">{selectedTheme}</span>行程
            </h2>
            <img
              src="/images/website_logo.png"
              alt=""
              className="hidden h-[30px] sm:inline-block"
            />
          </div>

                {/* Overlay */}
      {isOverlayVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20" // Ensure the overlay is on top of other elements
          onClick={handleDropdownToggle} // Click on the overlay to close the dropdown
        />
      )}

<div className="flex justify-center">

      {/* DaisyUI Dropdown for mobile */}
      <div className="dropdown md:hidden z-30"> {/* Set z-30 to ensure dropdown is above the overlay */}
        <label
          tabIndex="0"
          className="btn btn-primary w-full"
          onClick={handleDropdownToggle}
        >
          選擇其他行程主題
        </label>

        {isDropdownOpen && (
          <ul
            tabIndex="0"
            className="menu dropdown-content w-full rounded-box bg-base-100 p-2 shadow z-40" // Ensure dropdown list has the highest z-index
          >
            {themes.map((theme, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelectThemeClick(theme)}
                  className="flex w-full justify-center py-2"
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
              </li>
            ))}
          </ul>
        )}
      </div>


</div>

          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-10">
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
          </div>
        </main>
      </div>
    </>
  );
}

export default SearchResultsPage;

