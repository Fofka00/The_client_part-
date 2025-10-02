import React from 'react';
import './Tariffs.css';
import tarifsImg from '../Img/Group 1171274214.svg'
import tarifsImg1 from '../Img/Group 1171274215.svg'
import tarifsImg2 from '../Img/Group 1171274216.svg'

const tariffs = [
  {
    id: 'beginner',
    name: 'Beginner',
    desc: 'Для небольшого исследования',
    price: '799 ₽',
    oldPrice: '1 200 ₽',
    features: [
      'Безлимитная история запросов',
      'Безопасная сделка',
      'Поддержка 24/7',
    ],
    color: '#FFB64F',
    img: tarifsImg1,
    andPrice: 'или 150 ₽/мес. при рассрочке на 24 мес.',
    tarifs:'В тариф входит:',
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'Для HR и фрилансеров',
    price: '1 299 ₽',
    oldPrice: '2 600 ₽',
    features: [
      'Все пункты тарифа Beginner',
      'Экспорт истории',
      'Рекомендации по приоритетам',
    ],
    color: '#7CE3E1',
    img: tarifsImg2,
    andPrice: 'или 279 ₽/мес. при рассрочке на 24 мес.',
    tarifs:'В тариф входит:',
  },
  {
    id: 'business',
    name: 'Business',
    desc: 'Для корпоративных клиентов',
    price: '2 379 ₽',
    oldPrice: '3 700 ₽',
    features: [
      'Все пункты тарифа Pro',
      'Безлимитное количество запросов',
      'Приоритетная поддержка',
    ],
    color: '#000',
    img: tarifsImg,
    lightText: true,
    tarifs:'В тариф входит:',
  },
];

function Tariffs({ user }) {
  const currentTariff = user ? 'beginner' : null;

  return (
    <div className="tariffs-list">
      {tariffs.map((tariff) => {
        const isCurrent = currentTariff === tariff.id;
        return (
          <div
            key={tariff.id}
            className={`tariff-card${isCurrent ? ' tariff-card--current' : ''}${tariff.lightText ? ' tariff-card--light' : ''}`}
            style={isCurrent ? { borderColor: tariff.color } : {}}
          >
            <div className="tariff-card__header" style={{ background: tariff.color, display: "flex" }}>
                <div>
                   <h1 className="tariff-card__name">{tariff.name}</h1>
                   <h1 className="tariff-card__desc">{tariff.desc}</h1>                    
                </div>
                <div>
                    <img src={tariff.img} alt="" style={{width: "92px"}}/>
                </div>

              {isCurrent && (
                <span className="tariff-card__badge" style={{ background: tariff.badgeColor }}>
                  Текущий тариф
                </span>
              )}
            </div>
            <div className="tariff-card__body">
              <div className="tariff-card__price">
                <span className="tariff-card__price-new">{tariff.price}</span>
                <span className="tariff-card__price-old">{tariff.oldPrice}</span>
              </div>
              <div className="tariff-card__andPrise">
                <span >{tariff.andPrice}</span>
              </div>
              <div>
                <p className='tariff-card__allTarrifs'>{tariff.tarifs}</p>
              </div>
              <ul className="tariff-card__features">
                {tariff.features.map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>
            </div>
            <div className="tariff-card__footer">
              {isCurrent ? (
                <button className="tariff-card__btn tariff-card__btn--current" style={{ background: tariff.btnColor }}>
                  Перейти в личный кабинет
                </button>
              ) : (
                <button className="tariff-card__btn">Подробнее</button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tariffs;