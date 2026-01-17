import axios from "axios";
import { Note, NoteFormValues } from "@/types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const apiClient = axios.create({
  baseURL: 'https://next-v1-notes-api.goit.study',
  withCredentials: true, 
});

const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, 
});

export interface NoteRes {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  currentPage: number,
  query?: string,
  tag?: string
): Promise<NoteRes> {
  const res = await apiClient.get<NoteRes>("", {
    params: { page: currentPage, perPage: 12, search: query, tag: tag },
  });
  return res.data;
}

export async function createNote(values: NoteFormValues): Promise<Note> {
  const res = await apiClient.post<Note>("", values);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await apiClient.delete<Note>(`/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await apiClient.get<Note>(`/${id}`);
  return res.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

