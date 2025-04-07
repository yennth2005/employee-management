// src/components/positions/PositionCreateForm.jsx
import React from 'react';

const PositionCreateForm = ({
  departments,
  departmentId,
  name,
  baseSalary,
  setDepartmentId,
  setName,
  setBaseSalary,
  handleCreate,
  onCancel, // Nhận prop onCancel
}) => {
  return (
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
        <div className="col-md-12 text-end">
          <button type="submit" className="btn btn-primary me-2">
            Thêm
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Hủy
          </button>
        </div>
      </div>
    </form>
  );
};

export default PositionCreateForm;