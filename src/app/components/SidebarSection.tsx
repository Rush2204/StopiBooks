"use client";

import { useState, FormEvent, useEffect } from "react";
import NewAuthor from "./NewAuthor";

export default function SidebarSection() {
  // Estados para los valores del formulario
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookDate, setBookDate] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookGenre, setBookGenre] = useState<string>("");
  const [authors, setAuthors] = useState<any>();
  const [genres, setGenres] = useState<any>();
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("/api/authors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuthors();
    fetchGenres();
  }, []);

  // Tipo de dato para el evento en el formulario con TypeScript
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: bookTitle,
        publishedAt: bookDate,
        authorId: bookAuthor,
        genreId: bookGenre,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      // Reinicia los campos del formulario después de agregar el libro
      setBookTitle("");
      setBookDate("");
      setBookAuthor("");
      setBookGenre("Selecciona un género");
    } else {
      console.error("Error al agregar el libro");
    }
  };

  const openPopup = () => {
    setPopupVisibility(true);
  };

  const closePopup = () => {
    setPopupVisibility(false);
  };

  return (
    <div className="sectionagregar">
      <h2>Agregar Libro</h2>
      <form id="bookForm" onSubmit={handleSubmit}>
        <div className="htmlForm-group">
          <button id="voiceButton" className="vbutton">
            🎤 Hablar
          </button>
        </div>
        <div className="htmlForm-group">
          <label htmlFor="bookTitle">Título:</label>
          <input
            type="text"
            id="bookTitle"
            required
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </div>
        <div className="htmlForm-group">
          <label htmlFor="bookDate">Fecha:</label>
          <input
            type="date"
            id="bookDate"
            required
            value={bookDate}
            onChange={(e) => setBookDate(e.target.value)}
          />
        </div>
        <div className="htmlForm-group">
          <label htmlFor="bookAuthor">Autor:</label>
          <select
            id="bookAuthor"
            required
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          >
            <option value="" disabled selected>
              Selecciona un autor
            </option>
            {authors?.map((author: any) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          <p onClick={openPopup}>Agregar autor</p>
        </div>
        <div className="htmlForm-group">
          <label htmlFor="bookGenre">Genero:</label>
          <select
            id="bookGenre"
            required
            value={bookGenre}
            onChange={(e) => setBookGenre(e.target.value)}
          >
            <option value="" disabled selected>
              Selecciona un género
            </option>
            {genres?.map((genre: any) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="htmlForm-group">
          <button id="addButton" type="submit">
            Agregar
          </button>
        </div>
      </form>
      <NewAuthor visibility={popupVisibility} close={closePopup} />
    </div>
  );
}