const MOCK_USER = { name: 'Алексей А.', currentTariff: 'Beginner', avatar: '...' };
const MOCK_LIMITS = { used: 34, total: 100 };
const MOCK_PUBLICATION_IDS = [101,102,103,104,105,106,107,108,109,110];
const MOCK_PUBLICATIONS = [
  {
    id: 101,
    title: 'Скиллфэктори - лучшая онлайн-школа для будущих айтишников',
    date: '13.09.2021',
    source: 'Комсомольская правда KP.RU',
    url: 'https://example.com/article/101',
    content: `SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. ...`,
    image: 'mock-image-1.svg',
    attributes: { isTechNews: true, isAnnouncement: false, isDigest: false, wordCount: 2543 }
  },
  // ...добавьте остальные публикации по аналогии
];

// --- MOCK API FUNCTIONS ---

export function login({ login, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (login === 'myDiploma' && password === 'willSucceed4Sure') {
        resolve({
          accessToken: 'mock-token',
          expire: new Date(Date.now() + 3600 * 1000).toISOString(),
          user: { name: 'Алексей А.', currentTariff: 'Beginner', avatar: '...' }
        });
      } else {
        reject({ message: 'Неверный логин или пароль' });
      }
    }, 500);
  });
}

export function getLimits() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_LIMITS), 300);
  });
}

export function getHistograms({ dateStart, dateEnd }) {
  // Генерируем mock-данные по датам
  const periods = [];
  let current = new Date(dateStart);
  const end = new Date(dateEnd);
  while (current <= end) {
    const day = String(current.getDate()).padStart(2, '0');
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const year = current.getFullYear();
    periods.push({
      date: `${day}.${month}.${year}`,
      total: Math.floor(Math.random() * 10),
      risks: Math.floor(Math.random() * 3)
    });
    current.setDate(current.getDate() + 1);
  }
  return Promise.resolve({
    total: periods.reduce((sum, p) => sum + p.total, 0),
    periods
  });
}

export function getPublicationIds() {
  return Promise.resolve({ publicationIds: MOCK_PUBLICATION_IDS });
}

export function getPublications({ ids }) {
  return Promise.resolve(
    MOCK_PUBLICATIONS.filter(pub => ids.includes(pub.id))
  );
}