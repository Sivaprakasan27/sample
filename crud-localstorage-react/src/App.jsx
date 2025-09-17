import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CrudWithLocalStorage from "./components/CrudWithLocalStorage";
import Settings from "./components/Settings";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home"); 
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={setPage} />
      <main>
        {page === "home" ? <CrudWithLocalStorage /> : <Settings />}
      </main>
    </div>
  );
}
