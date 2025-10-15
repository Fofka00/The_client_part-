import React, { useState, useEffect } from 'react';
import PublicationCard from './PublicationCard';
import './PublicationsList.css';
import { getPublications } from '../mockApi';

const PAGE_SIZE = 2;

function PublicationsList({ publicationIds }) {
  const [publications, setPublications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPublications([]);
    setCurrentPage(1);
    if (publicationIds.length > 0) {
      const fetchFirstPage = async () => {
        setLoading(true);
        const idsToLoad = publicationIds.slice(0, PAGE_SIZE);
        try {
          const data = await getPublications({ ids: idsToLoad });
          setPublications(data); // <-- только set, не добавление!
        } catch (err) {
          alert('Ошибка: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchFirstPage();
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
        const data = await getPublications({ ids: idsToLoad });
        setPublications(prev => [...prev, ...data]); // <-- добавление!
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