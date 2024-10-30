"use client";

export default function Header({
  params,
  titleFilter,
  startDateFilter,
  endDateFilter,
  setTitleFilter,
  setStartDateFilter,
  setEndDateFilter,
}: any) {
  return (
    <header id="header">
      <form id="searchForm">
        <div>
          <img src="logo.png" alt="logo" />
        </div>
        <div className="form-group">
          <label htmlFor="searchTitle">Buscar:</label>
          <input
            type="text"
            placeholder="Título"
            id="searchTitle"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="searchDateFrom">Desde Fecha:</label>
          <input
            type="date"
            id="searchDateFrom"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="searchDateTo">Hasta Fecha:</label>
          <input
            type="date"
            id="searchDateTo"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </div>
      </form>
      <div>
        {params.map((book: any) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.summary}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
