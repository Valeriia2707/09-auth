import { headers } from "next/headers";
import { api } from "./api";
import { Note } from "@/types/note";
import { User } from "@/types/user";


export interface NoteRes {
  notes: Note[];
  totalPages: number;
}

const getAuthHeaders = async () => {
  const headersList = await headers();
  return {
    headers: {
      cookie: headersList.get("cookie") || "",
    },
  };
};

export const fetchNotes = async (
  page: number,
  search?: string,
  tag?: string,
) => {
  const authHeaders = await getAuthHeaders();
  const res = await api.get<NoteRes>("/notes", {
    ...authHeaders,
    params: { page, perPage: 12, search, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const authHeaders = await getAuthHeaders();
  const res = await api.get<Note>(`/notes/${id}`, authHeaders);
  return res.data;
};

export const getMe = async () => {
  const authHeaders = await getAuthHeaders();
  const res = await api.get<User>("/users/me", authHeaders);
  return res.data;
};

export const checkSession = async () => {
  const authHeaders = await getAuthHeaders();
  const res = await api.get<string>("/auth/session", authHeaders);
  return res.data;
};