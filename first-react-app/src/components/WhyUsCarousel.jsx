import React, { useState } from 'react';
import './WhyUsCarousel.css';
import CaruselImg1 from '../Img/Mask group.svg'
import CaruselImg2 from '../Img/Mask group (1).svg'
import CaruselImg3 from '../Img/Mask group (2).svg'
const cards = [
  {
    icon: CaruselImg1,
    text: 'Высокая и оперативная скорость обработки заявки',
  },
  {
    icon: CaruselImg2,
    text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
  },
  {
    icon: CaruselImg3,
    text: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству',
  },
  {
    icon: CaruselImg3,
    text: 'Круглосуточная поддержка пользователей',
  },
];

const CARDS_ON_SCREEN = 3;

function WhyUsCarousel() {
  const [start, setStart] = useState(0);

  const prev = () => {
    setStart((prevStart) =>
      prevStart === 0 ? cards.length - CARDS_ON_SCREEN : prevStart - 1
    );
  };

  const next = () => {
    setStart((prevStart) =>
      prevStart + CARDS_ON_SCREEN >= cards.length
        ? 0
        : prevStart + 1
    );
  };

  const visibleCards = [];
  for (let i = 0; i < CARDS_ON_SCREEN; i++) {
    visibleCards.push(cards[(start + i) % cards.length]);
  }

  return (
    <div className="whyus-carousel">
      <button className="whyus-arrow" onClick={prev} aria-label="Назад">
        &#60;
      </button>
      <div className="whyus-cards">
        {visibleCards.map((card, idx) => (
          <div className="whyus-card" key={idx}>
            <img src={card.icon} alt="" className="whyus-card__icon" />
            <div className="whyus-card__text">{card.text}</div>
          </div>
        ))}
      </div>
      <button className="whyus-arrow" onClick={next} aria-label="Вперёд">
        &#62;
      </button>
    </div>
  );
}

export default WhyUsCarousel;