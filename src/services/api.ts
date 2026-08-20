// Base API Service configuration prepared for Laravel RESTful API backend
const envApiUrl = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env["VITE_API_BASE_URL"])
  ? (import.meta.env["VITE_API_BASE_URL"] as string)
  : (typeof process !== "undefined" && process.env ? (process.env["VITE_API_BASE_URL"] || "") : "");

export const API_CONFIG = {
  BASE_URL: envApiUrl || "http://localhost:8000/api/v1",
  USE_MOCK: true, // Toggle flag: set to false when connecting to Laravel Backend API
};

export async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (API_CONFIG.USE_MOCK) {
    throw new Error("Currently operating in mock fallback mode");
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Laravel API Error: ${response.statusText}`);
  }

  return response.json();
}
