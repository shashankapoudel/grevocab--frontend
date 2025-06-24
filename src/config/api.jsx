// const BASE_URL = "http://localhost:4000/api"; // Update this for production

// export default BASE_URL;


const BASE_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:4000/api"
        : "https://gre-vocab-backend.onrender.com";

export default BASE_URL;