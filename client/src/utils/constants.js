require('dotenv').config();

export function getBaseUrl() {
    return (process.env.NODE_ENV === "development") ? "http://localhost:8008/api" : "";
}