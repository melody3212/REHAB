// === src/routes/AppRouter.jsx ===
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Authentication pages
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import SignupOkPage from '../pages/SignupokPage';

// Health app pages
import Home from '../pages/Home';
import SchedulePage from '../pages/SchedulePage';
import ExercisePage from '../pages/ExercisePage';
import WalkingPage from '../pages/Walkingpage';
import CareHome from '../pages/CareHome';
import ExerciseTemPage from '../pages/ExerciseTemPage';
import ExerciseDetailPage from '../pages/ExerciseDetailPage';

// Board app pages
import MatchBoardPage from '../pages/MatchboardPage';
import MatchqnaPage from '../pages/MatchqnaPage';
import MatchwritePage from '../pages/MatchwritePage';
import MatchwriteokPage from '../pages/MatchwriteokPage';
import ComuboardPage from '../pages/ComuboardPage';
import ComuqnaPage from '../pages/ComuqnaPage';
import DealboardPage from '../pages/DealboardPage';
import DealqnaPage from '../pages/DealqnaPage';
import ComuwritePage from '../pages/ComuwritePage';
import IdsearchPage from '../pages/IdsearchPage';
import PwsearchPage from '../pages/PwsearchPage';
import PwreplacePage from '../pages/PwreplacePage';
import PwreplacepokPage from '../pages/PwreplaceokPage';
import NoticeboardPage from '../pages/NoticeboardPage';

/**
 * AppRouter handles both Health app and Board app routes.
 * Props:
 *  - goal, setGoal, steps, setSteps: walking state
 *  - schedules, setSchedules: schedule state
 *  - checkedStates, setCheckedStates: schedule checklist state
 *  - exercises, setExercises: exercise templates and logs
 */
export default function AppRouter({
  goal,
  setGoal,
  steps,
  setSteps,
  schedules,
  setSchedules,
  checkedStates,
  setCheckedStates,
  exercises,
  setExercises,
}) {
  const isAuth = Boolean(localStorage.getItem('authToken'));

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signupok" element={<SignupOkPage />} />

      {/* Protected routes */}
      {isAuth && (
        <>
          {/* Health app */}
          <Route
            path="/"
            element={
              <Home
                schedules={schedules}
                checkedStates={checkedStates}
                setCheckedStates={setCheckedStates}
              />
            }
          />
          <Route
            path="/care"
            element={<CareHome />}
          />
          <Route
            path="/schedule"
            element={
              <SchedulePage
                schedules={schedules}
                setSchedules={setSchedules}
                checkedStates={checkedStates}
                setCheckedStates={setCheckedStates}
              />
            }
          />
          <Route
            path="/exercise"
            element={
              <ExercisePage
                exercises={exercises}
                setExercises={setExercises}
              />
            }
          />
          <Route
            path="/walkingpage"
            element={
              <WalkingPage
                goal={goal}
                setGoal={setGoal}
                steps={steps}
                setSteps={setSteps}
              />
            }
          />
          <Route
            path="/exercise/exercisetem"
            element={
              <ExerciseTemPage
                exercises={exercises}
                setExercises={setExercises}
              />
            }
          />
          <Route
            path="/exercise/:dateId"
            element={<ExerciseDetailPage exercises={exercises} />}
          />

          {/* Board app */}
          <Route path="/matchboard" element={<MatchBoardPage schedules={schedules} />} />
          <Route path="/matchboard/:id" element={<MatchqnaPage />} />
          <Route path="/matchwrite" element={<MatchwritePage />} />
          <Route path="/matchwriteok" element={<MatchwriteokPage />} />
          <Route path="/comuboard" element={<ComuboardPage />} />
          <Route path="/comuboard/:id" element={<ComuqnaPage />} />
          <Route path="/dealboard" element={<DealboardPage />} />
          <Route path="/dealboard/:id" element={<DealqnaPage />} />
          <Route path="/comuwrite" element={<ComuwritePage />} />
          <Route path="/idsearch" element={<IdsearchPage />} />
          <Route path="/pwsearch" element={<PwsearchPage />} />
          <Route path="/pwreplace" element={<PwreplacePage />} />
          <Route path="/pwreplaceok" element={<PwreplacepokPage />} />
          <Route path="/noticeboard" element={<NoticeboardPage />} />
        </>
      )}

      {/* Fallback */}
      <Route path="*" element={<Navigate to={isAuth ? '/' : '/login'} replace />} />
    </Routes>
  );
}
