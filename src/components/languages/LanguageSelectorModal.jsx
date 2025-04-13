import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function LanguageSelectorModal() {
  const { i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const selected = localStorage.getItem("selectedLanguage");
    if (!selected) {
      setShowModal(true);
    } else {
      i18n.changeLanguage(selected);
    }
  }, [i18n]);

  const selectLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-sm w-full"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4">Choose your language</h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => selectLanguage("en")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
              >
                English
              </button>
              <button
                onClick={() => selectLanguage("zh")}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition"
              >
                中文
              </button>
              <button
                onClick={() => selectLanguage("fr")}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition"
              >
                Français
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
