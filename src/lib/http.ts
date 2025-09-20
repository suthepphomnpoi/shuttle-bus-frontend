import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // ส่ง cookie ข้ามโดเมนให้ session
});
export default http;

// Helper to register 401 handler where router is available (main.js)
export function registerHttp401Handler(handle: (error: any) => Promise<void> | void) {
  http.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = error?.response?.status;
      if (status === 401) {
        await handle(error);
      }
      return Promise.reject(error);
    }
  );
}
