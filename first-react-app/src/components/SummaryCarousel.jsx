import React, { useState } from "react";
import "./SummaryCarousel.css";

export default function SummaryCarousel({ summary }) {
  const [start, setStart] = useState(0);
  const visibleCount = window.innerWidth <= 400 ? 1 : 8;

  const handlePrev = () => setStart(Math.max(0, start - 1));
  const handleNext = () => setStart(Math.min(summary.periods.length - visibleCount, start + 1));

  const visiblePeriods = summary.periods.slice(start, start + visibleCount);

  return (
    <div className="mainHeader">
      <h2 style={{fontWeight: 900}}>ОБЩАЯ СВОДКА</h2>
      <div style={{color: "#888", marginBottom: 12}}>Найдено {summary.total.toLocaleString()} вариантов</div>
      <div className="carousel-main">
        <button className="carousel-arrow" onClick={handlePrev} disabled={start === 0}>&lt;</button>
        <div className="summary-carousel">
          <table className="summary-table-desktop">
              <thead>
                <tr>
                  <th className="first-colHeader">Период</th>
                  {visiblePeriods.map(p => <th key={p.date}>{p.date}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="first-colMid">Всего</td>
                  {visiblePeriods.map(p => <td key={p.date}>{p.total}</td>)}
                </tr>
                <tr>
                  <td className="first-col">Риски</td>
                  {visiblePeriods.map(p => <td key={p.date}>{p.risks}</td>)}
                </tr>
              </tbody>
            </table>

            <table className="summary-table-mobile">
              <thead>
                <tr>
                  <th className="first-colHeader">Период</th>
                  <th className="first-colMid">Всего</th>
                  <th className="first-col">Риски</th>
                </tr>
              </thead>
              <tbody>
                {visiblePeriods.map((p) => (
                  <tr key={p.date}>
                    <td>{p.date}</td>
                    <td>{p.total}</td>
                    <td>{p.risks}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
        <button className="carousel-arrow" onClick={handleNext} disabled={start + visibleCount >= summary.periods.length}>&gt;</button>
      </div>
      </div >
  );
}