import { useState, useEffect } from "react";

const STORAGE_KEY = "rehab-schedules";

const useLocalSchedules = (defaultSchedules = []) => {
  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultSchedules;
  });

  // ✅ localStorage 동기화
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  }, [schedules]);

  // ✅ 최초 한 번만 기본값 저장 (비어있을 경우만)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved || JSON.parse(saved).length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSchedules));
      setSchedules(defaultSchedules);
    }
  }, []);

  return [schedules, setSchedules];
};

export default useLocalSchedules;
