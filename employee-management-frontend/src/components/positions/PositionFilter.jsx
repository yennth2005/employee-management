import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
const PositionFilter = ({ departments, filterDepartmentId, setFilterDepartmentId, clearFilter }) => {
  return (
    <div className="mb-4">
      <div className="row align-items-center">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faFilter} />
            </span>
            <select
              className="form-select"
              value={filterDepartmentId}
              onChange={(e) => setFilterDepartmentId(e.target.value)}
            >
              <option value="">Tất cả phòng ban</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {filterDepartmentId && (
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={clearFilter}>
              <FontAwesomeIcon icon={faTimes} /> Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionFilter;