// import Main from "./components/Main/Main";
import Landing from "./components/Landing/Landing";
import TeacherLogin from "./components/Login/TeacherLogin";
import StudentLogin from "./components/Login/StudentLogin";
import ParentLogin from "./components/Login/ParentLogin";
// import Settings from "./components/Settings/Settings";
import TeacherRegister from "./components/Register/TeacherRegister";
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Main = lazy(() => import("./components/Main/Main")); // Lazy load Main component
const Settings= lazy(() => import("./components/Settings/Settings")); // Lazy load Settings component

function App() {
  return (
    <div className="App d-flex">
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/teacherLogin" element={<TeacherLogin />} />
          <Route path="/studentLogin" element={<StudentLogin />} />
          <Route path="/parentLogin" element={<ParentLogin />} />
          <Route path="/teacherRegister" element={<TeacherRegister />} />
          {/* Lazy load Main and Settings components */}
          
          <Route path="/main" element={<Suspense fallback={<div>Loading...</div>}><Main /></Suspense>}  />
          <Route path="/settings" element={<Suspense fallback={<div>Loading...</div>}><Settings /></Suspense>}  />
          {/* <Route path="/settings" element={<SettingsLazy />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
} 

export default App;
