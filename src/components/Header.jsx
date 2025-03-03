import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import { FiMenu } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { toast } from "react-hot-toast";
import { ImCart } from "react-icons/im";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

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
        "http://localhost:8000/api/logout",
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

  return (
    <div className="container p-3 lg:py-10">
      <div className="relative">
        <div className="mx-auto flex max-w-full items-center justify-between xl:w-10/12">
          {/* Logo */}
          <Link to="/" className="flex cursor-pointer items-center">
            <img src="/images/website_logo.png" alt="logo" className="h-10" />
            <div className="flex flex-col justify-around">
              <h1 className="text-[20px] font-bold leading-6 text-secondary-600">
                樂遊巴黎
                <span className="ps-2 text-[20px] font-bold text-primary-600">
                  Paris, mon guide
                </span>
              </h1>
              <p className="text-[14px] leading-[1.5] tracking-1.5 text-blue-50">
                在地導遊媒合平台
              </p>
            </div>
          </Link>

          {/* Desktop Menu - visible on larger screens */}
          <ul className="hidden lg:flex lg:items-center lg:justify-between lg:space-x-16">
            <li className="text-base leading-[22.4px] text-grey-950">
              <Link
                to="/search-tourguides"
                className="text-primary-500 hover:font-bold"
              >
                隨行導遊趣
              </Link>
            </li>
            <li className="text-base leading-[22.4px] text-grey-950">
              <Link
                to="/book-trips"
                className="text-primary-500 hover:font-bold"
              >
                行程搶先報
              </Link>
            </li>
            <li className="text-base leading-[22.4px] text-grey-950">
              <Link
                to="/sites-info"
                className="text-primary-500 hover:font-bold"
              >
                推薦景點
              </Link>
            </li>
            <li className="text-base leading-[22.4px] text-grey-950">
              <Link
                to="/travel-info"
                className="text-primary-500 hover:font-bold"
              >
                旅行指南
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to="/edit-profile"
                    className="text-primary-600 hover:font-bold hover:shadow-md"
                  >
                    <p>我是{user.username}</p>
                  </Link>
                </li>

                <li>
                  <ImCart className="text-secondary-600" />
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-2xl bg-secondary-400 px-4 py-1 text-white hover:font-bold"
                  >
                    登出
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
                    登入 / 註冊
                  </Link>
                </button>
              </li>
            )}
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
                className="menu dropdown-content menu-sm absolute right-[-10px] z-[500] mt-3 w-52 max-w-[40vw] rounded-box bg-white p-2 shadow"
              >
                <li>
                  {" "}
                  <Link
                    to="/search-tourguides"
                    className="block w-full text-base text-primary-600 transition-colors duration-100 hover:font-bold hover:text-primary-600"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-primary-600">
                      隨行導遊趣
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
                      行程搶先報
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
                      推薦景點
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
                      旅行指南
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
                        <p>Bonjour {user.username}!</p>
                      </Link>
                    </li>

                    <li>
                      <ImCart className="text-secondary-600" />
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="rounded-2xl bg-secondary-400 px-4 py-1 text-white hover:font-bold"
                      >
                        登出
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="">
                    <button className="flex w-full items-center bg-primary-600 px-2 py-2 pl-4 text-base text-white">
                      <BsPersonCircle />
                      <Link
                        to="/login"
                        className=" inline-block px-5 text-base text-white"
                      >
                        註冊/登入
                      </Link>
                    </button>
                  </li>
                )}
              </ul>
            </div>
            {/* <button
              onClick={toggleMenu}
              className="rounded-full bg-primary-600 p-2 text-white"
            >
              {isOpen ? <FiMenu className="h-6 w-6" /> : <FiMenu />}
            </button> */}
          </div>
        </div>

        {/* Mobile Menu - visible when isOpen is true */}
        {/* {isOpen && (
          <div className="absolute left-0 top-full z-50 w-full shadow-lg lg:hidden">
            <div className="absolute right-0 top-0 max-w-[64%] bg-white">
              <ul className="flex flex-col justify-items-end">
                <li className="flex items-center justify-between px-2 py-4 transition-colors duration-300 hover:bg-grey-100 hover:text-white">
                  <Link
                    to="/search-tourguides"
                    className="block w-full text-base text-gray-950 transition-colors duration-300 hover:font-bold hover:text-white"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-white">
                      隨行導遊趣
                    </p>
                  </Link>
                  <SlArrowRight className="text-[8px]" />
                </li>

                <li className="flex items-center justify-between px-2 py-4 transition-colors duration-300 hover:bg-grey-100 hover:text-white">
                  <Link
                    to="/book-trips"
                    className="block w-full text-base text-gray-950 transition-colors duration-300 hover:font-bold hover:text-white"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-white">
                      行程搶先報
                    </p>
                  </Link>
                  <SlArrowRight className="text-[8px]" />
                </li>

                <li className="flex items-center justify-center px-2 py-4 transition-colors duration-300 hover:bg-grey-100 hover:text-white">
                  <Link
                    to="/sites-info"
                    className="block w-full text-base text-gray-950 transition-colors duration-300 hover:font-bold hover:text-white"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-white">
                      推薦景點
                    </p>
                  </Link>
                  <SlArrowRight className="text-[8px]" />
                </li>

                <li className="flex items-center justify-between px-2 py-4 transition-colors duration-300 hover:bg-grey-100 hover:text-white">
                  <Link
                    to="/travel-info"
                    className="block w-full text-base text-gray-950 transition-colors duration-300 hover:font-bold hover:text-white"
                    onClick={toggleMenu}
                  >
                    <p className="text-base text-gray-950 hover:font-bold hover:text-white">
                      旅行指南
                    </p>
                  </Link>
                  <SlArrowRight className="text-[8px]" />
                </li>

                {user ? (
                  <>
       
                    <li>
                      <Link
                        to="/profile"
                        className="text-primary-600 hover:font-bold hover:shadow-md"
                      >
                        <p>Bonjour {user.username}!</p>
                      </Link>
                    </li>

                    <li>
                  <ImCart className="text-secondary-600"/>
                </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="rounded-2xl bg-secondary-400 px-4 py-1 text-white hover:font-bold"
                      >
                        登出
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="">
                    <button className="flex w-full items-center bg-primary-600 px-2 py-2 pl-4 text-base text-white">
                      <BsPersonCircle />
                      <Link
                        to="/login"
                        className="my-2 inline-block px-5 text-base text-white"
                      >
                        註冊/登入
                      </Link>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Header;
