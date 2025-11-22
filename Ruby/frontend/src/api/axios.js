import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Network Error") {
      console.error(
        "Network Error: Verifique se o backend está rodando em",
        API_BASE_URL
      );
      if (error.config) {
        console.error(
          "Endpoint chamado:",
          error.config.baseURL + error.config.url
        );
      }
    } else {
      const message = error?.response?.data || error.message;
      console.error("Erro na requisição:", message);
    }
    return Promise.reject(error);
  }
);

export default api;
