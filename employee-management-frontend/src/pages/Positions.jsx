// src/pages/Positions.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
import {
  getDepartments,
  getPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from "../services/positionService";
import PositionList from "../components/positions/PositionList";
import PositionFilter from "../components/positions/PositionFilter";
import PositionCreateForm from "../components/positions/PositionCreateForm";
import PositionImportForm from "../components/positions/PositionImportForm";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [name, setName] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [editId, setEditId] = useState(null);
  const [editDepartmentId, setEditDepartmentId] = useState("");
  const [editName, setEditName] = useState("");
  const [editBaseSalary, setEditBaseSalary] = useState("");
  const [filterDepartmentId, setFilterDepartmentId] = useState("");
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const importFormRef = useRef(null); // Tham chiếu đến form import

  const fetchDepartmentsData = useCallback(async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách danh mục!");
    }
  }, []);

  const fetchPositionsData = useCallback(async () => {
    try {
      const data = await getPositions(filterDepartmentId);
      setPositions(data);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách vị trí!");
    }
  }, [filterDepartmentId]);

  useEffect(() => {
    fetchDepartmentsData();
    fetchPositionsData();
  }, [fetchDepartmentsData, fetchPositionsData]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!departmentId || !name.trim() || !baseSalary) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      const newPosition = await createPosition({
        department_id: departmentId,
        name,
        base_salary: baseSalary,
      });
      setPositions([...positions, newPosition]);
      setDepartmentId("");
      setName("");
      setBaseSalary("");
      setIsCreateFormVisible(false); // Ẩn form sau khi tạo thành công
      fetchPositionsData(); // Re-fetch to update the list
      toast.success("Thêm vị trí thành công!");
    } catch (error) {
      toast.error("Lỗi khi thêm vị trí!");
    }
  };

  const handleUpdate = async (id) => {
    if (!editDepartmentId || !editName.trim() || !editBaseSalary) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    try {
      const updatedPosition = await updatePosition(id, {
        department_id: editDepartmentId,
        name: editName,
        base_salary: editBaseSalary,
      });
      setPositions(
        positions.map((pos) => (pos.id === id ? updatedPosition : pos))
      );
      setEditId(null);
      setEditDepartmentId("");
      setEditName("");
      setEditBaseSalary("");
      fetchPositionsData(); // Re-fetch to update the list
      toast.success("Cập nhật vị trí thành công!");
    } catch (error) {
      toast.error("Lỗi khi cập nhật vị trí!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePosition(id);
      setPositions(positions.filter((pos) => pos.id !== id));
      fetchPositionsData(); // Re-fetch to update the list
      toast.success("Xóa vị trí thành công!");
    } catch (error) {
      toast.error("Lỗi khi xóa vị trí!");
    }
  };

  const startEdit = (pos) => {
    setEditId(pos.id);
    setEditDepartmentId(pos.department_id);
    setEditName(pos.name);
    setEditBaseSalary(pos.base_salary);
  };

  const clearFilter = () => {
    setFilterDepartmentId("");
    toast.info("Đã xóa bộ lọc!");
  };

  const toggleCreateForm = () => {
    setIsCreateFormVisible(!isCreateFormVisible);
  };

  const openImportModal = () => {
    setIsImportModalVisible(true);
  };

  const closeImportModal = () => {
    setIsImportModalVisible(false);
  };

  const handleImportSubmit = () => {
    if (importFormRef.current) {
      importFormRef.current.handleSubmit(); // Gọi hàm submit của form con
      closeImportModal(); // Đóng modal sau khi submit
    }
  };

  return (
    <div className="main-content">
      <h2 className="mb-4">Chức vụ</h2>

      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={toggleCreateForm}>
          {isCreateFormVisible ? "Ẩn Form Thêm" : "Thêm Vị Trí"}
        </button>
        <button className="btn btn-success" onClick={openImportModal}>
          Import 
        </button>
      </div>

      {isCreateFormVisible && (
        <PositionCreateForm
          departments={departments}
          departmentId={departmentId}
          name={name}
          baseSalary={baseSalary}
          setDepartmentId={setDepartmentId}
          setName={setName}
          setBaseSalary={setBaseSalary}
          handleCreate={handleCreate}
          onCancel={toggleCreateForm} // Thêm prop để ẩn form từ component con
        />
      )}

      {isImportModalVisible && (
        <div
          className="modal"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Import chức vụ từ Excel</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeImportModal}
                ></button>
              </div>
              <div className="modal-body">
                <PositionImportForm
                  fetchPositions={fetchPositionsData}
                  ref={importFormRef}
                />{" "}
                {/* Thêm ref */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeImportModal}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleImportSubmit}
                >
                  {" "}
                  {/* Nút Import */}
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <PositionFilter
        departments={departments}
        filterDepartmentId={filterDepartmentId}
        setFilterDepartmentId={setFilterDepartmentId}
        clearFilter={clearFilter}
      />

      <PositionList
        positions={positions}
        departments={departments}
        editId={editId}
        editDepartmentId={editDepartmentId}
        editName={editName}
        editBaseSalary={editBaseSalary}
        startEdit={startEdit}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        setEditId={setEditId}
        setEditDepartmentId={setEditDepartmentId}
        setEditName={setEditName}
        setEditBaseSalary={setEditBaseSalary}
      />
    </div>
  );
};

export default Positions;
