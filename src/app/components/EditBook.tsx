"use client";

import { useState, FormEvent, useEffect, useRef } from "react";

export default function EditBook({ visibility, close, bookId }: any) {
  const [bookName, setBookName] = useState<string>("");
  const [bookDate, setBookDate] = useState<Date | null>(null);
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookGenre, setBookGenre] = useState<string>("");
  const [bookSummary, setBookSummary] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");
  const [genreId, setGenreId] = useState<string>("");
  const [authors, setAuthors] = useState<any>();
  const [genres, setGenres] = useState<any>();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const voiceButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Book date before submit", bookDate);

    const res = await fetch(`/api/books`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: bookId,
        title: bookName,
        publishedAt: bookDate,
        summary: bookSummary,
        authorId,
        genreId,
      }),
    });

    if (res.ok) {
      // Reinicia el formulario si deseas limpiar los campos después de agregar el autor
      setBookName("");
      setBookDate(null);
      setBookAuthor("");
      setBookGenre("");
      setBookSummary("");
      close(); // Cierra el modal si todo está bien
    } else {
      console.error("Error al agregar autor");
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${bookId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBookName(data.title);
        const publishedAtDate = data.publishedAt
          ? new Date(data.publishedAt)
          : null;
        setBookDate(publishedAtDate);
        setAuthorId(data.authorId);
        setGenreId(data.genreId);
        setBookAuthor(data.author?.name || "");
        setBookGenre(data.genre?.name || "");
        setBookSummary(data.summary);
      } catch (error) {
        console.log(error);
      }
    };

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

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Carga las voces si ya están disponibles
    loadVoices();

    fetchAuthors();
    fetchGenres();
    fetchBook();
  }, [bookId]);

  const writeWithVoice = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";
    recognition.interimResults = false; // Solo resultados finales
    recognition.maxAlternatives = 1;

    // Indicar que la grabación está en curso
    if (voiceButtonRef.current) {
      voiceButtonRef.current.classList.add("active");
      voiceButtonRef.current.textContent = "🎤 Grabando...";
    }

    recognition.start();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setBookSummary(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionError) => {
      alert("Error en reconocimiento de voz: " + event.error);
    };

    recognition.onend = () => {
      // Volver el botón a su estado normal
      if (voiceButtonRef.current) {
        voiceButtonRef.current.classList.remove("active");
        voiceButtonRef.current.textContent = "🎤 Hablar";
      }
    };
  };

  const readText = () => {
    const utterance = new SpeechSynthesisUtterance(bookSummary);
    utterance.lang = "es-ES";
    window.speechSynthesis.speak(utterance);
  };

  return (
    visibility && (
      <div id="editModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={close}>
            &times;
          </span>
          <h2>Editar Libro</h2>
          <form onSubmit={handleSubmit}>
            <div className="htmlForm-group">
              <label htmlFor="editName">Titulo:</label>
              <input
                type="text"
                id="editName"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                required
              />
            </div>
            <div className="htmlForm-group">
              <label htmlFor="editDate">Fecha:</label>
              <input
                type="date"
                id="editDate"
                value={bookDate ? bookDate.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setBookDate(e.target.value ? new Date(e.target.value) : null)
                }
                required
              />
            </div>
            <div className="htmlForm-group">
              <label htmlFor="editDate">Autor:</label>
              <select
                id="bookAuthor"
                required
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona un autor
                </option>
                {authors?.map((author: any) => (
                  <option
                    key={author.id}
                    value={author.id}
                    selected={authorId === author.id}
                  >
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="htmlForm-group">
              <label htmlFor="editDate">Genero:</label>
              <select
                id="bookGenre"
                required
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
              >
                <option value="" disabled>
                  Selecciona un género
                </option>
                {genres?.map((genre: any) => (
                  <option
                    key={genre.id}
                    value={genre.id}
                    selected={genreId === genre.id}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="htmlForm-group">
              <label htmlFor="editContent">Resumen:</label>
              <textarea
                id="editContent"
                rows={20}
                cols={80}
                value={bookSummary}
                onChange={(e) => setBookSummary(e.target.value)}
              ></textarea>
            </div>
            <div className="htmlForm-group">
              <button type="submit" id="saveButton">
                Guardar
              </button>
              <button id="cancelButton" onClick={close}>
                Cancelar
              </button>
              <button id="readButton" type="button" onClick={readText}>
                Leer Texto
              </button>
              <button
                id="voiceButton2"
                className="vbutton"
                type="button"
                onClick={writeWithVoice}
              >
                🎤 Voz
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
