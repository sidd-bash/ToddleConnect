import Landing from "./components/Landing/Landing";
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Main = lazy(() => import("./components/Main/Main"));
const Settings= lazy(() => import("./components/Settings/Settings")); 
const TeacherRegister = lazy(()=>import("./components/Register/TeacherRegister"));
const StudentRegister = lazy(()=>import("./components/Register/StudentRegister"));
const ParentRegister = lazy(()=>import("./components/Register/ParentRegister"));
const TeacherLogin = lazy(()=>import("./components/Login/TeacherLogin"))
const StudentLogin = lazy(()=>import("./components/Login/StudentLogin"))
const ParentLogin = lazy(()=>import("./components/Login/ParentLogin"))

function App() {
  return (
    <div className="App d-flex">
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/teacherlogin" element={<Suspense fallback={<div>Loading...</div>}><TeacherLogin /></Suspense>} />
          <Route path="/studentlogin" element={<Suspense fallback={<div>Loading...</div>}><StudentLogin /></Suspense>} />
          <Route path="/parentlogin" element={<Suspense fallback={<div>Loading...</div>}><ParentLogin /></Suspense>} />
          <Route path="/teacherregister" element={<Suspense fallback={<div>Loading...</div>}><TeacherRegister /></Suspense>} />
          <Route path="/studentregister" element={<Suspense fallback={<div>Loading...</div>}><StudentRegister /></Suspense>} />
          <Route path="/parentregister" element={<Suspense fallback={<div>Loading...</div>}><ParentRegister /></Suspense>} />
          <Route path="/main" element={<Suspense fallback={<div>Loading...</div>}><Main /></Suspense>}  />
          <Route path="/settings" element={<Suspense fallback={<div>Loading...</div>}><Settings /></Suspense>}  />
        </Routes>
      </BrowserRouter>
    </div>
  );
} 

export default App;
