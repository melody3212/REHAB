// ✅ hooks/useLocalExercises.js
import { useState, useEffect } from "react";

const STORAGE_KEY = "exercises";

const useLocalExercises = (defaultExercises = []) => {
  const [exercises, setExercises] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultExercises;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
  }, [exercises]);

  return [exercises, setExercises];
};

export default useLocalExercises;