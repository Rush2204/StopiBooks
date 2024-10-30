"use client";
import { useState, useEffect } from "react";

export default function Header() {
  const [params, setParams] = useState<any>([]);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const fetchBooks = async () => {
    const queryParams = new URLSearchParams();
    if (titleFilter) queryParams.append("title", titleFilter);
    if (startDateFilter) queryParams.append("startDate", startDateFilter);
    if (endDateFilter) queryParams.append("endDate", endDateFilter);

    try {
      const response = await fetch(`/api/books?${queryParams.toString()}`);
      const data = await response.json();
      setParams(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [titleFilter, startDateFilter, endDateFilter]);

  return (
    <header id="header">
      <form id="searchForm">
        <div>
          <img src="Media/logo.png" alt="logo" />
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
