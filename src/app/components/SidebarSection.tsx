export default function SidebarSection() {
  return (
    <div className="sectionagregar">
      <h2>Agregar Nota</h2>
      <form id="noteForm">
        <div className="htmlForm-group">
          <button id="voiceButton" className="vbutton">
            🎤 Hablar
          </button>
        </div>
        <div className="htmlForm-group">
          <label htmlFor="noteTitle">Título:</label>
          <input type="text" id="noteTitle" required />
        </div>
        <div className="htmlForm-group">
          <label htmlFor="noteDate">Fecha:</label>
          <input type="date" id="noteDate" required />
        </div>
        <div className="htmlForm-group">
          <label htmlFor="noteCategory">Categoría:</label>
          <select id="noteCategory" required>
            <option value="Trabajo">Trabajo</option>
            <option value="Estudio">Estudio</option>
            <option value="Ideas">Ideas</option>
            <option value="Tareas">Tareas</option>
            <option value="Recordatorios">Recordatorios</option>
          </select>
        </div>
        <div className="htmlForm-group">
          <label htmlFor="noteImportance">Importancia:</label>
          <select id="noteImportance" required>
            <option value="Urgente">Urgente</option>
            <option value="Alta prioridad">Alta prioridad</option>
            <option value="Media prioridad">Media prioridad</option>
            <option value="Baja prioridad">Baja prioridad</option>
          </select>
        </div>
        <div className="htmlForm-group">
          <button id="addButton" type="submit">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
