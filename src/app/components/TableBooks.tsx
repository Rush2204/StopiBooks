"use client";

import { useState, useEffect } from "react";

export default function TableBooks() {
  const [books, setBooks] = useState<any>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        if (res.ok) {
          const data = await res.json();
          console.log("libros", data);
          setBooks(data);
        } else {
          console.error("Error al obtener los libros");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    const interval = setInterval(fetchBooks, 5000);
    return () => clearInterval(interval);

    fetchBooks();
  }, []);

  return (
    <div className="sectionregistros">
      <h2>Registros</h2>

      <table id="bookTable">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Autor</th>
            <th>Genero</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book: any) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.publishedAt}</td>
              <td>{book.author?.name}</td>
              <td>{book.genre?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
