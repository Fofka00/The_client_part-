import React, { useState } from "react";
import "./SummaryCarousel.css"; // стили см. ниже

export default function SummaryCarousel({ summary }) {
  const [start, setStart] = useState(0);
  const visibleCount = 7; // сколько колонок видно одновременно

  const handlePrev = () => setStart(Math.max(0, start - 1));
  const handleNext = () => setStart(Math.min(summary.periods.length - visibleCount, start + 1));

  const visiblePeriods = summary.periods.slice(start, start + visibleCount);

  return (
    <div>
      <h2 style={{fontWeight: 900}}>ОБЩАЯ СВОДКА</h2>
      <div style={{color: "#888", marginBottom: 12}}>Найдено {summary.total.toLocaleString()} вариантов</div>
      <div className="summary-carousel">
        <button className="carousel-arrow" onClick={handlePrev} disabled={start === 0}>&lt;</button>
        <table>
          <thead>
            <tr>
              <th>Период</th>
              {visiblePeriods.map(p => <th key={p.date}>{p.date}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Всего</td>
              {visiblePeriods.map(p => <td key={p.date}>{p.total}</td>)}
            </tr>
            <tr>
              <td>Риски</td>
              {visiblePeriods.map(p => <td key={p.date}>{p.risks}</td>)}
            </tr>
          </tbody>
        </table>
        <button className="carousel-arrow" onClick={handleNext} disabled={start + visibleCount >= summary.periods.length}>&gt;</button>
      </div>
    </div>
  );
}