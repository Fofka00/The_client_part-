import React from 'react';
import './PublicationCard.css';

function PublicationCard({ publication }) {
  if (!publication) return null;
  const { title, date, source, url, content, image, attributes } = publication;

  const tags = [];
  if (attributes?.isTechNews) tags.push('Технические новости');
  if (attributes?.isAnnouncement) tags.push('Анонсы и события');
  if (attributes?.isDigest) tags.push('Сводки новостей');

  return (
    <div className="publication-card">
      <div className="publication-card__header">
        <span className="publication-card__date">{date}</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className="publication-card__source">
          {source}
        </a>
      </div>
      <h2 className="publication-card__title">{title}</h2>
      <div className="publication-card__tags">
        {tags.map(tag => (
          <span key={tag} className="publication-card__tag">{tag}</span>
        ))}
      </div>
      {image && <img src={image} alt="" className="publication-card__image" />}
      <div className="publication-card__content">
        {content.split('\n').filter(Boolean).map((paragraph, idx) =>
          <p key={idx}>{paragraph}</p>
        )}
      </div>
      <div className="publication-card__footer">
        <a href={url} target="_blank" rel="noopener noreferrer" className="publication-card__btn">
          Читать в источнике
        </a>
        <span className="publication-card__words">{attributes?.wordCount?.toLocaleString()} слова</span>
      </div>
    </div>
  );
}

export default PublicationCard;