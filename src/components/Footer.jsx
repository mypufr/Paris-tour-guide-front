import React from "react";
import { Link } from "react-router-dom";

import "../utils/i18n";
import { useTranslation } from "react-i18next";

function Footer() {

    const {t} = useTranslation();
  return (
    <>
      {/* footer */}
      <footer className="bottom-0 w-full ">
        <div className="relative ">

          <div className="hidden lg:block">
            <img
              src="/images/footer_background.png"
              alt=""
              className="w-full"
            />
          </div>


          <div className="bg-primary-600">

          <div className="relative -top-1 min-h-[380px] bg-primary-600 xl:min-h-[420px]">
     
            <div className="absolute bottom-[150px] right-[400px] hidden md:right-16 md:top-20 md:block lg:top-1 lg:right-[15vw] xl:-top-[20vh] ">
              
         
              
              <img
                src="https://i.imgur.com/IKExSXw.png"
                alt="footer_img"
                className="h-auto w-full md:h-60 lg:h-[300px] xl:h-[450px] 2xl:h-[500px]"
              />
            </div>

            <div className="absolute left-8 top-10 min-[400px]:left-10 md:left-[10%] md:top-[20%] lg:left-[20%] lg:top-[10%]">
              
         
              
              <ul className="space-y-6 text-base text-grey-100">
        
                <li className="flex">
                  <Link to="/" className="inline-flex cursor-pointer">
                    <div className="">
                      <img
                        src="/images/website_logo.png"
                        alt="logo"
                        className="h-14"
                      />
                    </div>
                    <div className="flex flex-col justify-around">
                      <div>
                        <h1 className="text-[20px] font-bold leading-6 text-secondary-600">
                          樂遊巴黎
                          <span className="max-[320px]:text-[14px] ps-2 text-primary-100">
                            Paris, mon guide
                          </span>
                        </h1>
                      </div>
                      <p className="text-[14px] font-normal leading-[1.5] tracking-1.5 text-white">
                      {t("logo_website_intro")}
                      </p>
                    </div>
                  </Link>
                </li>

           
                <li className="flex space-x-6">
                  <Link to="/about">
                    <span className="text-[16px] text-gray-300">{t("about_us")}</span>
                  </Link>

                  <Link to="#">
                    <span className="text-[16px] text-gray-300">{t("contact_us")}</span>
                  </Link>
                </li>

    
                <li>
                  <Link to="tel:+37653421" className="flex items-center">
                    <img
                      src="/images/call.svg"
                      alt="call icon"
                      className="inline-block h-6 w-6"
                    />
                    <p className="ml-3 inline-block text-gray-300">
                      01-23456789
                    </p>
                  </Link>
                </li>
                <li className="flex items-center">
                  <Link to="mailto:info@hexschool.com">
                    <img
                      src="/images/location_on.svg"
                      alt=""
                      className="inline-block h-6 w-6"
                    />
                    <p className="ml-3 inline-block text-gray-300">
                      Paris-mon-guide@gmail.com
                    </p>
                  </Link>
                </li>


                <li className="flex space-x-4">
                  <Link to="/">
                    <img
                      src="/images/facebook.svg"
                      alt="facebook-link"
                      className="inline-block h-8 w-8"
                    />
                  </Link>
                  <Link to="/" className="border-1 inline-block rounded-full">
                    <img
                      src="/images/ig-new.svg"
                      alt="facebook-link"
                      className="inline-block h-8 w-8"
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src="/images/twitter_logo.svg"
                      alt="line-link"
                      className="inline-block h-8 w-8 rounded-full"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          </div>

   
          <div className="hidden 2xl:block 2xl:absolute 2xl:bottom-[2vh] 2xl:right-[30vh] translate-x-1/2 transform z-20">
            <p className="text-center lg:text-sm xl:text-base text-grey-100">
            {t("copyright")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
