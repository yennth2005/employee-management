import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
  const [name, setName] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [editId, setEditId] = useState(null);
  const [editDepartmentId, setEditDepartmentId] = useState('');
  const [editName, setEditName] = useState('');
  const [editBaseSalary, setEditBaseSalary] = useState('');
  const [filterDepartmentId, setFilterDepartmentId] = useState('');

  useEffect(() => {
    fetchDepartments();
    fetchPositions();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error.response?.data || error.message);
      toast.error('Lỗi khi lấy danh sách danh mục!');
    }
  };

  const fetchPositions = async () => {
    try {
      console.log('Fetching positions with filter:', filterDepartmentId);
      const params = filterDepartmentId ? { department_id: filterDepartmentId } : {};
      const response = await axios.get('http://localhost:8000/api/positions', { params });
      console.log('Fetched positions:', response.data);
      setPositions(response.data);
    } catch (error) {
      console.error('Error fetching positions:', error.response?.data || error.message);
      toast.error('Lỗi khi lấy danh sách vị trí!');
    }
  };

  useEffect(() => {
    fetchPositions();
  }, [filterDepartmentId]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!departmentId || !name.trim() || !baseSalary) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    try {
      console.log('Creating position with data:', { department_id: departmentId, name, base_salary: baseSalary });
      const response = await axios.post('http://localhost:8000/api/positions', {
        department_id: departmentId,
        name,
        base_salary: baseSalary,
      });
      console.log('Create response:', response.data);
      setPositions([...positions, response.data]);
      setDepartmentId('');
      setName('');
      setBaseSalary('');
      fetchPositions();
      toast.success('Thêm vị trí thành công!');
    } catch (error) {
      console.error('Error creating position:', error.response?.data || error.message);
      toast.error('Lỗi khi thêm vị trí!');
    }
  };

  const handleUpdate = async (id) => {
    if (!editDepartmentId || !editName.trim() || !editBaseSalary) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    try {
      console.log('Updating position with id:', id, 'and data:', {
        department_id: editDepartmentId,
        name: editName,
        base_salary: editBaseSalary,
      });
      const response = await axios.put(`http://localhost:8000/api/positions/${id}`, {
        department_id: editDepartmentId,
        name: editName,
        base_salary: editBaseSalary,
      });
      console.log('Update response:', response.data);
      setPositions(
        positions.map((pos) => (pos.id === id ? response.data : pos))
      );
      setEditId(null);
      setEditDepartmentId('');
      setEditName('');
      setEditBaseSalary('');
      fetchPositions();
      toast.success('Cập nhật vị trí thành công!');
    } catch (error) {
      console.error('Error updating position:', error.response?.data || error.message);
      toast.error('Lỗi khi cập nhật vị trí!');
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting position with id:', id);
      const response = await axios.delete(`http://localhost:8000/api/positions/${id}`);
      console.log('Delete response:', response.data);
      setPositions(positions.filter((pos) => pos.id !== id));
      fetchPositions();
      toast.success('Xóa vị trí thành công!');
    } catch (error) {
      console.error('Error deleting position:', error.response?.data || error.message);
      toast.error('Lỗi khi xóa vị trí!');
    }
  };

  const startEdit = (pos) => {
    console.log('Starting edit for position:', pos);
    setEditId(pos.id);
    setEditDepartmentId(pos.department_id);
    setEditName(pos.name);
    setEditBaseSalary(pos.base_salary);
  };

  const clearFilter = () => {
    setFilterDepartmentId('');
    toast.info('Đã xóa bộ lọc!');
  };

  return (
    <div className="main-content">
      <h2 className="mb-4">Positions</h2>

      {/* Bộ lọc theo phòng ban */}
      <div className="mb-4">
        <div className="row align-items-center">
          <div className="col-md-4">
            <select
              className="form-control"
              value={filterDepartmentId}
              onChange={(e) => setFilterDepartmentId(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          {filterDepartmentId && (
            <div className="col-md-2">
              <button className="btn btn-secondary" onClick={clearFilter}>
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Form tạo position */}
      <form onSubmit={handleCreate} className="mb-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <select
              className="form-control"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              required
            >
              <option value="">Chọn danh mục</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tên vị trí"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Lương cơ bản"
              value={baseSalary}
              onChange={(e) => setBaseSalary(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </div>
      </form>


      <form
  onSubmit={async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', e.target.file.files[0]);

    try {
      await axios.post('http://localhost:8000/api/positions/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Import thành công!');
      fetchPositions(); // reload lại danh sách
    } catch (error) {
      toast.error('Lỗi khi import!');
      console.error(error);
    }
  }}
>
  <div className="row mb-3">
    <div className="col-md-6">
      <input type="file" name="file" accept=".xlsx,.xls,.csv" className="form-control" />
    </div>
    <div className="col-md-2">
      <button type="submit" className="btn btn-success">
        Import Excel
      </button>
    </div>
  </div>
</form>

      {/* Bảng hiển thị positions */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Danh Mục</th>
            <th>Tên Vị Trí</th>
            <th>Lương Cơ Bản</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.id}>
              <td>{pos.id}</td>
              <td>
                {editId === pos.id ? (
                  <select
                    className="form-control"
                    value={editDepartmentId}
                    onChange={(e) => setEditDepartmentId(e.target.value)}
                  >
                    <option value="">Chọn danh mục</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  pos.department?.name || 'N/A'
                )}
              </td>
              <td>
                {editId === pos.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  pos.name
                )}
              </td>
              <td>
                {editId === pos.id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={editBaseSalary}
                    onChange={(e) => setEditBaseSalary(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                ) : (
                  `$${parseFloat(pos.base_salary).toFixed(2)}`
                )}
              </td>
              <td>
                {editId === pos.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleUpdate(pos.id)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setEditId(null);
                        setEditDepartmentId('');
                        setEditName('');
                        setEditBaseSalary('');
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => startEdit(pos)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(pos.id)}
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

export default Positions;