"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchNotes } from "@/lib/api/clientApi";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

export default function NotesClient({ activeTag }: { activeTag?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const { data } = useQuery({
    queryKey: ["notes", currentPage, debouncedQuery, activeTag],
    queryFn: () => fetchNotes(currentPage, debouncedQuery, activeTag),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          query={query}
          setState={(newQuery: string) => setQuery(newQuery)}
        />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create Note +
        </Link>
      </header>

      {data?.notes && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
