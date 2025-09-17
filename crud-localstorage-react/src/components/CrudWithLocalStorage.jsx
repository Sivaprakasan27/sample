import React, { useState } from "react";
import HabitForm from "./HabitForm";
import Statistics from "./Statistics";
import HabitCard from "./HabitCard";
import "../App.css";

export default function CrudWithLocalStorage() {
  const STORAGE_KEY = "crudItems";

  const load = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  };

  const save = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  const [items, setItems] = useState(() => load());
  const [showModal, setShowModal] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [congratsMessage, setCongratsMessage] = useState(""); // 🎉 new state

  React.useEffect(() => { save(items); }, [items]);

  const handleEdit = (habit) => {
    setEditingHabit(habit);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(h => h.id !== id));
  };

  React.useEffect(() => {
    const onUpdate = () => setItems(load());
    window.addEventListener("habitsUpdated", onUpdate);
    return () => window.removeEventListener("habitsUpdated", onUpdate);
  }, []);

  const handleComplete = (id) => {
    setItems(prev =>
      prev.map(h => {
        if (h.id === id && h.completedDays < h.targetDays) {
          const updatedDays = h.completedDays + 1;
          const todayStr = new Date().toISOString().slice(0,10);

          if (!h.completedDaysToday?.includes(todayStr)) {
            h.completedDaysToday = [...(h.completedDaysToday || []), todayStr];
          }

          if (updatedDays >= h.targetDays) {
            setCongratsMessage(`🎉 Congrats! You completed your target for "${h.title}"`);
            // auto-hide message after 3s
            setTimeout(() => setCongratsMessage(""), 3000);
          }

          return { ...h, completedDays: updatedDays };
        }
        return h;
      })
    );
  };

  const closeModal = () => {
    setEditingHabit(null);
    setShowModal(false);
  };

  return (
    <div className="crud-container">
      <button className="add-button" onClick={() => setShowModal(true)}>Add Habit</button>

      {/* 🎉 Inline Congrats Banner */}
      {congratsMessage && (
        <div className="congrats-banner">{congratsMessage}</div>
      )}

      {showModal && (
        <HabitForm 
          onClose={closeModal} 
          setItems={setItems} 
          items={items} 
          editingHabit={editingHabit}
        />
      )}

      {items.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No habits yet. Add one above.</p>
      ) : (
        <ul className="habit-progress-list">
          {items.map(h => (
            <HabitCard 
              key={h.id} 
              habit={h} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              onComplete={handleComplete}
            />
          ))}
        </ul>
      )}

      <Statistics habits={items} />
    </div>
  );
}
