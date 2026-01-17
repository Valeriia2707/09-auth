import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Note | NoteHub",
  description: "Draft and create your new note here.",
  openGraph: {
    title: "Create New Note | NoteHub",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    url: `https://08-zustand-swart-two.vercel.app/notes/action/create`,
    description: "Draft and create your new note here.",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
