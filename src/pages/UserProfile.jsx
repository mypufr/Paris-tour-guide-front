import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import { AiFillCopy } from "react-icons/ai";

export default function UserProfile() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      localStorage.getItem("user", JSON.stringify(user));
      console.log(user.username);
    }
  }, [user]);
  return (
    <>
      <div className="text-center">
        {user && (
          <div className="mb-10 flex justify-center space-x-4 hover:cursor-pointer">
            <img
              src="/images/vector_title.png"
              alt=""
              className="inline-block h-[40px]"
            />
            <h2 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
              您好，{user.username}!{" "}
            </h2>
            <img
              src="/images/vector_title.png"
              alt=""
              className="inline-block h-[40px]"
            />
          </div>
        )}
      </div>

      {user && (
        <div className="m-auto w-3/4 min-h-screen md:flex">
          <aside className="bg-primary-600 p-6 pt-8 text-white md:w-1/6">
            <h2 className="text-xl font-bold">會員中心</h2>
            <ul className="flex pt-2 md:flex-col">
              <li>
                <Link
                  to={`/${user.username}/profile`}
                  className={`block rounded p-2 hover:bg-primary-900 ${
                    location.pathname === `/${user.username}/profile`
                      ? "text-lg font-bold"
                      : ""
                  }`}
                >
                  會員資料
                </Link>
              </li>
              <li>
                <Link
                  to={`/${user.username}/mailbox`}
                  className={`block rounded p-2 hover:bg-primary-900 ${
                    location.pathname === "/mailbox" ? "text-lg font-bold" : ""
                  }`}
                >
                  個人信箱
                </Link>
              </li>
              <li>
                <Link
                  to={`/${user.username}/bookings`}
                  className={`block rounded p-2 hover:bg-primary-900 ${
                    location.pathname === "/bookings" ? "text-lg font-bold" : ""
                  }`}
                >
                  已預約行程
                </Link>
              </li>
              <li>
                <Link
                  to={`/${user.username}/reviews`}
                  className={`block rounded p-2 hover:bg-primary-900 ${
                    location.pathname === "/reviews" ? "text-lg font-bold" : ""
                  }`}
                >
                  給導遊評價
                </Link>
              </li>
            </ul>
          </aside>

          <main className="bg-gray-100 p-6 md:w-5/6">
            <h1 className="mb-4 text-2xl font-bold text-primary-600">
              您的個人資料
            </h1>

            <form
              className="-z-100 flex w-full max-w-[90%] flex-col gap-6 border-2 border-primary-100 bg-white/80 p-6 md:rounded-lg md:bg-white md:shadow-md"
              // onSubmit={handleSubmit}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:gap-6">
                <div className="w-full md:w-1/2">
                  <div>
                    <label className="text-md block text-primary-600">
                      使用者名稱
                    </label>
                    <input
                      type="text"
                      name="username"
                      defaultValue={user.username}
                      // value={inputAccount.username}
                      // onChange={handleInputChange}
                      className="mb-2 w-full rounded-md border border-primary-100 p-2"
                      placeholder={user?.username || ""}
                    />
                  </div>

                  <div>
                    <label className="text-md block text-primary-600">
                      真實姓名
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user.name}
                      // value={inputAccount.name}
                      // onChange={handleInputChange}
                      className="mb-2 w-full rounded-md border border-primary-100 p-2"
                      placeholder="請輸入真實姓名"
                    />
                  </div>

                  <div>
                    <label className="text-md block text-primary-600">
                      電子信箱
                    </label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      // value={inputAccount.email}
                      // onChange={handleInputChange}
                      className="mb-2 w-full rounded-md border border-primary-100 p-2"
                      placeholder={user?.email || ""}
                    />
                  </div>

                  <div>
                    <label className="text-md block text-primary-600">
                      連絡電話
                    </label>
                    <input
                      type="tel"
                      name="tel"
                      defaultValue={user.tel || ""}
                      // value={inputAccount?.tel || ""}
                      // onChange={handleInputChange}
                      pattern="[0-9]{2}-[0-9]{7,8}"
                      className="mb-2 w-full rounded-md border border-primary-100 p-2"
                      placeholder="01-2345678"
                    />
                  </div>
                  <div>
                    <label className="text-md mt-2 block text-primary-600">
                      角色選擇 ( 可複選 )
                    </label>
                    <div className="mt-2 flex items-center gap-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isTourist"
                          checked={user.isTourist}
                          // onChange={handleInputChange}
                          className="mr-2"
                        />
                        遊客
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isGuide"
                          checked={user.isGuide}
                          // onChange={handleInputChange}
                          className="mr-2"
                        />
                        導遊
                      </label>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h2 className="text-md text-primary-600">上傳頭像</h2>
                  <div className="flex justify-center gap-4 rounded-md bg-white p-6 px-2 shadow-md">
                    <img
                      className="inline-block h-8 w-8 rounded-full object-cover md:h-20 md:w-20 lg:h-20 lg:w-20"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      alt={name}
                    />

                    <div className="flex flex-col gap-2">
                      <p className="mt-2 text-sm text-gray-600">
                        選擇圖片上傳作為您的個人頭像。
                      </p>
                      <label
                        htmlFor="fileUpload"
                        className="block w-fit cursor-pointer rounded-md bg-primary-200 px-4 py-2 text-white hover:bg-primary-300"
                      >
                        📁 選擇圖片
                      </label>
                      <input
                        id="fileUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />

                      {/* <input
                        type="file"
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 
                        file:mr-4 file:border-0
                         file:bg-primary-200 file:px-4 file:py-2 
                         file:text-sm file:font-semibold file:text-white hover:file:bg-gray-700
                         file:cursor-pointer file:content-['選擇圖片']"
                         placeholder="選擇圖片"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="m-auto w-1/6 rounded-md bg-primary-600 py-2 text-white transition hover:bg-primary-700"
              >
                送出
              </button>
            </form>
          </main>
        </div>
      )}
    </>
  );
}
