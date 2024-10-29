import LogIn from './pages/LoginPage/LoginPage';
import ManagementPage from './pages/managementPage/managementPage';
import style from './App.module.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <div className={style.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />                     {/* עמוד הכניסה */}
          <Route path="/login" element={<LogIn />} />               {/* גישה ישירה לכניסה */}
          <Route path="/management" element={<ManagementPage />} /> {/* עמוד ניהול */}
          <Route path="*" element={<Navigate to="/" replace />} />  {/* הפנייה אוטומטית */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
