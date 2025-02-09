import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [account, setAccount] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { value, name } = e.target;
    console.log(value, name);

    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const signupRes = await axios.post("/register", account);
      console.log(signupRes);
      setUser({
        username: account.username,
        email: account.email,
      })
      toast.success("送出成功!🎉 下一步: 前往編輯個人資料");
      // setAccount({
      //   username: "",
      //   email: "",
      //   password: "",
      // })

      setTimeout(() => navigate("/edit-profile"), 2000);
    } catch (error) {
      console.log("(註冊失敗", error);
    }
  };

  return (
    <>
      <div className="relative mx-auto flex h-[80vh] w-full max-w-md items-center justify-center bg-primary-100 md:bg-transparent md:static md:h-auto md:max-w-5xl md:flex-row md:gap-5">
        {/* <div className="absolute inset-0 -z-10 h-full w-full md:top-[5rem] lg:top-[8rem]">
          <img
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-xl"
          />

          <img
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-bottom opacity-90"
            style={{
              maskImage:
                "linear-gradient(to center, transparent 5%, black 100%))",
              WebkitMaskImage:
                "linear-gradient(to center, transparent 5%, black 100%",
            }}
          />
        </div> */}
        <div className="absolute inset-0 flex items-center justify-center p-6 md:relative md:w-1/2">
          <form
            onSubmit={handleSignUp}
            className="-z-100 border-primary-100 flex w-full max-w-[90%] flex-col gap-6 border-2 bg-white/80 p-6 backdrop-blur-md rounded-lg md:bg-white md:shadow-md"
          >
            <h1 className="text-center text-xl font-bold">會員註冊</h1>

            <div>
              <label className="block font-medium">使用者名稱</label>
              <input
                type="text"
                name="username"
                value={account.username}
                className="border-primary-100 w-full rounded-md border p-2"
                placeholder="請輸入使用者名稱"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium">帳號</label>
              <input
                type="email"
                name="email"
                value={account.email}
                className="border-primary-100 w-full rounded-md border p-2"
                placeholder="請輸入電子郵件地址"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block font-medium">密碼</label>
              <input
                type="password"
                name="password"
                value={account.password}
                className="border-primary-100 w-full rounded-md border p-2"
                placeholder="請設定密碼"
                onChange={handleInputChange}
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
              <Link to="/login" className="text-primary-600 hover:underline">
                {" "}
                按此登入
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="relative lg:mb-[15%]">
        <div className="hidden md:absolute md:-top-[30rem] md:left-[5%] md:block md:-rotate-12">
          <img src="https://i.imgur.com/dn5n8ac.png" alt="" />
        </div>

        <div className="rotate-10 absolute hidden md:-top-[26rem] md:right-[5%] md:block">
          <img src="https://i.imgur.com/dn5n8ac.png" alt="" />
        </div>

        <div className="overflow-hiddenn hidden md:absolute md:-top-[20rem] md:left-10 md:block lg:-top-[8rem]">
          <img
            src="https://i.imgur.com/ku7iNV8.png"
            alt=""
            className="h-auto max-w-[98%]"
          />
        </div>

        <div className="hidden md:absolute md:-top-[10em] md:right-[1%] md:block md:-rotate-3 lg:-top-[1rem] lg:right-[15%] 2xl:absolute 2xl:right-[7%] 2xl:top-[190px] 2xl:block 2xl:-rotate-3">
          <img
            src="https://i.imgur.com/0q6kIet.png"
            alt=""
            className="h-auto max-w-[89%]"
          />
        </div>

        <div className="hidden lg:absolute lg:-top-[10rem] lg:right-3 2xl:absolute 2xl:-top-5 2xl:right-2 lg:block">
          <img
            src="https://i.imgur.com/Ze8tmid.png"
            alt=""
            className="h-auto max-w-[98%]"
          />
        </div>
      </div>
    </>
  );
}

export default SignUp;
