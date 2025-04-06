import React, { useState } from "react";
import departmentApi from "../api/departmentApi";

const AddDepartment = ({ onAdded }) => {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await departmentApi.create({ name });
            onAdded(); // Gọi lại API sau khi thêm thành công
            setName("");
        } catch (error) {
            console.error("Error adding department:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên phòng ban"
                required
            />
            <button type="submit">Thêm</button>
        </form>
    );
};

export default AddDepartment;
