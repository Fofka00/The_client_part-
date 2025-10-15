import card1 from './Img/Снимок экрана 2022-09-24 в 20.20 1.svg';
import card2 from './Img/Снимок экрана 2022-09-24 в 20.24 1.svg';


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
    content: `SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях.

Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.`,
    image: card1,
    attributes: { isTechNews: true, isAnnouncement: false, isDigest: false, wordCount: 2543 }
  },
  {
    id: 102,
    title: 'Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций',
    date: '15.10.2021',
    source: 'VC.RU',
    url: 'https://example.com/article/102',
    content: `Кто такой Data Scientist и чем он занимается?
Data Scientist — это специалист, который работает с большими массивами данных, чтобы с их помощью решить задачи бизнеса. Простой пример использования больших данных и искусственного интеллекта — умные ленты в социальных сетях. На основе ваших просмотров и лайков алгоритм выдает рекомендации с контентом, который может быть вам интересен. Эту модель создал и обучил дата-сайентист, и скорее всего, не один.

В небольших компаниях и стартапах дата-сайентист делает все: собирает и очищает данные, создает математическую модель для их анализа, тестирует ее и презентует готовое решение бизнесу.`,
    image: card2,
    attributes: { isTechNews: false, isAnnouncement: true, isDigest: false, wordCount: 3233 }
  },
    {
    id: 103,
    title: 'Frontend-разработчик: как начать карьеру',
    date: '20.10.2021',
    source: 'Habr',
    url: 'https://example.com/article/103',
    content: 'Frontend-разработчик отвечает за внешний вид и интерактивность сайтов. В статье рассказывается, как начать карьеру в этой области, какие навыки нужны и где учиться.',
    image: card1,
    attributes: { isTechNews: true, isAnnouncement: false, isDigest: false, wordCount: 2100 }
  },
  {
    id: 104,
    title: 'Как стать backend-разработчиком',
    date: '25.10.2021',
    source: 'Tproger',
    url: 'https://example.com/article/104',
    content: 'Backend-разработчик работает с серверной частью приложений. В статье описаны основные технологии, востребованные на рынке, и советы по обучению.',
    image: card2,
    attributes: { isTechNews: false, isAnnouncement: false, isDigest: true, wordCount: 1800 }
  },
  {
    id: 105,
    title: 'Тестировщик ПО: первые шаги',
    date: '01.11.2021',
    source: 'DINS',
    url: 'https://example.com/article/105',
    content: 'Тестировщик программного обеспечения — важная профессия в IT. В статье рассказывается, как начать путь в тестировании и какие инструменты использовать.',
    image: card1,
    attributes: { isTechNews: false, isAnnouncement: true, isDigest: false, wordCount: 1500 }
  },
  {
    id: 106,
    title: 'DevOps-инженер: кто это и зачем нужен',
    date: '05.11.2021',
    source: 'vc.ru',
    url: 'https://example.com/article/106',
    content: 'DevOps-инженер объединяет процессы разработки и эксплуатации. В статье описаны основные задачи DevOps и востребованные инструменты.',
    image: card2,
    attributes: { isTechNews: true, isAnnouncement: false, isDigest: false, wordCount: 2200 }
  },
  {
    id: 107,
    title: 'Аналитик данных: профессия будущего',
    date: '10.11.2021',
    source: 'РБК',
    url: 'https://example.com/article/107',
    content: 'Аналитик данных помогает компаниям принимать решения на основе анализа информации. В статье рассказывается о навыках и перспективах профессии.',
    image: card1,
    attributes: { isTechNews: false, isAnnouncement: false, isDigest: true, wordCount: 2000 }
  },
  {
    id: 108,
    title: 'UI/UX-дизайнер: основы профессии',
    date: '15.11.2021',
    source: 'Cossa',
    url: 'https://example.com/article/108',
    content: 'UI/UX-дизайнер отвечает за удобство и внешний вид цифровых продуктов. В статье описаны основные принципы и этапы работы.',
    image: card2,
    attributes: { isTechNews: false, isAnnouncement: true, isDigest: false, wordCount: 1700 }
  },
  {
    id: 109,
    title: 'Мобильная разработка: старт в Android и iOS',
    date: '20.11.2021',
    source: 'AppTractor',
    url: 'https://example.com/article/109',
    content: 'Мобильная разработка — одна из самых востребованных сфер. В статье рассказывается, как начать создавать приложения для Android и iOS.',
    image: card1,
    attributes: { isTechNews: true, isAnnouncement: false, isDigest: false, wordCount: 1600 }
  },
  {
    id: 110,
    title: 'Кибербезопасность: как защитить данные',
    date: '25.11.2021',
    source: 'SecurityLab',
    url: 'https://example.com/article/110',
    content: 'Кибербезопасность — ключевая задача современного мира. В статье описаны основные угрозы и способы защиты информации.',
    image: card2,
    attributes: { isTechNews: false, isAnnouncement: false, isDigest: true, wordCount: 1900 }
  }
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