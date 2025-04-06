import React, { useState } from "react";
import DepartmentList from "../components/DepartmentList";
import AddDepartment from "../components/AddDepartment";

const DepartmentPage = () => {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh((prev) => !prev);
    };

    return (
        <div>
            <h1>Quản lý phòng ban</h1>
            <AddDepartment onAdded={handleRefresh} />
            <DepartmentList key={refresh} />
        </div>
    );
};

export default DepartmentPage;
