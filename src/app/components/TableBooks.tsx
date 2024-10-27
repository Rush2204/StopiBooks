export default function TableBooks() {
  return (
    <div className="sectionregistros">
      <h2>Registros</h2>
      <button id="exportAllButton" type="button">
        Exportar todas las notas en PDF
      </button>

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
        {/* Section to Add Book */}
      </table>
    </div>
  );
}
