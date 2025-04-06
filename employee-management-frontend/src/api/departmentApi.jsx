import axiosClient from "./axiosClient";

const departmentApi = {
    getAll: () => axiosClient.get("departments"),
    create: (data) => axiosClient.post("departments", data),
};

export default departmentApi;
