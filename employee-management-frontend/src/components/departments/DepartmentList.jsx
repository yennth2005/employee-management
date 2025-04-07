import React, { useEffect, useState } from 'react';
import { getDepartments } from '../services/departmentService';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Không thể tải danh sách phòng ban');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        📋 Danh sách phòng ban
      </h2>

      {loading ? (
        <p className="text-gray-500">⏳ Đang tải dữ liệu...</p>
      ) : departments.length > 0 ? (
        <ul className="space-y-4">
          {departments.map((dept) => (
            <li
              key={dept.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-700">
                  🏢 {dept.name}
                </span>
                <button className="text-sm text-red-500 hover:text-red-700">
                  Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Không có phòng ban nào được tìm thấy.</p>
      )}
    </div>
  );
};

export default DepartmentList;
