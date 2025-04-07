import React from 'react';

const PositionList = ({
  positions,
  departments,
  editId,
  editDepartmentId,
  editName,
  editBaseSalary,
  startEdit,
  handleUpdate,
  handleDelete,
  setEditId,
  setEditDepartmentId,
  setEditName,
  setEditBaseSalary,
}) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Phòng ban</th>
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
                  <option value="">Chọn phòng ban</option>
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
                    style={{ padding: '10px 20px' }} // Thêm padding cho nút
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
                    style={{ padding: '10px 20px' }} // Thêm padding cho nút
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEdit(pos)}
                    style={{ padding: '10px 20px' }} // Thêm padding cho nút
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(pos.id)}
                    style={{ padding: '10px 20px' }} // Thêm padding cho nút
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
  );
};

export default PositionList;