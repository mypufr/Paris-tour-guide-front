import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


import TourCard from "../components/tourCard";

const SearchToursByKeyWords = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || ""; // 取得 URL 參數

  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);


 
  

  // 取得所有行程
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/tours");
        setTours(res.data || []);
      } catch (error) {
        console.error("❌ 無法獲取行程資料:", error);
      }
    };

    fetchTours();
  }, []);

  // 監聽 searchQuery，篩選符合關鍵字的行程
  useEffect(() => {
    if (!searchQuery) {
      setFilteredTours(tours);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();

      const filtered = (tours || []).filter((tour) =>
        // 檢查 tourName, description 是否包含關鍵字
        (tour.tourName?.toLowerCase().includes(lowerCaseQuery) || 
        
         // 檢查 sites 陣列是否有包含關鍵字
         (tour.sites || []).some((site) => site.toLowerCase().includes(lowerCaseQuery)))
      );
  
      setFilteredTours(filtered);
    }
  }, [searchQuery, tours]);

  return (
    <div className="container mx-auto w-3/4 p-6">


<div className="flex justify-center space-x-4 hover:cursor-pointer mb-2">
        <img
          src="https://i.imgur.com/zoB5vaQ.png"
          alt=""
          className="inline-block h-[30px]"
        />
      <h2 className="text-2xl font-bold mb-4 text-center text-primary-700">搜尋結果：{searchQuery}</h2>
   
        <img
          src="https://i.imgur.com/zoB5vaQ.png"
          alt=""
          className="inline-block h-[30px]"
        />
      </div>
 

    {filteredTours.length > 0 ? (
      <div className="grid grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <TourCard
            key={tour.id}
            imageUrl={tour.imgUrl}
            tourName={tour.tourName}
            date={tour.date}
            sites={tour.sites}
            duration={tour.duration}
            description={tour.description}
            price={tour.price}
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500">未找到相關行程</p>
    )}
  </div>
  );
};

export default SearchToursByKeyWords;
