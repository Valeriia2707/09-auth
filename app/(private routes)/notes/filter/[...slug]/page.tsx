import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api";
import css from "./NotesPage.module.css";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const activeFilter = slug?.[0] || "All";

  const title = `Notes Filter: ${activeFilter} | NoteHub`;
  const description = `Viewing all notes with the tag: ${activeFilter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-swart-two.vercel.app/notes/filter/${activeFilter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}

export default async function MainNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugValue = slug?.[0];

  const activeTag = slugValue === "all" || !slugValue ? undefined : slugValue;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", activeTag],
    queryFn: () => fetchNotes(1, "", activeTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={css.app}>
        <NotesClient activeTag={activeTag} />
      </div>
    </HydrationBoundary>
  );
}
