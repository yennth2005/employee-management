// src/components/positions/PositionImportForm.jsx
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';
import { importPositionsFromExcel } from '../../services/positionService';

const PositionImportForm = forwardRef(({ fetchPositions }, ref) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Vui lòng chọn file để nhập!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await importPositionsFromExcel(formData);
      toast.success('Import thành công!');
      fetchPositions(); // reload lại danh sách
    } catch (error) {
      toast.error('Lỗi khi import!');
      console.error(error);
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <form>
      <div className="row mb-3">
        <div className="col-md-12">
          <input 
            type="file" 
            name="file" 
            accept=".xlsx,.xls,.csv" 
            className="form-control" 
            onChange={handleFileChange}
            required 
          />
        </div>
      </div>
    </form>
  );
});

export default PositionImportForm;