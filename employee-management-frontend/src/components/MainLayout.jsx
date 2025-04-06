// src/components/MainContent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Đăng ký các thành phần cần thiết cho Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainContent = () => {
  // Dữ liệu cho biểu đồ
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [40, 50, 45, 60, 55, 100],
        fill: true,
        backgroundColor: 'rgba(0, 206, 201, 0.2)',
        borderColor: '#00cec9',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        ticks: {
          stepSize: 20,
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="main-content">
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card-custom">
            <div className="d-flex align-items-center">
              <i className="fas fa-users me-3"></i>
              <div>
                <h3>Total Employees</h3>
                <p>150 <span className="trend-up">+8.5%</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-custom">
            <div className="d-flex align-items-center">
              <i className="fas fa-building me-3"></i>
              <div>
                <h3>Departments</h3>
                <p>5 <span className="trend-down">-8.5%</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-custom">
            <div className="d-flex align-items-center">
              <i className="fas fa-project-diagram me-3"></i>
              <div>
                <h3>Active Projects</h3>
                <p>12 <span className="trend-new">ADD NEW</span></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-custom">
            <div className="d-flex align-items-center">
              <i className="fas fa-tasks me-3"></i>
              <div>
                <h3>Pending Tasks</h3>
                <p>8 <span className="trend-up">+8.5%</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card-custom">
            <h3>Revenue Report</h3>
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-custom">
            <h3>Best Selling Product</h3>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Orders</th>
                  <th>Stock</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Aata Buscuit</td>
                  <td>$29.00</td>
                  <td>62</td>
                  <td>510</td>
                  <td>$1,798</td>
                </tr>
                <tr>
                  <td>Aata Buscuit</td>
                  <td>$29.00</td>
                  <td>62</td>
                  <td>510</td>
                  <td>$1,798</td>
                </tr>
                <tr>
                  <td>Aata Buscuit</td>
                  <td>$29.00</td>
                  <td>62</td>
                  <td>510</td>
                  <td>$1,798</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;