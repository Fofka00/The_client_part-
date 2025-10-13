import React, { useState, useEffect } from 'react';
import PublicationCard from './PublicationCard';
import './PublicationsList.css';

const PAGE_SIZE = 2;

function PublicationsList({ publicationIds }) {
  const [publications, setPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPublications([]);
    setCurrentPage(1);
  }, [publicationIds]);

  useEffect(() => {
    const fetchFirstPage = async () => {
      setLoading(true);
      const idsToLoad = publicationIds.slice(0, PAGE_SIZE);
      try {
        const response = await fetch('http://localhost:3001/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: idsToLoad }),
        });
        const data = await response.json();
        setPublications(data);
        setCurrentPage(1);
      } catch (err) {
        alert('Ошибка: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (publicationIds.length > 0) {
      fetchFirstPage();
    } else {
      setPublications([]);
      setCurrentPage(1);
    }
  }, [publicationIds]);

  useEffect(() => {
    if (currentPage === 1) return;
    const fetchPublications = async () => {
      setLoading(true);
      const idsToLoad = publicationIds.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
      if (idsToLoad.length === 0) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch('http://localhost:3001/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: idsToLoad }),
        });
        const data = await response.json();
        setPublications(prev => [...prev, ...data]);
      } catch (err) {
        alert('Ошибка: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
  }, [currentPage, publicationIds]);

  const handleShowMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const isShowMoreDisabled = publications.length >= 10;

  return (
    <div className="publications-list">
    <div className="publications-list__cards">
      {publications.filter(Boolean).map(pub => (
        <PublicationCard key={pub.id} publication={pub} />
      ))}
    </div>
    {loading && <div>Загружаем публикации...</div>}
    {publications.length < 10 && !loading && (
      <button onClick={handleShowMore} className="show-more-btn">
      Показать больше
      </button>
    )}
  </div>
  );
}

export default PublicationsList;