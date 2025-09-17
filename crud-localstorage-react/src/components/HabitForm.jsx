import React, { useState, useEffect } from "react";
import "../App.css";

export default function HabitForm({ onClose, setItems, items, editingHabit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [target, setTarget] = useState(1);
  const [category, setCategory] = useState("Health");

  useEffect(() => {
    if (editingHabit) {
      setTitle(editingHabit.title);
      setDescription(editingHabit.description);
      setFrequency(editingHabit.frequency);
      setTarget(editingHabit.targetDays);
      setCategory(editingHabit.category);
    }
  }, [editingHabit]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editingHabit) {
      setItems(items.map(h => h.id === editingHabit.id ? {
        ...h,
        title,
        description,
        frequency,
        targetDays: target,
        category
      } : h));
    } else {
      const id = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now());
      setItems([...items, { id, title, description, frequency, targetDays: target, category, completedDays: 0, completedDaysToday: [] }]);
    }

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{editingHabit ? "Edit Habit" : "Add Habit"}</h3>
        <label for="Habit Title"><b>Habit Title:</b></label>
        <input placeholder="Habit Title" value={title} onChange={e => setTitle(e.target.value)} />
        <label for="Descripition"><b>Description:</b></label>
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <label for="frequency"><b>Frequency:</b></label>
        <select value={frequency} onChange={e => setFrequency(e.target.value)}>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <label for="target"><b>Target:</b></label>
        <input type="number" placeholder="Target Days" value={target} onChange={e => setTarget(e.target.value)} />
        <label for="category"><b>Category:</b></label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>Health</option>
          <option>Learning</option>
          <option>Mindfulness</option>
          <option>Productivity</option>
          <option>Social</option>
          <option>Creativity</option>
        </select>
        <div className="modal-buttons">
          <button onClick={onClose} className="clear-button">Cancel</button>
          <button onClick={handleSubmit} className="add-button">{editingHabit ? "Update" : "Add"}</button>
        </div>
      </div>
    </div>
  );
}
