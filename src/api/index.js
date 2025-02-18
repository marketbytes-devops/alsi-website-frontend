import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://seocompanyinkerala.in/api/",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const response = await axios.post(
          "http://seocompanyinkerala.in/api/token/refresh/",
          { refresh: refreshToken }
        );
        localStorage.setItem("accessToken", response.data.access);
        apiClient.defaults.headers.Authorization = `Bearer ${response.data.access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "*";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
