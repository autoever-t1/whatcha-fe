import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const authAxios = axios.create({
  baseURL: serverUrl,
});

authAxios.interceptors.request.use((config) => {
  const at = sessionStorage.getItem("at");

  if (at) {
    config.headers.setAuthorization(`Bearer ${at}`);
  }

  return config;
});

const noAuthAxios = axios.create({
  baseURL: serverUrl,
});

export { authAxios, noAuthAxios };
