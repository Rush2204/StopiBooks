"use client";

import { useState, FormEvent } from "react";

export default function NewAuthor({ visibility, close }: any) {
  const [authorName, setAuthorName] = useState<string>("");
  const [authorBio, setAuthorBio] = useState<string>("");

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
              <button id="saveButton">Guardar</button>
              <button id="cancelButton" onClick={close}>
                Cancelar
              </button>
              <button id="readButton">Leer Texto</button>
              <button id="voiceButton2" className="vbutton">
                🎤 Voz
              </button>
              <form id="imagehtmlForm">
                <button type="submit">Imagen a texto</button>
                <input type="file" id="imageInput" accept="image/*" required />
              </form>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
