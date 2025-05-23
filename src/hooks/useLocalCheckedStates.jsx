// ✅ hooks/useLocalCheckedStates.js
import { useState, useEffect } from "react";

const STORAGE_KEY = "rehab-checked-states";

const useLocalCheckedStates = () => {
  const [checkedStates, setCheckedStates] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedStates));
  }, [checkedStates]);

  return [checkedStates, setCheckedStates];
};

export default useLocalCheckedStates;

