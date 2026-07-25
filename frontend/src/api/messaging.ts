import { apiClient } from "./client";
import type { Conversation, Technician, IMessage } from "../types";

// Expected backend routes (adjust the paths here if your API differs):
//   GET  /conversations                     -> Conversation[]
//   GET  /technicians                       -> Technician[]
//   GET  /conversations/:id/messages        -> Message[]
//   POST /conversations/:id/messages        -> Message (created)

export const messagingApi = {
  listConversations: (signal?: AbortSignal) =>
    apiClient.get<Conversation[]>("/conversations", signal),

  listTechnicians: (signal?: AbortSignal) =>
    apiClient.get<Technician[]>("/technicians", signal),

  getMessages: (conversationId: number, signal?: AbortSignal) =>
    apiClient.get<IMessage[]>(`/message/${conversationId}`, signal),

  sendMessage: (conversationId: string, message: string, signal?: AbortSignal) =>
    apiClient.post<{data: IMessage}>(`/message/new/${conversationId}`, { 
      message,
      role: "user"
     }, signal),
};
