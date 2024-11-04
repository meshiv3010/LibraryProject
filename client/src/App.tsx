import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LogIn from "./pages/LoginPage/LoginPage";
import ManagementPage from "./pages/managementPage/managementPage";
import style from  './App.module.css'

const queryClient = new QueryClient();

function App() {
  return (
    <div className={style.container}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />                     {/* עמוד הכניסה */}
            <Route path="/login" element={<LogIn />} />               {/* גישה ישירה לכניסה */}
            <Route path="/management" element={<ManagementPage />} /> {/* עמוד ניהול */}
            <Route path="*" element={<Navigate to="/" replace />} />  {/* הפנייה אוטומטית */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
