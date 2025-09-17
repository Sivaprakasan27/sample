import React from "react";

export default function Settings() {
  const handleExport = () => {
    const habits = JSON.parse(localStorage.getItem("crudItems")) || [];
    const blob = new Blob([JSON.stringify(habits, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "habits_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <p>Export your records</p>
      <button onClick={handleExport} className="export-btn">
        Export Habits
      </button>
    </div>
  );
}
