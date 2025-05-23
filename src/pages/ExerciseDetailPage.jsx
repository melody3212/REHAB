import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/css/ExerciseDetailPage.css";
import Header from "../components/Header";
import Button1 from "../components/Button1";
import DatePicker from "react-datepicker";
import ExerciseSelect from "../components/ExerciseSelect"; // ✅ 운동 선택 모달 추가
import ExerciseItem from "../components/ExerciseItem"; // ✅ 운동 아이템 컴포넌트 추가
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import makeIcon from "../assets/images/make.png";

const ExerciseDetailPage = ({exercises}) => {
    const { dateId } = useParams();                 // ✅ URL에서 선택한 날짜 받아오기
    const nav = useNavigate();

    const [showModal, setShowModal] = useState(false);          // ✅ 운동 추가 모달 상태
    const [showCalendar, setShowCalendar] = useState(false);    // ✅ 달력 보이기 상태
    const [todayExercises, setTodayExercises] = useState([]);   // ✅ 해당 날짜의 운동 기록 (임시)

    // ✅ 운동 날짜 모음 (나중엔 localStorage 기반으로 대체 예정)
    const mockExerciseDates = ["2025-04-08", "2025-04-09", "2025-04-10", "2025-04-19"];
    const roundNum = mockExerciseDates.indexOf(dateId) + 1;     // ✅ N번째 운동인지 계산

    // ✅ 날짜 변경 시 초기화
    useEffect(() => {
        setShowCalendar(false);
        setTodayExercises([]); // TODO: 해당 날짜의 운동 불러오기
    }, [dateId]);

    // ✅ 날짜 문자열 → Date 객체
    const toDateObj = (str) => {
        const [y, m, d] = str.split("-").map(Number);
        return new Date(y, m - 1, d);
    };

    // ✅ Date 객체 → YYYY-MM-DD 문자열
    const toDateId = (date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    };

    // ✅ 날짜 포맷: "4월 8일 (화)"
    const formatKoreanDate = (dateStr) => {
        const date = new Date(dateStr);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekday = date.toLocaleDateString("ko-KR", { weekday: "short" });
        return `${month}월 ${day}일 (${weekday})`;
    };

    // ✅ 날짜 선택 시 이동
    const handleDateSelect = (date) => {
        nav(`/exercise/${toDateId(date)}`);
    };

    // ✅ 모달 핸들러
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // ✅ 운동 선택 모달에서 저장 시 호출
    const handleExerciseSelectSelectedExercises = (selected) => {
      setTodayExercises((prev) => [...prev, ...selected]);
      setShowModal(false);
    };
    
  return (
    <div className="ExerciseDetailPage">
      {/* ✅ 상단 공통 헤더 */}
      <Header
        title="재활운동기록"
        className="detail-header"
        leftChild={
          <Button1
            type="back"
            text="<"
            onClick={() => nav("/exercise")}  // 목록으로 이동
          />
        }
      />

      {/* ✅ 회차 정보 (상단) */}
      <div className="exercise-round">
        {roundNum > 0 ? `${roundNum}회차` : "기록 없음"}
      </div>

      {/* ✅ 날짜 이동 & 선택 */}
      <div className="record-date-selector">
        <button
          className="date-nav-btn"
          onClick={() => {
            const prev = toDateObj(dateId);
            prev.setDate(prev.getDate() - 1);
            nav(`/exercise/${toDateId(prev)}`);
          }}
        >
          ◀
        </button>

        <button
          className="record-date"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {formatKoreanDate(dateId)}
        </button>

        <button
          className="date-nav-btn"
          onClick={() => {
            const next = toDateObj(dateId);
            next.setDate(next.getDate() + 1);
            nav(`/exercise/${toDateId(next)}`);
          }}
        >
          ▶
        </button>
      </div>

      {/* ✅ react-datepicker 인라인 표시 */}
      {showCalendar && (
        <div className="calendar-inline">
          <DatePicker
            selected={toDateObj(dateId)}
            onChange={handleDateSelect}
            inline
            locale={ko}
          />
        </div>
      )}

      

      {/* ✅ 운동 리스트 */}
      <div className="record-list">
        {todayExercises.length > 0 ? (
          todayExercises.map((item) => (
            <ExerciseItem 
              key={item.id} 
              exercise={item} 
              setTodayExercises={setTodayExercises}
            />
          ))
        ) : (
          <p className="empty-msg">
            이날의 운동이 없습니다.
          </p>
        )}
        
      </div>
      {/* ✅ 운동 추가 버튼 */}
      <div className="record-actions">
        <Button1 
            type="make" 
            icon={makeIcon}
            onClick={handleOpenModal} />
      </div>


      {/* ✅ 운동 모달 (추후 컴포넌트 연결 예정) */}
      {showModal && (
        <ExerciseSelect
          exercises={exercises}
          onSave={handleExerciseSelectSelectedExercises}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ExerciseDetailPage;

