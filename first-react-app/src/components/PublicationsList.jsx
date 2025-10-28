import React, { useState, useEffect } from 'react';
import PublicationCard from './PublicationCard';
import './PublicationsList.css';
import { getPublications } from '../mockApi';

const PAGE_SIZE = 2;

function PublicationsList({ publicationIds, limit = 10 }) {
  const [publications, setPublications] = useState([]);
  const [shownCount, setShownCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  // Считаем, сколько всего карточек можно показать (не больше limit и не больше publicationIds.length)
  const maxToShow = Math.min(publicationIds.length, limit);

  useEffect(() => {
    setPublications([]);
    setShownCount(PAGE_SIZE);
    if (publicationIds.length > 0) {
      const fetchInitial = async () => {
        setLoading(true);
        const idsToLoad = publicationIds.slice(0, Math.min(PAGE_SIZE, maxToShow));
        try {
          const data = await getPublications({ ids: idsToLoad });
          setPublications(data);
        } catch (err) {
          alert('Ошибка: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchInitial();
    }
    // eslint-disable-next-line
  }, [publicationIds, limit]);

  const handleShowMore = async () => {
    setLoading(true);
    // Считаем, сколько ещё можно показать
    const remaining = maxToShow - publications.length;
    const toLoad = Math.min(PAGE_SIZE, remaining);
    const nextIds = publicationIds.slice(publications.length, publications.length + toLoad);
    try {
      const data = await getPublications({ ids: nextIds });
      setPublications(prev => [...prev, ...data]);
      setShownCount(prev => prev + toLoad);
    } catch (err) {
      alert('Ошибка: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publications-list">
      <div className="publications-list__cards">
        {publications.filter(Boolean).map(pub => (
          <PublicationCard key={pub.id} publication={pub} />
        ))}
      </div>
      {loading && <div>Загружаем публикации...</div>}
      {publications.length < maxToShow && !loading && (
        <button onClick={handleShowMore} className="show-more-btn">
         Показать больше
        </button>
      )}
    </div>
  );
}

export default PublicationsList;