import React from "react";

export default function Header({ darkMode, setDarkMode, onNavigate }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <h2>Habit Tracker</h2>
      </div>

      <nav className="header-right">
        <button className="nav-button" onClick={() => onNavigate("home")}>Home</button>
        <button className="nav-button" onClick={() => onNavigate("settings")}>Settings</button>
        <button className="nav-button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </nav>
    </header>
  );
}
