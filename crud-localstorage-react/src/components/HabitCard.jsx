import React from "react";
import "../App.css";

export default function HabitCard({ habit, onEdit, onDelete, onComplete }) {
  const percent = Math.min((habit.completedDays / habit.targetDays) * 100, 100);

  // Category color map
  const categoryColors = {
    Health: "#4caf50",
    Learning: "#2196f3",
    Mindfulness: "#ff9800",
    Productivity: "#9c27b0",
    Social: "#f44336",
    Creativity: "#795548"
  };

  return (
    <li 
      className="habit-card" 
      style={{ borderLeft: `6px solid ${categoryColors[habit.category]}` }}
      data-category={habit.category}
    >
      <div className="habit-info">
        <h3 className="habit-title">{habit.title}</h3>
        <p className="habit-desc">{habit.description}</p>
        <p><strong>Frequency:</strong> {habit.frequency}</p>
        <p><strong>Target Days:</strong> {habit.targetDays}</p>
        <p>
          <strong>Category:</strong> {habit.category}
        </p>

        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${percent}%` }}
          ></div>
        </div>
        <p className="progress-text">{percent.toFixed(0)}% completed</p>
      </div>

      <div className="habit-actions">
        <button className="complete-button" onClick={() => onComplete(habit.id)}>✔</button>
        <button className="edit-button" onClick={() => onEdit(habit)}>Edit</button>
        <button className="delete-button" onClick={() => onDelete(habit.id)}>Delete</button>
      </div>
    </li>
  );
}
