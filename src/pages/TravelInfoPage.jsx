import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Card from "../components/Card";

import Slider from "react-slick";

import { settings4 } from "../components/helpers/sliderSettings";


function TravelInfoPage() {

  const { t, i18n } = useTranslation();

  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentary, setCommentary] = useState([]);

  const [tourguideId, setTourguideId] = useState("");
  const [tourguideInfo, setTourguideInfo] = useState([]);
    const [popularTourguidesList, setPopularTourguidesList] = useState([]);

    const [tours, setTours] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log(e.target);
    setTodoList([...todoList, { todoItem: input }]);
    setInput("");
  };

  const handleDeleteItem = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
  };

  
  const getComments = async () => {
    try {
      const dataRes = await axios.get(
        "http://localhost:3000/posts?_embed=user",
      );
      // const dataRes = await axios.get(
      //   // "http://localhost:3000/products?_start=7&_end=9",
      // );

      console.log(dataRes.data);
      setComments(dataRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postComments = async () => {
    try {
      const addedComment = {
        text: "最後一筆",
        userId: "4",
      };
      const postRes = await axios.post(
        "http://localhost:3000/comments",
        addedComment,
      );
      console.log(postRes.request.statusText);
      setComments([...comments, postRes.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // const updateComments = async (id) => {
  //   try {
  //     const updateRes = await axios.patch(
  //       `http://localhost:3000/comments/${id}`,
  //       {
  //         text: "我要更新",
  //       },
  //     );

  //     setComments(
  //       (prevComments) =>
  //         prevComments.map((comment) =>
  //           comment.id === id ? { ...comment, text: "我要更新" } : comment,
  //         ),
  //       console.log(updateRes.request.statusText),
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteComments = async (id) => {
  //   try {
  //     const deleteRes = await axios.delete(
  //       `http://localhost:3000/comments/${id}`,
  //     );
  //     console.log(deleteRes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getTourguides = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tourguides`);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };

  const getCommentaries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/commentaries`);
      console.log(res.data);
      setCommentary(res.data[0].commentaryText);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };


  const handleCardClick = (id) => {
    navigate(`/search-tourguides/tourguide-profile/${id}`); 

  };


  const getTourguideInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/tourguideInfo`);
      console.log(res.data);
   
      setTourguideInfo(res.data.data); // 確保是陣列
      
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };

  const getTourguideInfoById = async (id) => {
    if (!id) {
      setError("請輸入導遊 ID！");
      return;
    }
    try {
      setError("");
      console.log("📌 正在查詢 ID:", id);
      const res = await axios.get(
        `http://localhost:8000/api/tourguideInfo/${id}`,
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };


  const getPopularTourguidesList = async () => {
    try {
      const res = await axios.get(
        "http://lcoalhost:8000/popular-tourguides",{
          withCredentials: true, 
        }
      );
      console.log(res.data);
      setPopularTourguidesList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTrips = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/trips");
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };


  const getTours = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/tours",
      );
      console.log(res.data);


    } catch (error) {
      console.error("Error fetching tour guide data:", error);
    } 
  };


  const getSites = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/sites");
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching tour guides:", error);
    }
  };


  useEffect(() => {
    getTourguideInfo();
  }, []);

  useEffect(() => {
    console.log("🟢 更新後的 tourguideInfo:", tourguideInfo);
  }, [tourguideInfo]);
  



  return (
    <>

<div className="w-full my-20">
  <img src="https://i.pinimg.com/originals/35/a0/d9/35a0d99126faaca0d33305bd1a86ee20.jpg" alt="under-construction" className="m-auto"/>
  </div>

      {/* 切換語言按鈕 */}
      {/* <div className="flex justify-center my-4 gap-2">
        <button onClick={() => i18n.changeLanguage('zh')} className="border p-2">中文</button>
        <button onClick={() => i18n.changeLanguage('en')} className="border p-2">English</button>
        <button onClick={() => i18n.changeLanguage('fr')} className="border p-2">Français</button>
      </div> */}

      {/* <button className="border border-t-cyan-600" onClick={getTourguideInfo}>
        取得所有導遊資料
      </button> */}

{/* <br />
<br />
<br /> */}


      {/* <button className="border border-t-cyan-600" onClick={getPopularTourguidesList }>
        取得熱門導遊資料
      </button> */}

      {/* <button className="border border-t-cyan-600" onClick={getCommentaries}>
        取得評論資料
      </button> */}

      {/* {commentary} */}


      {/* <div>
        <input
          type="text"
          placeholder="輸入導遊 ID"
          value={tourguideId}
          onChange={(e) => setTourguideId(e.target.value)}
          className="m-2 border p-2"
        />
        <button
          className="border border-t-cyan-600 p-2"
          onClick={() => getTourguideInfoById(tourguideId)}
        >
          取得單筆導遊資料
        </button>
      </div> */}

      {/* <button className="border border-t-cyan-600" onClick={getTrips}>
        取得trips
      </button> */}


      {/* <button className="border border-t-cyan-600" onClick={getTours}>
        取得tours
      </button> */}



      {/* <button className="border border-t-cyan-600" onClick={getSites}>
        取得sites
      </button> */}

      {/* <button className="border border-t-cyan-600" onClick={getComments}>
        get all comments
      </button> */}

      {/* <div>
        {comments.length > 0 &&
          comments.map((comment, index) => {
            return (
              <li key={index} className="bg-gray-200 p-2 text-black">
                {comment.text}
              </li>
            );
          })}
      </div> */}
      {/* <br /> */}

      {/* <button className="border border-t-cyan-600" onClick={postComments}>
        post comments
      </button> */}

      {/* <div>
        {comments.length > 1 && (
          <p className="bg-gray-500 text-white">
            {comments[comments.length - 1].text}
          </p>
        )}
      </div> */}

      {/* <br />

      <br />
      <br />
      <hr /> */}

      {/* <button
        className="border border-t-cyan-600"
        // onClick={() => updateComments()}
      >
        update comments
      </button> */}
      {/* <br />
      <br />
      <br />
      <hr /> */}
      {/* <input
        type="text"
        className="border-spacing-2 border"
        value={input}
        onChange={handleOnChange}
        placeholder="請輸入代辦事項"
      /> */}
      {/* <button
        type="button"
        className="border-spacing-2 border text-green-600"
        onClick={handleButtonClick}
      >
        儲存待辦
      </button> */}

      {/* {todoList && todoList.length > 0 ? (
        <ul>
          {todoList.map((item, index) => (
            <li key={index}>
              {item.todoItem}
              <button
                type="button"
                className="m-2 bg-primary-600 text-white"
                onClick={() => handleDeleteItem(index)}
              >
                刪除事項
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the list</p>
      )} */}

      {/* <div className="m-auto my-1">
        <div className="mt-8">
        {tourguideInfo && Array.isArray(tourguideInfo) && tourguideInfo.length > 0 ? (
          tourguideInfo.map((item, index) => (
            <Card key={index} 
            id={item.id} 
            imgSrc={item.imgUrl} 
            title={item.name?.[i18n.language] || item.name?.zh} 
            price={item.price_adult} 
            themes={
              Array.isArray(item.themes?.[i18n.language])
                ? item.themes[i18n.language]
                : [item.themes?.[i18n.language] || item.themes?.zh]
            }
            
            onClick={()=> handleCardClick(item.id)} className="cursor-pointer p-4"
            
            />
          ))
        ) : (
          <p>⏳ 資料載入中...</p>
        )}
      </div>
      </div>  */}
    </>
  );
}

export default TravelInfoPage;
