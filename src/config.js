let BASE_URL = process.env.REACT_APP_BACKEND_URL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:4000"; // ✅ Use local backend in dev
}

export { BASE_URL };
