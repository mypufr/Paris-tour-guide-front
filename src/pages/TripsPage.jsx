import React, { useState, useRef, useEffect } from "react";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-day-picker/dist/style.css";

import data from "../data/data.json";
import Card from "../components/Card";
import TripsData from "../data/trips.json";
import TripCard from "../components/TripCard";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { DayPicker } from "react-day-picker";
// import Pikaday from "pikaday";

// import "./TripsPage.css";

function TripsPage() {
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

  const handleCardClick = (id) => {
    // navigate(`/search-tourguides/tourguide-profile/${id}#target-section`);
  };


  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);




  return (
    <>




<div className="w-full">
  <img src="https://i.pinimg.com/originals/35/a0/d9/35a0d99126faaca0d33305bd1a86ee20.jpg" alt="under-construction" className="m-auto"/>
  </div>




      {/* slides show: popular tourist guides */}
      {/* <div className="mt-10">
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
      </div> */}
      {/* <div className="flex">
        <div className="flex w-1/3 items-center justify-center space-x-8 2xl:mt-6">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="hover:text-primary-400 p-2 text-grey-950"
          >
            <SlArrowLeft />
          </button>

   
          <div className="pagination-container text-xl font-bold text-primary-600">
            <span>{currentSlide}</span> /{" "}
            <span className="text-grey-950">{data.length}</span>
     
          </div>

          <button
            onClick={() => sliderRef.current.slickNext()}
            className="hover:text-primary-400 text-grey-950"
          >
            <SlArrowRight />
          </button>
        </div>
        <div className="w-2/3">
          <Slider {...settings1} arrows={false} 
          // ref={sliderRef}
          >
            {data.map((data, index) => (
              <div
                key={index}
                className="slide-item grid gap-4 p-1 sm:grid-cols-1 sm:p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
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
      </div> */}
    </>
  );
}

export default TripsPage;
