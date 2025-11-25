import api from "./axios";

/**
 * Fetches a collection from the backend.
 * @param {string} endpoint
 * @param {object} [params]
 */
export const listResource = async (endpoint, params = {}) => {
  const { data } = await api.get(endpoint, { params });
  return data;
};

/**
 * Creates a new entity.
 */
export const createResource = async (endpoint, entityKey, payload) => {
  const { data } = await api.post(endpoint, { [entityKey]: payload });
  return data;
};

/**
 * Updates an entity by id.
 */
export const updateResource = async (endpoint, entityKey, id, payload) => {
  const { data } = await api.put(`${endpoint}/${id}`, { [entityKey]: payload });
  return data;
};

/**
 * Removes an entity.
 */
export const deleteResource = async (endpoint, id) => {
  await api.delete(`${endpoint}/${id}`);
};

/**
 * Utility to pre-fetch select options (used by select inputs).
 */
export const fetchOptions = async ({
  endpoint,
  labelKey = "descricao",
  valueKey = "id",
  labelFn,
}) => {
  const collection = await listResource(endpoint);
  return collection.map((item) => ({
    value: item[valueKey],
    label: labelFn ? labelFn(item) : item[labelKey],
    original: item,
  }));
};

/**
 * Normalizes backend error payloads so the UI can present a consistent message.
 */
export const extractError = (error) => {
  const apiMessage = error?.response?.data;

  if (!apiMessage) return error.message;

  if (typeof apiMessage === "string") {
    return apiMessage;
  }

  if (Array.isArray(apiMessage?.errors)) {
    return apiMessage.errors.join(", ");
  }

  if (typeof apiMessage === "object") {
    return Object.values(apiMessage).flat().join(", ");
  }

  return "Não foi possível processar a requisição.";
};
