import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";

import HomePage from "./pages/front/HomePage";
import FrontLayout from "./components/layout/front";
import AdminLayout from "./components/layout/admin";
import NoutFound from "./pages/public/NoutFound";

import LoginPage from "./pages/public/LoginPage";

import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";


import { AuthContext } from "./context/AuthContext";

import './App.css'

function App() {
  const { isAuthenticated } = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<HomePage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
        </Route>
        <Route path="*" element={<NoutFound />} />
        {isAuthenticated ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="skills" element={<SkillsPage />} />
          </Route>
        ) : null}
      </Routes>
    </BrowserRouter>
  )
}

export default App
