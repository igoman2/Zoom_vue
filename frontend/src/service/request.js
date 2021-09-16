import axios from "axios";

// axios 인스턴스 생성
const instance = axios.create({
  //전역으로 사용할 baseURL과 시간 설정
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
});

// 1. 요청 인터셉터 - 2개의 콜백 함수
instance.interceptors.request.use(
  function (config) {
    // 요청 성공 직전 호출
    // axios 설정값 삽입
    return config;
  },
  function (error) {
    // 요청 에러 직전 호출
    return Promise.reject(error);
  }
);

// 2. 응답 인터셉터 - 2개의 콜백 함수
instance.interceptors.response.use(
  function (response) {
    // 응답 성공 직전 호출
    return response;
  },

  function (error) {
    // 응답 에러 직전 호출
    return Promise.reject(error);
  }
);

export default instance;
