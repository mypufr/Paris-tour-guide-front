import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";

function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <div>載入中...</div>; // 或顯示一個 loading 畫面
  }

  if (loading) return <div>載入中...</div>;
  if (!user) return <div>找不到使用者資料</div>;

  useEffect(() => {
    if (user) {
      localStorage.getItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      <div className="text-primary">
        <h1></h1>
      </div>

      <div className="grid min-h-screen grid-cols-1 md:grid-cols-3">
        {/* 左側側邊欄 */}
        <aside className="bg-primary-300 p-6 text-white md:col-span-1">
          <h2 className="mb-4 text-2xl font-bold">會員中心</h2>
          <ul className="space-y-2">
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

        {/* 右側主內容區 */}
        <main className="bg-gray-100 p-6 md:col-span-2">
          <h1 className="mb-4 text-3xl font-bold">編輯個人資料</h1>
          <p className="text-gray-700">
            這裡是主要的內容區域，可以放置文章、圖片或其他資訊。
          </p>

          <form className="-z-100 border-primary flex w-full max-w-[90%] flex-col gap-6 border-2 bg-white/80 p-6 backdrop-blur-md md:rounded-lg md:bg-white md:shadow-md">
            <div className="flex justify-between">
              <div>
                <div>
                  <label className="block text-sm font-medium">
                    使用者名稱
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="border-primary w-full rounded-md border p-2"
                    placeholder="請輸入電子郵件地址"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">電子信箱</label>
                  <input
                    type="password"
                    name="password"
                    className="border-primary w-full rounded-md border p-2"
                    placeholder="請設定密碼"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">連絡電話</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="border-primary w-full rounded-md border p-2"
                    placeholder="01-2345678"
                  />
                </div>
              </div>

              <div>
                {" "}
                <div className="mt-6 rounded-md bg-white p-4 shadow-md">
                  <h2 className="mb-2 text-xl font-bold">上傳頭像</h2>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:border-0 file:bg-gray-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-700"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    選擇圖片上傳作為您的個人頭像。
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary-300 py-2 text-white transition hover:bg-primary-700"
            >
              僅作為遊客
            </button>
            <button
              type="submit"
              className="w-full rounded-md bg-primary-600 py-2 text-white transition hover:bg-primary-700"
            >
              同時成為導遊
            </button>

            <p className="text-center text-sm">
              已有帳號?
              {/* <Link to="/login" className="text-primary-600 hover:underline">
                {" "}
                按此登入
              </Link> */}
            </p>
          </form>
        </main>
      </div>
    </>
  );
}

export default EditProfile;
