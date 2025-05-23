// === src/App.jsx ===
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRouter from './routes/AppRouter';

// 커스텀 훅
import useLocalSchedules from './hooks/useLocalSchedules';
import useLocalCheckedStates from './hooks/useLocalCheckedStates';
import useLocalExercises from './hooks/useLocalExercises';

// 기본 mock 일정 데이터
const defaultSchedules = [
  {
    id: 1,
    title: '2025년 4월 8일 목요일',
    year: 2025,
    month: 4,
    day: 8,
    items: [
      '서울대학교 병원 오전 9시 물리치료 예약',
      '서울대학교 병원 오전 11시 수기치료 예약',
      '밥먹기',
      '라면먹기',
      '게임하기',
      '돼지갈비',
      '졸프하기',
    ],
  },
  {
    id: 2,
    title: '2025년 4월 5일 수요일',
    year: 2025,
    month: 4,
    day: 5,
    items: [
      '강남성심병원 오전 10시 물리치료 예약',
      '서울대학교 병원 오전 11시 수기치료 예약',
    ],
  },
];

// 기본 mock 운동 템플릿
const defaultExercises = [
  {
    id: 1,
    name: '데드버그 - 코어 운동',
    description: `
    누워서 다리를 들어서 90도로 만들고 몸통과 다리 각도는 90도 보다 
    작은 각으로 만들고 팔은 앞으로 나란히 드는 게 시작 자세 
    한쪽 다리를 쭉 펴는 것과 동시에 반대쪽 팔을 뒤로 보내주기 
    이때 배는 복식호흡으로 눌러놓고 발은 몸 쪽으로 당겨놓기
    `,
    sets: 3,
    reps: 15,
  },
  {
    id: 2,
    name: '요방형근 스트레칭',
    description: `
    땅을 손으로 짚고 (손 위치는 어깨와 수직이 되도록) 
    다리는 무릎을 꿇어서 골반 너비로 벌리기 배를 위로 끌어올린다는 느낌으로 
    힘을 걸어준 채(골반 후방경사 만들어주기) 
    완전히 뒤로 앉았다가 후방경사 풀리지 않도록 유지하면서 돌아오기 반복
    `,
    sets: 3,
    reps: 20,
  },
];

export default function App() {
  // LocalStorage 기반 상태 관리
  const [schedules, setSchedules] = useLocalSchedules(defaultSchedules);
  const [checkedStates, setCheckedStates] = useLocalCheckedStates({});
  const [exercises, setExercises] = useLocalExercises(defaultExercises);

  // 걸음수 관련 상태
  const [goal, setGoal] = React.useState(10000);
  const [steps, setSteps] = React.useState(0);

  return (
    <Router>
      <div className="container">
        <AppRouter
          goal={goal}
          setGoal={setGoal}
          steps={steps}
          setSteps={setSteps}
          schedules={schedules}
          setSchedules={setSchedules}
          checkedStates={checkedStates}
          setCheckedStates={setCheckedStates}
          exercises={exercises}
          setExercises={setExercises}
        />
      </div>
    </Router>
  );
}
