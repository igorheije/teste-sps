import api from "../configs/api";

export const list = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao listar usuários");
  }
};

export const getMe = async () => {
  try {
    const response = await api.get(`/users/me`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar usuário atual"
    );
  }
};

export const get = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao buscar usuário");
  }
};

export const create = async (data) => {
  try {
    const response = await api.post(`/users`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao criar usuário");
  }
};

export const update = async (id, data) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar usuário"
    );
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Erro ao excluir usuário");
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get(`/users/me`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao buscar usuário atual"
    );
  }
};
