import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "../App.css";

export default function Statistics({ habits }) {
  // ✅ Helper to get local date in YYYY-MM-DD format
  const getLocalDateString = (d = new Date()) => {
    return d.toLocaleDateString("en-CA"); // YYYY-MM-DD, respects local timezone
  };

  // Get all dates of current month
  const getMonthDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      dates.push(d);
    }
    return dates;
  };

  const monthDates = getMonthDates();

  // ✅ Use local date string instead of UTC ISO
  const calendarData = monthDates.map(d => {
    const dateStr = getLocalDateString(d);
    const completed = habits.filter(h => h.completedDaysToday?.includes(dateStr)).length;
    return { day: d.getDate(), completed };
  });

  // Statistics values
  const todayStr = getLocalDateString();
  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedDaysToday?.includes(todayStr)).length;
  const streaks = habits.map(h => Math.min(h.completedDays / h.targetDays, 1));
  const avgStreak = streaks.length ? (streaks.reduce((a, b) => a + b, 0) / streaks.length * 100).toFixed(0) : 0;
  const total30Days = habits.length * 30;
  const completed30Days = habits.reduce((sum, h) => sum + (h.completedDays > 30 ? 30 : h.completedDays), 0);
  const rate30 = total30Days ? ((completed30Days / total30Days) * 100).toFixed(0) : 0;

  return (
    <div className="statistics-container">
      <h2 style={{ marginBottom: 24, textAlign: "center" }}>Statistics Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Habits</h4>
          <p style={{ color: "#4caf50" }}>{totalHabits}</p>
        </div>
        <div className="stat-card">
          <h4>Completed Today</h4>
          <p style={{ color: "#2196f3" }}>{completedToday}</p>
        </div>
        <div className="stat-card">
          <h4>Average Streak</h4>
          <p style={{ color: "#ff9800" }}>{avgStreak}%</p>
        </div>
        <div className="stat-card">
          <h4>30-Day Rate</h4>
          <p style={{ color: "#9c27b0" }}>{rate30}%</p>
        </div>
      </div>

      <h4 style={{ marginBottom: 16 }}>Monthly Completion Chart</h4>
      <div className="monthly-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={calendarData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />   
            <XAxis 
  dataKey="day" 
  stroke={getComputedStyle(document.documentElement).getPropertyValue("--text-color")} 
/>
<YAxis 
  allowDecimals={false} 
  stroke={getComputedStyle(document.documentElement).getPropertyValue("--text-color")} 
/>
<Tooltip
  contentStyle={{
    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue("--card-bg"),
    color: getComputedStyle(document.documentElement).getPropertyValue("--text-color")
  }}
/>

            <Bar
              dataKey="completed"
              fill={document.documentElement.getAttribute("data-theme") === "dark" ? "#76ff03" : "#4caf50"}
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h4 style={{ marginBottom: 16 }}><i>Habit Progress</i></h4>
      <ul className="habit-progress-list">
        {habits.map(habit => {
          const percent = Math.min((habit.completedDays / habit.targetDays) * 100, 100);
          return (
            <li key={habit.id}><i>
              <span>{habit.title}: </span>
              <span style={{ color: "#4caf50" }}>{percent.toFixed(0)}% ({habit.frequency})</span>
            </i></li>
          );
        })}
      </ul>
    </div>
  );
}
