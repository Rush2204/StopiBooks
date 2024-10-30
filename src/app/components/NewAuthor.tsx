"use client";

import { useState, FormEvent, useRef } from "react";

export default function NewAuthor({ visibility, close }: any) {
  const [authorName, setAuthorName] = useState<string>("");
  const [authorBio, setAuthorBio] = useState<string>("");
  const voiceButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log(authorName, authorBio);

    const res = await fetch("/api/authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: authorName,
        bio: authorBio,
      }),
    });

    if (res.ok) {
      console.log("Autor agregado exitosamente");
      // Reinicia el formulario si deseas limpiar los campos después de agregar el autor
      setAuthorName("");
      setAuthorBio("");
      close(); // Cierra el modal si todo está bien
    } else {
      console.error("Error al agregar autor");
    }
  };

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
      console.log("event ", event);
      const transcript = event.results[0][0].transcript;
      setAuthorBio(transcript);
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

  return (
    visibility && (
      <div id="editModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={close}>
            &times;
          </span>
          <h2>Agregar autor</h2>
          <form onSubmit={handleSubmit}>
            <div className="htmlForm-group">
              <label htmlFor="editName">Nombre:</label>
              <input
                type="text"
                id="editName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </div>
            <div className="htmlForm-group">
              <label htmlFor="editContent">Biografía:</label>
              <textarea
                id="editContent"
                rows={20}
                cols={80}
                value={authorBio}
                onChange={(e) => setAuthorBio(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="htmlForm-group">
              <button type="submit" id="saveButton">
                Guardar
              </button>
              <button id="cancelButton" onClick={close}>
                Cancelar
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
