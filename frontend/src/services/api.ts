import axios from 'axios';
import type { IGroup } from '../types';

// Configuration de base (optionnel mais recommandé)
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // ← change par ton URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET
export const getGroups = async (): Promise<IGroup[]> => {
  try {
    const response = await api.get('/groups');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postGroup = async (groupData: Partial<IGroup>): Promise<IGroup> => {
  try {
    const response = await api.post('/groups', groupData);
    return response.data;
  } catch (error) {
    throw error;
  }
}