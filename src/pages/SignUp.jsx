import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignUp() {
  // try {
  //   const signupRes = await axios.post("http://localhost:3000/members",{
  //     "email":"myp@qq.com",
  //     "password":"000000"
  //   })

  //   console.log(signupRes.data)

  // } catch (error) {
  //   console.log(error)
  // }

  return (
    <>
      <div className="relative mx-auto my-10 flex h-[80vh] w-full max-w-md items-center justify-center md:static md:h-auto md:max-w-5xl md:flex-row md:gap-5">
        <div className="absolute inset-0 h-full w-full md:top-[5rem] lg:top-[8rem] -z-10">
          <img
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-xl"
          />

          <img
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90 object-bottom"
            style={{
              maskImage:
                "linear-gradient(to center, transparent 5%, black 100%))",
              WebkitMaskImage:
                "linear-gradient(to center, transparent 5%, black 100%",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-6 md:relative md:w-1/2">
          <form className="-z-100 border-primary flex w-full max-w-[90%] flex-col gap-6 border-2 bg-white/80 p-6 backdrop-blur-md md:rounded-lg md:bg-white md:shadow-md">
            <h1 className="text-center text-xl font-bold">會員註冊</h1>

            <div>
              <label className="block text-sm font-medium">帳號</label>
              <input
                type="email"
                name="email"
                className="border-primary w-full rounded-md border p-2"
                placeholder="請輸入電子郵件地址"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">密碼</label>
              <input
                type="password"
                name="password"
                className="border-primary w-full rounded-md border p-2"
                placeholder="請設定密碼"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">確認密碼</label>
              <input
                type="password"
                name="password"
                className="border-primary w-full rounded-md border p-2"
                placeholder="請再次輸入密碼"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-primary-600 py-2 text-white transition hover:bg-primary-700"
            >
              建立帳號
            </button>

            <p className="text-center text-sm">
              已有帳號?
              <Link className="text-primary-600 hover:underline">
                {" "}
                按此登入
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
