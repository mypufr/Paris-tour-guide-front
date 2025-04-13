import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-40">
      <button
        onClick={() => changeLang("en")}
        className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-base"
      >
        EN
      </button>
      <button
        onClick={() => changeLang("zh")}
        className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-base"
      >
        中文
      </button>
      <button
        onClick={() => changeLang("fr")}
        className="px-4 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-base"
      >
        FR
      </button>
    </div>
  );
}
