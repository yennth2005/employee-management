import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  // Lấy danh sách departments khi component được mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      console.log('Fetching departments...');
      const response = await axios.get('http://localhost:8000/api/departments');
      console.log('Fetched departments:', response.data);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error.response?.data || error.message);
      toast.error('Lỗi khi lấy danh sách danh mục!'); // Thông báo lỗi
    }
  };

  // Tạo department mới
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Tên danh mục không được để trống!'); // Thông báo lỗi
      return;
    }
    try {
      console.log('Creating department with name:', name);
      const response = await axios.post('http://localhost:8000/api/departments', { name });
      console.log('Create response:', response.data);
      setDepartments([...departments, response.data]);
      setName('');
      fetchDepartments(); // Làm mới danh sách
      toast.success('Thêm danh mục thành công!'); // Thông báo thành công
    } catch (error) {
      console.error('Error creating department:', error.response?.data || error.message);
      toast.error('Lỗi khi thêm danh mục!'); // Thông báo lỗi
    }
  };

  // Cập nhật department
  const handleUpdate = async (id) => {
    if (!editName.trim()) {
      toast.error('Tên danh mục không được để trống!'); // Thông báo lỗi
      return;
    }
    try {
      console.log('Updating department with id:', id, 'and name:', editName);
      const response = await axios.put(`http://localhost:8000/api/departments/${id}`, {
        name: editName,
      });
      console.log('Update response:', response.data);
      setDepartments(
        departments.map((dept) => (dept.id === id ? response.data : dept))
      );
      setEditId(null);
      setEditName('');
      fetchDepartments();
      toast.success('Cập nhật danh mục thành công!'); // Thông báo thành công
    } catch (error) {
      console.error('Error updating department:', error.response?.data || error.message);
      toast.error('Lỗi khi cập nhật danh mục!'); // Thông báo lỗi
    }
  };

  // Xóa department
  const handleDelete = async (id) => {
    try {
      console.log('Deleting department with id:', id);
      const response = await axios.delete(`http://localhost:8000/api/departments/${id}`);
      console.log('Delete response:', response.data);
      if(window.confirm('Bạn chắc chưa?')){
          setDepartments(departments.filter((dept) => dept.id !== id));
          fetchDepartments();
          toast.success('Xóa danh mục thành công!'); // Thông báo thành công
      }
    } catch (error) {
      console.error('Error deleting department:', error.response?.data || error.message);
      toast.error('Lỗi khi xóa danh mục!'); // Thông báo lỗi
    }
  };

  // Bắt đầu chỉnh sửa
  const startEdit = (dept) => {
    console.log('Starting edit for department:', dept);
    setEditId(dept.id);
    setEditName(dept.name);
  };

  return (
    <div className="main-content">
      <h2 className="mb-4">Departments</h2>

      {/* Form tạo department */}
      <form onSubmit={handleCreate} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Department name"
            value={name}
            onChange={(e) => {
              console.log('Name input changed:', e.target.value);
              setName(e.target.value);
            }}
            required
          />
          <button type="submit" className="btn btn-primary">
            Add Department
          </button>
        </div>
      </form>

      {/* Bảng hiển thị departments */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>
                {editId === dept.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => {
                      console.log('Edit name input changed:', e.target.value);
                      setEditName(e.target.value);
                    }}
                  />
                ) : (
                  dept.name
                )}
              </td>
              <td>
                {editId === dept.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(dept.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        console.log('Cancel edit for department:', dept.id);
                        setEditId(null);
                        setEditName('');
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => startEdit(dept)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(dept.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departments;