import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English" },
    { code: "中文", label: "中文" },
    { code: "fr", label: "Français" },
  ];

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) i18n.changeLanguage(savedLang);
  }, [i18n]);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
    setOpen(false);
  };

  // 點外面關閉 dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute top-1 right-4 flex z-50" >

<div className="relative inline-block" ref={dropdownRef}>

      <button
        onClick={() => setOpen(!open)}
        className="px-6 py-2 bg-primary-50 text-primary-600 rounded-xl  hover:bg-primary-700 hover:text-white"
      >
        🌐 {i18n.language.toUpperCase()}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className=" absolute right-0 mt-2 bg-primary-50 shadow-lg rounded-xl overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className="w-full text-left px-4 py-1 hover:bg-gray-200"
                >
                  {lang.label} 
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}
