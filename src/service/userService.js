import { apiFetch } from "./api";

export const getUsers = async () => {
    return await apiFetch("/user/getAllCustomers");
};

export const getUserById = async (id) => {
    return await apiFetch(`/user/getUser/${id}`);
};