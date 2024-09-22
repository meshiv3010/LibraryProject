import LogIn from './pages/LoginPage/LoginPage';
import ManagementPage from './pages/managementPage/managementPage'; // שים לב לשם הנכון כאן
import style from './App.module.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className={style.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />           {/* עמוד הבית */}
          <Route path="/management" element={<ManagementPage />} /> {/* עמוד ניהול */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

