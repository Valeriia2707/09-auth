import { api } from "./api";
import type { Note, NoteFormValues } from "@/types/note";
import type { User } from "@/types/user";

export interface NoteRes {
  notes: Note[];
  totalPages: number;
}

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SessionRequest = {
  success: boolean;
};

export type UpdateMeRequest = {
  username: string;
};



export async function fetchNotes(
  currentPage: number,
  query?: string,
  tag?: string
): Promise<NoteRes> {
  const res = await api.get<NoteRes>("/notes", {
    params: { page: currentPage, perPage: 12, search: query, tag: tag },
  });
  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(values: NoteFormValues): Promise<Note> {
  const res = await api.post<Note>("/notes", values);
  return res.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}


export async function register(data: RegisterRequest): Promise<User> {
  const res = await api.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: LoginRequest): Promise<User> {
  const res = await api.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<boolean> {
  const res = await api.get<SessionRequest>("/auth/session");
  return res.data.success;
}

export async function getMe(): Promise<User> {
  const res = await api.get<User>("/users/me");
  return res.data;
}

export async function updateMe(values: UpdateMeRequest): Promise<User> {
  const res = await api.patch<User>("/users/me", values);
  return res.data;
}