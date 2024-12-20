import axiosInstance from "./axiosInstance";

export const getUsers = (page, pageSize, search) => axiosInstance.get("/users", { params: { page, pageSize, search } });

export const getUserById = (id) => axiosInstance.get(`/users/${id}`);

export const saveUser = (user) => axiosInstance.post("/users/save", user);

export const updateUser = (user) => axiosInstance.post("/users/update", user);

export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);
