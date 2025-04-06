// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainLayout from "./components/MainLayout";
// import Dashboard from "./pages/Dashboard";
// import Departments from "./pages/Departments";
// import Employees from "./pages/Employees";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="departments" element={<Departments />} />
//           <Route path="employees" element={<Employees />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của Toastify
import Layout from './components/Layout';
import MainLayout from './components/MainLayout';
// import DepartmentPage from './pages/Departments';
import Department from './components/Department';
import Positions from './components/Positions';
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