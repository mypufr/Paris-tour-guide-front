import React, { useState, useEffect, useTransition } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { FiMenu } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";



import { useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { ImCart } from "react-icons/im";

import { AiFillCopy } from "react-icons/ai";

import "../utils/i18n";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./languages/LanguageDropdown.jsx";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [orderCount, setOrderCount] = useState(0);

  const navigate = useNavigate();
  const {t} = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user) {
      localStorage.getItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    toggleMenu(); // This closes the menu after clicking the item
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/logout`,
        {},
        { withCredentials: true },
      );
      setUser(null);
      navigate("/");
      toast.success("已成功登出");
    } catch (error) {
      console.error("登出失敗", error);
    }
  };


  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/${user.username}/private-orders`,
      );
      setOrderCount(res.data.length);
    } catch (error) {
      console.error("取得訂單數失敗", error);
    }
  };

  useEffect(() => {
    fetchOrders();


    const handleOrderUpdate = () => {
      fetchOrders();
    };
    window.addEventListener("orderUpdated", handleOrderUpdate);

    return () => {
      window.removeEventListener("orderUpdated", handleOrderUpdate);
    };
  }, []);

  const linkClass = ({ isActive }) =>
    isActive
  ? "text-secondary-600 font-semibold transition-colors duration-200"
  : "text-primary-500 hover:font-bold transition-colors duration-200";
  
  return (
    <div className="container p-3 lg:py-10">
      <div className="relative">
        <div className="mx-auto flex max-w-full items-center justify-between xl:w-10/12">
          {/* Logo */}
          <NavLink to="/" className="flex cursor-pointer items-center">
            <img src="/images/website_logo.png" alt="logo" className="h-10" />
            <div className="flex flex-col justify-around">
              <h1 className="text-[20px] font-bold leading-6 text-secondary-600">
                樂遊巴黎
                <span className="text-[16px] sm:ps-2 sm:text-[20px] font-bold text-primary-600">
                  Paris, mon guide
                </span>
              </h1>
              <p className="text-[14px] leading-[1.5] tracking-1.5 text-blue-50">
              {t("logo_website_intro")}
              </p>
            </div>
          </NavLink>

          {/* Desktop Menu - visible on larger screens */}
          <ul className="hidden lg:flex lg:items-center lg:justify-between lg:space-x-16">
            <li className="text-base leading-[22.4px] text-grey-950">
              <NavLink to="/search-tourguides" className={linkClass}>

                {t("tour_guide")}
              </NavLink>
            </li>
            <li className="text-base leading-[22.4px] text-grey-950">
              <NavLink to="/book-trips" className={linkClass}>

                {t("book_trip")}
              </NavLink>
            </li>
            <li className="text-base leading-[22.4px] text-grey-950">
              <NavLink to="/sites-info" className={linkClass}>

                {t("site_info")}
              </NavLink>
            </li>
            <li className="text-base leading-[22.4px] text-grey-950">
              <NavLink to="/travel-info" className={linkClass}>

                {t("travel_info")}
              </NavLink>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to={`/${user.username}/profile`}
                    className="text-primary-600 hover:font-bold hover:shadow-md"
                  >
                    <p>
                      <p>{t("member_center", { username: user.username })}</p>
                    </p>
                  </Link>
                </li>

                <li className="relative">
                  <Link to={`/${user.username}/bookings`}>
                    <AiFillCopy className="h-6 w-6 text-primary-600 transition-transform duration-500 ease-in-out hover:scale-150" />

                    {orderCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary-400 text-xs text-white">
                        {orderCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-2xl bg-secondary-400 px-4 py-1 text-white hover:font-bold"
                  >
      
                    {t("logout")}
                  </button>
                </li>
              </>
            ) : (
              <li className="ps-[180px] lg:ps-0">
                <button className="rounded-2xl bg-primary-600 text-base font-normal transition-colors duration-200 hover:bg-primary-300">
                  <Link
                    to="/login"
                    className="my-2 inline-block px-5 text-base text-white"
                  >
     
                    {t("login_register")}
                  </Link>
                </button>
              </li>
            )}
            <LanguageDropdown />
          </ul>

          {/* Hamburger Icon - visible on smaller screens */}
          <div className="relative lg:hidden">
            <div className="dropdown absolute right-[-10px] top-[-20px]">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm absolute right-[60px] z-[500] mt-3 w-52 max-w-[80vw] rounded-box bg-white p-2 shadow"
              >
                <li>
                  {" "}
                  <Link
                    to="/search-tourguides"
                    className="block w-full text-base text-primary-600 transition-colors duration-100 hover:font-bold hover:text-primary-600"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-primary-600">
          
                      {t("tour_guide")}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/book-trips"
                    className="block w-full text-base text-gray-950 transition-colors duration-300 hover:font-bold hover:text-primary-600"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-primary-600">
        
                      {t("book_trip")}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sites-info"
                    className="block w-full text-base text-gray-950 transition-colors duration-300 hover:font-bold hover:text-primary-600"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-primary-600">
       
                      {t("site_info")}
                    </p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/travel-info"
                    className="block w-full text-base text-gray-950 transition-colors duration-300 hover:font-bold hover:text-white"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-primary-700">
      
                      {t("travel_info")}
                    </p>
                  </Link>
                </li>

                {user ? (
                  <>
                    <li>
                      <Link
                        to="/profile"
                        className="text-primary-600 hover:font-bold hover:shadow-md"
                      >
                        <BsPersonCircle className="hidden sm:block" />
                        <p>{t("member_center", { username: user.username })}</p>
                      </Link>
                    </li>

      

                    <li>
                      <Link to={`/${user.username}/bookings`}>
                        <AiFillCopy className="h-6 w-6 text-primary-600 transition-transform duration-500 ease-in-out hover:scale-150" />
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="rounded-2xl bg-secondary-400 px-4 py-1 text-white hover:font-bold"
                      >
       
                        {t("logout")}
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="">
                    <button className="flex w-full items-center bg-primary-600 px-2 py-2 pl-4 text-base text-white">
                      <BsPersonCircle className="h-6 w-6"/>
                      <Link
                        to="/login"
                        className="inline-block px-5 text-base text-white"
                      >
                        {t("login_register")}
                      </Link>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

        </div>

        {/* Mobile Menu - visible when isOpen is true */}
      </div>
    </div>




  );
}

export default Header;
