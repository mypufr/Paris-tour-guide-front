import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import CommentaryList from "./CommentaryList"; // 確保這個 component 存在

const ResponsiveTabs = ({ tourguideInfoById, date, setDate, filteredSlots, handleSelectTime, commentary, data }) => {
  const [activeTab, setActiveTab] = useState("tab-1");
  const tabList = ["tab-1", "tab-2", "tab-3"];

  return (
    <div className="flex pt-20">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div
            role="tablist"
            aria-label="tabs"
            className="relative mx-auto flex h-12 w-full items-center overflow-x-auto px-1 sm:justify-start"
          >
            <div
              className="absolute top-0 h-12 w-28 border-b-2 bg-primary-100 shadow-md transition-all duration-300"
              style={{ left: `${tabList.indexOf(activeTab) * 120}px` }}
            />

            {[
              { id: "tab-1", label: "導遊簡介" },
              { id: "tab-2", label: "可預約時段" },
              { id: "tab-3", label: "導遊評價" },
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                id={tab.id}
                aria-selected={activeTab === tab.id}
                className={`relative z-10 block h-12 flex-shrink-0 px-6 transition-all whitespace-nowrap ${
                  activeTab === tab.id ? "bg-primary-100 font-bold text-primary-600" : "text-gray-950"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative mt-4 rounded-3xl">
            {activeTab === "tab-1" && (
              <div role="tabpanel" id="panel-1">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 border border-primary-200 px-4 pt-6">
                  <div className="md:col-span-2 h-[50vh]">
                    <div className="my-6 flex items-center space-x-6">
                      <img src="/images/website_logo.png" alt="" className="inline-block h-[30px]" />
                      <h3 className="text-xl font-bold text-primary-600">關於{tourguideInfoById.name}</h3>
                    </div>
                    <div className="h-[35vh] overflow-y-scroll p-1 scrollbar scrollbar-track-primary-100 scrollbar-thumb-primary-500">
                      <p className="bg-white px-2 text-xl">{tourguideInfoById.profile}</p>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <div className="flex items-center justify-center space-x-6 pt-4">
                      <img src="/images/website_logo.png" alt="" className="inline-block h-[30px]" />
                      <h4 className="text-xl font-bold text-primary-600">{tourguideInfoById.name}的連結</h4>
                    </div>
                    <ul className="flex items-center justify-center space-x-4 py-4">
                      <Link to="/"><FaFacebook className="text-[40px]" /></Link>
                      <Link to="/" className="inline-block rounded-full border-2 border-white p-2">
                        <RiInstagramFill className="text-[48px]" />
                      </Link>
                      <Link to="/"><AiFillTwitterCircle className="text-[48px]" /></Link>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tab-2" && (
              <div role="tabpanel" id="panel-2" className="border-t-2 px-4 pt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex justify-center">
                    <DayPicker
                      className="react-day-picker rounded-xl border border-primary-200 bg-white p-6 shadow-lg"
                      numberOfMonths={1}
                      classNames={{
                        day: "items-center justify-center text-lg hover:bg-gray-200 rounded-full",
                      }}
                      mode="single"
                      selected={date}
                      onSelect={(d) => setDate(new Date(d.setHours(12, 0, 0, 0)))}
                      minDate={new Date(new Date().setDate(new Date().getDate() + 2))}
                    />
                  </div>

                  <ul className="space-y-4">
                    {filteredSlots.length > 0 ? (
                      filteredSlots.map((slot, index) => (
                        <li key={index}>
                          <p className="text-xl font-semibold">{slot.date} 可預約的空檔:</p>
                          <div className="flex flex-wrap gap-2">
                            {slot.time.map((timeSlot, timeIndex) => (
                              <button
                                key={timeIndex}
                                className="rounded-lg bg-gray-400 px-4 py-2 text-white hover:bg-blue-600"
                                onClick={() => handleSelectTime(timeSlot, slot)}
                              >
                                ⏰ {timeSlot}
                              </button>
                            ))}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-center text-2xl text-red-500">⚠️ 無可預約時段</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "tab-3" && (
              <div role="tabpanel" id="panel-3" className="overflow-hidden border-t-2 px-4 pt-6">
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="w-full lg:w-1/2 flex flex-col items-center">
                    <h2 className="text-base text-primary-600">
                      <span className="text-gray-950">{tourguideInfoById.name}</span> 10位客人的評價
                    </h2>
                    <p className="text-grey-400">
                      <span className="pr-2 text-xl font-bold text-red-500">4</span>/ 5 (80人已評價)
                    </p>
                    <div className="flex justify-center gap-4 p-4">
                      <img src="/images/Frame 1000004544.png" alt="" className="h-auto max-w-full object-contain" />
                      <img src="/images/Frame 1000004546.png" alt="" className="h-auto max-w-full object-contain" />
                    </div>
                  </div>

                  <div className="h-[520px] w-full lg:w-3/4 overflow-y-scroll scrollbar scrollbar-track-primary-100 scrollbar-thumb-primary-500">
                    <div className="flex flex-col items-center gap-2">
                      {tourguideInfoById.commentaries.map((comment, index) => (
                        <div key={index} className="p-3 transform transition-transform duration-300 hover:scale-105">
                          <CommentaryList
                            userImg={data.userImg}
                            name={comment.user}
                            commentaryText={comment.comment}
                            date={comment.date}
                          />
                        </div>
                      ))}
                      {commentary}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTabs;
