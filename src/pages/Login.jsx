import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/userContext";

function Login() {
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { value, name } = e.target;
    console.log(value, name);

    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post("http://localhost:8000/api/login", account, {
  //       withCredentials: true,
  //     });
  //     console.log("後端回應:",data);

  //     if (data.error) {
  //       toast.error(data.error);
  //       return;
  //     }

  //     if (data.user) {
  //       setUser(data.user);
  //       localStorage.setItem("user", JSON.stringify(data.user));
  //       toast.success("成功登入!");
  //       navigate("/");
  //       console.log(data.user)
  //       console.log("登入成功，後端回傳資料：", data);
  //     }

  //     // if (data.error) {
  //     //   toast.error(data.error);
  //     // } else {
  //     //   setAccount({
  //     //     email: "",
  //     //     password: "",
  //     //   });
  //     // }
  //     // setTimeout(() => navigate("/"), 1500);
  //   } catch (error) {
  //     console.error("登入失敗", error);
  //     toast.error("登入失敗，請檢查帳號或密碼 ❌");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        account,
        { withCredentials: true }
      );
  
      console.log("後端回應:", data); // 確保你真的有接收到 user 資料
  
      if (data.error) {
        toast.error(data.error);
      } else if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("成功登入!");
        navigate("/");
      } else {
        toast.error("登入失敗，請檢查帳號或密碼 ❌");
      }
  
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("登入失敗:", error);
      toast.error("登入失敗，請檢查帳號或密碼 ❌");
    }
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
      <div className="relative mx-auto my-10 flex h-[80vh] w-full max-w-md items-center justify-center md:static md:h-auto md:max-w-5xl md:flex-row md:gap-5" id="target-section">
        <div className="absolute inset-0 -z-10 h-full w-full md:top-[5rem] lg:top-[8rem]">
          <img
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 h-full w-full object-cover blur-xl"
          />

          <img
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-bottom opacity-90 blur-xl"
            style={{
              maskImage:
                "linear-gradient(to center, transparent 5%, black 100%))",
              WebkitMaskImage:
                "linear-gradient(to center, transparent 5%, black 100%",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-6 md:relative md:w-1/2">
          <form
            onSubmit={handleLogin}
            className="-z-100 border-primary flex w-full max-w-[90%] flex-col gap-6 rounded-lg border-2 bg-white/80 p-6  md:bg-white"
          >
            <h1 className="text-center text-xl font-bold">會員登入</h1>

            <div>
              <label className="block font-medium">帳號</label>
              <input
                type="email"
                name="email"
                value={account.email}
                className="w-full rounded-md border border-primary-100 p-2"
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
                className="w-full rounded-md border border-primary-100 p-2"
                placeholder="請設定密碼"
                onChange={handleInputChange}
              />
            </div>

            <p className="text-start text-sm">
              <Link to="/login" className="text-primary-600 hover:underline">
                {" "}
                忘記密碼 ?
              </Link>
            </p>
            <button
              type="submit"
              className="w-full rounded-md bg-primary-600 py-2 text-white transition hover:bg-primary-700"
            >
              登入
            </button>
            <button
              type="submit"
              className="w-full rounded-md border-2 border-primary-200 py-1 text-primary-500 transition hover:bg-primary-700"
            >
              Google 登入
            </button>

            <p className="text-center text-sm text-primary-600 hover:underline">
              沒有帳號 ?
          
            </p>

            <Link to="/sign-up" className="text-primary-600 hover:underline">
            <button
              type="submit"
              className="w-full rounded-md bg-secondary-400 py-2 text-white transition hover:bg-primary-700"
            >
               註冊會員
            </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
