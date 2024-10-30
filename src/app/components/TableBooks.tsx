"use client";

import { useState, useEffect } from "react";
import EditBook from "./EditBook";

export default function TableBooks({ books, deleteBook }: any) {
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<string>("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { timeZone: "UTC" });
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
                <button className="edit" onClick={() => editBook(book.id)}>
                  Editar
                </button>
                <button className="delete" onClick={() => deleteBook(book.id)}>
                  Eliminar
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
