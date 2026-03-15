import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import FarmDetailPage from './pages/FarmDetailPage.jsx';
import './App.css'
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="farm/:id" element={<FarmDetailPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
