import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchTourguidesPage from "./pages/SearchTourguidesPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import TourguideProfilePage from "./pages/TourguideProfilePage";
import EditMessagePage from "./pages/EditMessagePage";
import TripsPage from "./pages/TripsPage";
import SitesInfoPage from "./pages/SitesInfoPage";
import TravelInfoPage from "./pages/TravelInfoPage";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import BookPrivateTripsPage from "./pages/BookPrivateTripsPage";
import OrderInfoPage from "./pages/OrderInfoPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import Policy from "./pages/Policy";
import EditProfile from "./pages/EditProfile";
import EditTourguideProfile from "./pages/EditTourguideProfile";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import CartPage from "./pages/CartPage.jsx";
import SearchToursByKeyWords from "./pages/SearchToursByKeyWords.jsx";

import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import { Provider } from "react-redux";
import store from "./store/store.jsx";

import Cursor from "../context/cursor.jsx";

import "./utils/i18n.js"
import { useTranslation } from "react-i18next";
import i18n from "i18next";

import LanguageSelectorModal from "./components/languages/LanguageSelectorModal";
import LanguageDropdown from "./components/languages/LanguageDropdown";


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
  const { t } = useTranslation();

  return (
    <UserContextProvider>
      <Provider store={store}>
        <Cursor />
        <div className="flex min-h-screen flex-col">
          {/* <div>
            <h1>{t("welcomeMessage")}</h1>
          
            <button onClick={() => i18n.changeLanguage("zh")}>中文</button>

<button onClick={() => i18n.changeLanguage("fr")}>Français</button>

          
          </div> */}

<LanguageSelectorModal />


          <BrowserRouter>
            <Header />
            <Toaster position="top-right" toastOptions={{ duration: 2000 }} />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/search" element={<SearchToursByKeyWords />} />
                <Route
                  path="/search-tourguides"
                  element={<SearchTourguidesPage />}
                />
                <Route
                  path="/search-tourguides/search-results"
                  element={<SearchResultsPage />}
                />

                <Route
                  path="/search-tourguides/tourguide-profile/:id"
                  element={<TourguideProfilePage />}
                />
                <Route
                  path="/search-tourguides/tourguide-profile/:id/message"
                  element={<EditMessagePage />}
                />

                <Route
                  path="/search-tourguides/tourguide-profile/:id/private-trips"
                  element={<BookPrivateTripsPage />}
                />

                <Route
                  path="/search-tourguides/tourguide-profile/:id/private-trips/confirm-order"
                  element={<OrderInfoPage />}
                />

                <Route
                  path="/search-tourguides/tourguide-profile/:id/private-trips/payment"
                  element={<PaymentPage />}
                />

                <Route
                  path="/search-tourguides/tourguide-profile/:id/private-trips/payment-success"
                  element={<PaymentSuccessPage />}
                />

                <Route path="/:username/bookings" element={<CartPage />} />
                <Route path="/book-trips" element={<TripsPage />}></Route>
                <Route path="/sites-info" element={<SitesInfoPage />}></Route>
                <Route path="/travel-info" element={<TravelInfoPage />}></Route>

                <Route path="/about" element={<Policy />} />

                <Route path="/about/privacy-policy" element={<About />} />

                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/login" element={<Login />}></Route>
                {/* <Route path="/:username/profile" element={<UserProfile />}></Route> */}
                <Route path="/:username/profile" element={<UserProfile />} />

                <Route
                  path="/:username/edit-profile"
                  element={<EditProfile />}
                ></Route>
                {/* /:username/edit-profile */}
                <Route
                  path="/edit-tourguide-profile"
                  element={<EditTourguideProfile />}
                ></Route>
              </Routes>
            </main>

            <Footer />
          </BrowserRouter>
        </div>
      </Provider>
    </UserContextProvider>
  );
}
