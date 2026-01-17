"use client";
import css from "./NoteForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { NoteFormValues } from "@/types/note";

export interface CreateNoteFormValues {
  title: string;
  content: string;
  tag: string;
}

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
  const { mutate } = useMutation({
    mutationFn: (data: CreateNoteFormValues) => createNote(data),
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NoteFormValues;
    mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/all");

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
