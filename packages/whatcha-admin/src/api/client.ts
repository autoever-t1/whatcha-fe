import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080/api"
    : "https://api.whatcha.site/api";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",

  },
  withCredentials: true, // 쿠키 및 인증 정보 전송을 위해 설정
});

export default client;
