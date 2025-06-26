// import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import '../assets/css/ExercisePage.css';
// import Button1 from "../components/Button1";
// import Header from "../components/Header";
// import ExerciseCalendar from "../components/ExerciseCalendar";

// const ExercisePage = ({ exercises }) => {
//   const nav = useNavigate();

//   // ✅ mock: 날짜별 기록된 운동 수
//   const mockExerciseDates = ["2025-04-08", "2025-04-09", "2025-04-10", "2025-04-19"];
//   const [recentExerciseLogs, setRecentExerciseLogs] = useState([]);
//   const totalRounds = mockExerciseDates.length; // ✅ 누적 회차

//   // ✅ 최근 운동 리스트 mock 예시
//   useEffect(() => {
//     const recent = [
//       { id: 1, date: "2025-04-19", name: "데드버그 - 코어 운동" },
//       { id: 2, date: "2025-04-10", name: "요방형근 스트레칭" },
//       { id: 3, date: "2025-04-09", name: "힙 브릿지" },
//     ];
//     setRecentExerciseLogs(recent);
//   }, []);

//   return (
//     <div className="ExercisePage">
//       {/* ✅ 상단 헤더 */}
//       <Header 
//         title={"재활운동기록"}
//         leftChild={
//           <Button1
//             type={"back"}
//             text={"<"}
//             onClick={() => nav(`/`)}
//           />
//         }
//       />

//       {/* ✅ 누적 회차 표시 */}
//       <div className="exercise-summary">
//         지금까지 총 <strong>{totalRounds}회차</strong>의 재활운동이 기록되었어요!
//       </div>



//       {/* ✅ 최근 운동 리스트
//       <div className="recent-exercise">
//         <h4>최근 운동 기록</h4>
//         <ul>
//           {recentExerciseLogs.map((log) => (
//             <li key={log.id}>
//               <span>{log.date}</span> - {log.name}
//             </li>
//           ))}
//         </ul>
//       </div> */}
      
//       {/* ✅ 캘린더 표시 */}
//       <ExerciseCalendar className="exercise-calendar" />


//       {/* ✅ 운동 템플릿 관리 페이지 이동 */}
//       <div className="exercise-add-btn">
//         <Button1
//           type={"exercise-make"}
//           text="운동 추가하기"
//           onClick={() => nav(`./exercisetem`)}
//         />
//       </div>
//     </div>
//   );
// };

// export default ExercisePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/css/ExercisePage.css';
import Button1 from "../components/Button1";
import Header from "../components/Header";
import ExerciseCalendar from "../components/ExerciseCalendar";
import { getExercise } from "../api/exercise"; // ✅ API 함수 import

const ExercisePage = () => {
  const nav = useNavigate();
  const [recentExerciseLogs, setRecentExerciseLogs] = useState([]);
  const [exerciseDates, setExerciseDates] = useState([]); // 날짜별 운동 기록
  const [allExercise, setAllExercise ] = useState([]); // 모든 운동 저장
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateLogs, setSelectedDateLogs] = useState([]);

  // 최근 운동의 effect
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercise();
        setAllExercise(data);

        const validData = data.filter(log => log.createdAt);

        // 날짜별로 중복 제거 (날짜만 추출)
        const uniqueDates = [
          ...new Set(
            data
              .filter(log => log.createdAt)  // 필터링 먼저!
              .map(log => log.createdAt.slice(0, 10))
          )
        ];

        // 최근 운동 목록 (정렬 + 가공)
        const recent = validData
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map((log, index) => ({
          id: log.id ?? index, // id 없을 경우 index fallback
          name: log.content,
          date: log.createdAt.slice(0, 10),
        }));

        setRecentExerciseLogs(recent);
        setExerciseDates(uniqueDates);
      } catch (error) {
        console.error("운동 기록 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

  fetchExercises();
}, []);

  // 날짜에 맞는 운동의 effect
  useEffect(() => {
    if (selectedDate) {
      const filtered = recentExerciseLogs.filter(
        (log) => log.date === selectedDate
      );
      setSelectedDateLogs(filtered);
    } else {
      setSelectedDateLogs([]);
    }
  }, [selectedDate, recentExerciseLogs]);

  const totalRounds = exerciseDates.length;

  return (
    <div className="ExercisePage">
      <Header 
        title={"재활운동기록"}
        leftChild={
          <Button1
            type={"back"}
            text={"<"}
            onClick={() => nav('/')}
          />
        }
      />

      {/* ✅ 누적 회차 표시 */}
      <div className="exercise-summary">
        지금까지 총 <strong>{totalRounds}회차</strong>의 재활운동이 기록되었어요!
      </div>

      {/* ✅ 최근 운동 리스트 */}
      <div className="recent-exercise">
        <h4>최근 운동 기록</h4>
        {loading ? (
          <p>불러오는 중...</p>
        ) : (
          <ul>
            {recentExerciseLogs.map((log) => (
              <li key={log.id}>
                <span>{log.date}</span> - {log.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ 캘린더 */}
      <ExerciseCalendar 
        // className="exercise-calendar"
        allExercise={allExercise}
        onDateClick={(dataStr) => setSelectedDate(dataStr)}
      />

      {/* 날짜별 운동 기록 */}
      {selectedDate && (
        <div className="selected-exercise">
          <h4>{selectedDate} 운동 기록</h4>
          {selectedDateLogs.length > 0 ? (
            <ul>
              {selectedDateLogs.map((log) => (
                <li key={log.id}>
                  <span>{log.date}</span> - {log.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>기록된 운동이 없습니다.</p>
          )}
        </div>
      )}

      {/* ✅ 운동 템플릿 관리 페이지 이동 */}
      <div className="exercise-add-btn">
        <Button1
          type={"exercise-make"}
          text="운동 추가하기"
          onClick={() => nav('/exercise/exercisetem')}
        />
      </div>
    </div>
  );
};

export default ExercisePage;