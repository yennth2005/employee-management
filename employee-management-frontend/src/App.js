import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của Toastify
import Layout from './components/Layout';
import MainLayout from './layouts/MainLayout';
// import DepartmentPage from './pages/Departments';
import Department from './components/Department';
import Positions from './pages/Positions';
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<MainLayout />} />
          <Route path="/employees" element={<div>Employees Page</div>} />
          <Route path="/departments" element={< Department/>} />
          <Route path="/positions" element={< Positions/>} />
          <Route path="/reports" element={<div>Reports Page</div>} />
          <Route path="/settings" element={<div>Settings Page</div>} />
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right" // Vị trí thông báo
        autoClose={3000} // Tự động đóng sau 3 giây
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
};

export default App;