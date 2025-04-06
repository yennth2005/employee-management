import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Nếu bạn dùng Tailwind hoặc CSS riêng
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import './components/styles/custom.css'; // Đảm bảo đường dẫn đúng
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
