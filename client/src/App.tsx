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
            <Route path="/" element={<LogIn />} />                     {/* Login page */}
            <Route path="/login" element={<LogIn />} />               {/* Quick access to login */}
            <Route path="/management" element={<ManagementPage />} /> {/* management page */}
            <Route path="*" element={<Navigate to="/" replace />} />  {/* automatic reference */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;