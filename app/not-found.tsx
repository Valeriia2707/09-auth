import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | NoteHub",
  description: "The site is not found",
  openGraph: {
    title: "404 | NoteHub",
    description: "The site is not found",
    url: `https://notehub.com/not-found`,
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
