"use client";

import { useState, useEffect } from "react";
import EditBook from "./EditBook";

export default function TableBooks() {
  const [books, setBooks] = useState<any>([]);
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<string>("");

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

  // Función para eliminar un libro
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES"); // formato día/mes/año en español
  };

  const editBook = (bookId: string) => {
    setSelectedBook(bookId);
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
    setSelectedBook("");
  };

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
              <td>{formatDate(book.publishedAt)}</td>
              <td>{book.author?.name}</td>
              <td>{book.genre?.name}</td>
              <td>
                <button className="delete" onClick={() => deleteBook(book.id)}>
                  Eliminar
                </button>
                <button className="edit" onClick={() => editBook(book.id)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditBook
        visibility={popupVisibility}
        close={closePopup}
        bookId={selectedBook}
      />
    </div>
  );
}
