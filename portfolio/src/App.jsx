import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import { useContext } from "react";

import HomePage from "./pages/front/HomePage";
import FrontLayout from "./components/layout/front";
import AdminLayout from "./components/layout/admin";
import NoutFound from "./pages/public/NoutFound";

import LoginPage from "./pages/public/LoginPage";

import DashboardPage from "./pages/admin/DashboardPage";
import SkillsPage from "./pages/admin/SkillsPage";


import { AuthContext } from "./context/AuthContext";

import PortfoliosPage from "./pages/admin/PortfoliosPage";
import UsersPage from "./pages/admin/UsersPage";
import EducationPage from "./pages/admin/EducationPage";

import './App.css'

function App() {
  const { isAuthenticated } = useContext(AuthContext);


  return (
    <BrowserRouter>
      <Switch>
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="*" element={<NoutFound />} />
          {isAuthenticated ? (
            <Route path="/" element={<AdminLayout />}>
              <Route path="dashboards" element={<DashboardPage />} />
              <Route path="portfolio" element={<PortfoliosPage />} />
              <Route path="education" element={<EducationPage />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
          ) : null}
        </Routes>
      </Switch>
    </BrowserRouter>
  )
}

export default App
