import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axios from "axios";

function EditProfile() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [inputAccount, setInputAccount] = useState({
    username: "",
    name: "",
    email: "",
    tel: "",
    isTourist: false,
    isGuide: false,
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { value, name } = e.target;
    console.log(value, name);

    setInputAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post("/profile/edit", inputAccount,{
        headers: { "Content-Type": "application/json" },

      });
      alert("更新成功!");
      navigate("/profile");
    } catch (error) {
      // alert("註冊失敗，請重新註冊!");
      console.log(error);
      navigate("/sign-up");
    }
  };
  return (
    <>
      <div className="min-h-screen md:flex">
        <aside className="bg-primary-300 p-6 pt-8 text-white md:w-1/6">
          <h2 className="text-xl font-bold">會員中心</h2>
          <ul className="flex pt-2 md:flex-col">
            <li>
              <a href="#" className="block rounded p-2 hover:bg-gray-700">
                會員資料
              </a>
            </li>
            <li>
              <a href="#" className="block rounded p-2 hover:bg-gray-700">
                身分設置
              </a>
            </li>
            <li>
              <a href="#" className="block rounded p-2 hover:bg-gray-700">
                我是遊客
              </a>
            </li>
            <li>
              <a href="#" className="block rounded p-2 hover:bg-gray-700">
                我是導遊
              </a>
            </li>
          </ul>
        </aside>

        <main className="bg-gray-100 p-6 md:w-5/6">
          <h1 className="mb-4 text-2xl font-bold text-primary-600">
            註冊個人資料
          </h1>

          <form
            className="-z-100 flex w-full max-w-[90%] flex-col gap-6 border-2 border-primary-100 bg-white/80 p-6 backdrop-blur-md md:rounded-lg md:bg-white md:shadow-md"
            onSubmit={handleSubmit}
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
                    value={inputAccount.username}
                    onChange={handleInputChange}
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
                    value={inputAccount.name}
                    onChange={handleInputChange}
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
                    value={inputAccount.email}
                    onChange={handleInputChange}
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
                    value={inputAccount?.tel || ""}
                    onChange={handleInputChange}
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
                        // checked={user.isTourist}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      遊客
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isGuide"
                        // checked={user.isGuide}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      導遊
                    </label>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-md text-primary-600">上傳頭像</h2>
                <div className="rounded-md bg-white px-2 shadow-md">
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:border-0 file:bg-primary-200 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-700"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    選擇圖片上傳作為您的個人頭像。
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary-600 py-2 text-white transition hover:bg-primary-700"
            >
              送出
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default EditProfile;
