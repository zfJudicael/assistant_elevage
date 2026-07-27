import { apiClient } from "./client";
import type { CurrentUser, DashboardStats } from "../types";

// Expected backend routes (adjust the paths here if your API differs):
//   GET /me               -> CurrentUser
//   GET /stats/overview   -> DashboardStats

export const userApi = {
  getCurrentUser: (signal?: AbortSignal) => apiClient.get<CurrentUser>("/me", signal),
};

export const statsApi = {
  getOverview: (signal?: AbortSignal) => apiClient.get<DashboardStats>("/stats/overview", signal),
};
