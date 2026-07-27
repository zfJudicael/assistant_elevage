import { apiClient } from "./client";
import type { Group, NewGroupInput } from "../types";

// Expected backend routes (adjust the paths here if your API differs —
// this is the only file that needs to change):
//   GET    /groups            -> Group[]
//   GET    /groups/:id        -> Group
//   POST   /groups            -> Group (created)

export const groupsApi = {
    list: (signal?: AbortSignal) => apiClient.get<Group[]>("/groups", signal),

    getById: (id: string, signal?: AbortSignal) =>
        apiClient.get<Group>(`/groups/${encodeURIComponent(id)}`, signal),

    create: (input: NewGroupInput, signal?: AbortSignal) =>
        apiClient.post<Group>("/groups", input, signal),
};
