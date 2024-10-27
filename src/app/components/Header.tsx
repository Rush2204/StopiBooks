export default function Header() {
  return (
    <header id="header">
      <form id="searchForm">
        <div>
          <img src="Media/logo.png" alt="logo" />
        </div>
        <div className="form-group">
          <label htmlFor="searchTitle">Buscar:</label>
          <input type="text" placeholder="Título" id="searchTitle" />
        </div>
        <div className="form-group">
          <label htmlFor="searchDateFrom">Desde Fecha:</label>
          <input type="date" id="searchDateFrom" />
        </div>
        <div className="form-group">
          <label htmlFor="searchDateTo">Hasta Fecha:</label>
          <input type="date" id="searchDateTo" />
        </div>
        <div className="form-group">
          <label htmlFor="searchCategory">Autor:</label>
          <input type="text" placeholder="author" id="searchAuthor" />
        </div>
        <div className="form-group">
          <label htmlFor="searchImportance">Genero:</label>
          <select id="searchImportance">
            <option value="">Todas</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedia</option>
            <option value="Horror">Terror</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div className="form-group">
          <button type="button" id="searchButton">
            Buscar
          </button>
        </div>
      </form>

      <form id="recentForm">
        <h2>Búsquedas Recientes:</h2>
        <div id="recentSearches">
          {/* Las búsquedas recientes se mostrarán aquí */}
        </div>
      </form>
    </header>
  );
}
