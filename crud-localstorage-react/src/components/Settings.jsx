import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Settings() {
  const handleExport = () => {
    const habits = JSON.parse(localStorage.getItem("crudItems")) || [];

    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Habits Progress Report", 14, 20);

    // Table Headers
    const tableColumn = ["S.No", "Habit Title", "Description", "Frequency", "Progress %", "Avg. Streak"];

    // Table Rows
    const tableRows = habits.map((habit, index) => {
      const frequency = habit.frequency || "-";

      // Progress percentage
      const progress = habit.completedDays && habit.targetDays
        ? `${Math.round((habit.completedDays / habit.targetDays) * 100)}%`
        : "0%";

      // Avg Streak (calculated the same way as your statistics page)
      const avgStreak = habit.completedDays && habit.targetDays
        ? Math.min((habit.completedDays / habit.targetDays) * 100, 100).toFixed(0) + "%"
        : "0%";

      return [
        index + 1,
        habit.title || "No Title",
        habit.description || "-",
        frequency,
        progress,
        avgStreak,
      ];
    });

    // Generate Table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 3 },
      headStyles: { fillColor: [68, 114, 196], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Save PDF
    doc.save("habits_report.pdf");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <p>Export your records</p>
      <button onClick={handleExport} className="export-btn">
        Export Habits as PDF
      </button>
    </div>
  );
}
