import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const handleFindGuideClick = () => {
    navigate("/search-tourguides");
  };

  return (
    <>

<div className="w-full">
  <img src="https://i.pinimg.com/originals/35/a0/d9/35a0d99126faaca0d33305bd1a86ee20.jpg" alt="under-construction" className="m-auto"/>
  </div>
      {/* <div className="h-full text-center text-3xl font-bold text-white">
        <div className="mb-8 mt-[80px] flex justify-center space-x-4 hover:cursor-pointer">
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
          <h5 className="text-[40px] font-bold leading-[3rem] tracking-4 text-primary-600">
            關於我們
          </h5>
          <img
            src="images/vector_title.png"
            alt=""
            className="inline-block h-[40px]"
          />
        </div>
        <div
          className="relative h-screen bg-cover bg-center px-[10%] pb-[500px]"
          style={{ backgroundImage: "url('https://i.imgur.com/WapVXkT.png')" }}
        >
          <div className="absolute top-10 space-y-6">
            <p className="px-20 text-start text-2xl text-grey-950">
              歡迎來到 樂遊巴黎
              (以下簡稱「本網站」)。在使用本網站前，請詳細閱讀以下使用條款。使用本網站即表示您同意並接受這些條款。如果您不同意這些條款，請勿使用本網站。
            </p>

            <h3 className="text-start pl-20 text-2xl my-3" > 1. 資訊的正確性</h3>

            <p className="px-20 text-start text-2xl text-grey-950">
              本網站致力於提供準確且最新的資訊，但不對資料的正確性、完整性或及時性做出任何保證。本
              網站保留隨時更改內容的權利，恕不另行通知。
            </p>

            <h3 className="text-start pl-20 text-2xl my-3"> 2. 服務使用</h3>
            <p className="px-20 text-start text-2xl text-grey-950">
              本網站僅為個人非商業用途提供服務。您不得以任何方式複製、散佈、修改或商業利用本網站的內容，除非得到書面授權。{" "}
            </p>

            <h3 className="text-start pl-20 text-2xl my-3"> 3. 註冊與帳戶</h3>

            <p className="px-20 text-start text-2xl text-grey-950">
              在註冊或使用本網站服務時，您需提供準確的個人資料，並確保帳戶安全。本網站對因帳戶未經授權使用而產生的損失不承擔責任。
            </p>

            <h3 className="text-start pl-20 text-2xl my-3">4. 費用與付款</h3>

            <p className="px-20 text-start text-2xl text-grey-950">
              所有行程價格均以網站所示為準，付款應根據提供的支付方式進行。本網站保留隨時修改價格和服務內容的權利。
            </p>

            <h3 className="text-start pl-20 text-2xl my-3"> 5. 取消與退款政策</h3>

            <p className="px-20 text-start text-2xl text-grey-950">
              所有取消與退款應依照各行程的取消政策進行。本網站保留對行程作出任何更改、取消或推遲的權利，並將及時通知客戶。
            </p>

            <h3 className="text-start pl-20 text-2xl my-3"> 6. 免責聲明</h3>
            <p className="px-20 text-start text-2xl text-grey-950">
              本網站對任何因使用或無法使用本網站而導致的直接、間接、附帶或後果性的損害不承擔責任。網站內容僅作參考之用。
            </p>

            <h3 className="text-start pl-20 text-2xl my-3"> 7. 適用法律</h3>
            <p className="px-20 text-start text-2xl text-grey-950">
              本使用條款受當地法律約束。任何與本條款有關的爭議應提交至相關法律機構進行仲裁。
            </p>
          </div>


        </div>
      </div> */}
    </>
  );
}

export default About;
