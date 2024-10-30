"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import SidebarSection from "./SidebarSection";
import TableBooks from "./TableBooks";

export default function MainSection() {
  const [books, setBooks] = useState<any>([]);
  const [params, setParams] = useState<any>([]);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      const queryParams = new URLSearchParams();
      if (titleFilter) queryParams.append("title", titleFilter);
      if (startDateFilter) queryParams.append("startDate", startDateFilter);
      if (endDateFilter) queryParams.append("endDate", endDateFilter);

      try {
        const res = await fetch(`/api/books?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setBooks(data);
        } else {
          console.error("Error al obtener los libros");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchBooks();

    const interval = setInterval(fetchBooks, 5000);
    return () => clearInterval(interval);
  }, [titleFilter, startDateFilter, endDateFilter]);

  const deleteBook = async (bookId: number) => {
    try {
      const res = await fetch(`/api/books/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookId }),
      });
      if (res.ok) {
        setBooks((prevBooks: any) =>
          prevBooks.filter((book: any) => book.id !== bookId)
        );
      } else {
        console.error("Error al eliminar el libro");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <>
      <Header
        params={params}
        titleFilter={titleFilter}
        startDateFilter={startDateFilter}
        endDateFilter={endDateFilter}
        setTitleFilter={setTitleFilter}
        setStartDateFilter={setStartDateFilter}
        setEndDateFilter={setEndDateFilter}
      />
      <div id="crud">
        <SidebarSection />
        <TableBooks books={books} deleteBook={deleteBook} />
      </div>
    </>
  );
}
