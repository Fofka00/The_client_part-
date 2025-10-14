const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

function getDatesInRange(start, end) {
  const result = [];
  let current = parseLocalDate(start);
  const endDate = parseLocalDate(end);
  while (current <= endDate) {
    const day = String(current.getDate()).padStart(2, '0');
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const year = current.getFullYear();
    result.push(`${day}.${month}.${year}`);
    current.setDate(current.getDate() + 1);
  }
  return result;
}

function parseLocalDate(str) {
  const [year, month, day] = str.split('-').map(Number);
  return new Date(year, month - 1, day);
}

app.get('/account/limits', (req, res) => {
  res.json({ used: 34, total: 100 });
});

app.post('/objectsearch/histograms', (req, res) => {
  const { dateStart, dateEnd, inn, tonality } = req.body;
  let periods = [];

  if (dateStart && dateEnd) {
    const dates = getDatesInRange(dateStart, dateEnd);
    periods = dates.map(date => ({
      date,
      total: Math.floor(Math.random() * 10), 
      risks: Math.floor(Math.random() * 3)   
    }));
  } else {
    periods = [
      { date: "10.09.2021", total: 5, risks: 0 },
      { date: "13.09.2021", total: 2, risks: 0 },
      { date: "17.09.2021", total: 6, risks: 0 },
      { date: "20.09.2021", total: 8, risks: 2 },
      { date: "12.10.2021", total: 1, risks: 0 },
      { date: "15.10.2021", total: 10, risks: 2 },
      { date: "16.10.2021", total: 4, risks: 0 },
      { date: "17.10.2021", total: 3, risks: 0 }
    ];
  }

  res.json({
    total: periods.reduce((sum, p) => sum + p.total, 0),
    periods
  });
});

app.post('/objectsearch', (req, res) => {
  res.json({
    publicationIds: [101,102,103,104,105,106,107,108,109,110]
  });
});

app.post('/account/login', (req, res) => {
  console.log('LOGIN BODY:', req.body); 
  const { login, password } = req.body;
  if (login === 'myDiploma' && password === 'willSucceed4Sure') {
    res.json({
      accessToken: 'mock-token',
      expire: new Date(Date.now() + 3600 * 1000).toISOString(),
      user: { name: 'Алексей А.' }
    });
  } else {
    res.status(401).json({ message: 'Неверный логин или пароль' });
  }
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.post('/documents', (req, res) => {
  const ids = req.body.ids || [];
  const images = [
    'http://localhost:3001/images/Снимок экрана 2022-09-24 в 20.20 1.svg',
    'http://localhost:3001/images/Снимок экрана 2022-09-24 в 20.24 1.svg'
  ];
  const titles = [
    'Скиллфэктори - лучшая онлайн-школа для будущих айтишников',
    'Работа в Data Science в 2022 году: тренды, навыки и обзор специализаций',
    'Frontend-разработчик: как начать карьеру',
    'Как стать backend-разработчиком',
    'Тестировщик ПО: первые шаги',
    'DevOps-инженер: кто это и зачем нужен',
    'Аналитик данных: профессия будущего',
    'UI/UX-дизайнер: основы профессии',
    'Мобильная разработка: старт в Android и iOS',
    'Кибербезопасность: как защитить данные'
  ];
  const contents = [
    `SkillFactory — школа для всех, кто хочет изменить свою карьеру и жизнь. С 2016 года обучение прошли 20 000+ человек из 40 стран с 4 континентов, самому взрослому студенту сейчас 86 лет. Выпускники работают в Сбере, Cisco, Bayer, Nvidia, МТС, Ростелекоме, Mail.ru, Яндексе, Ozon и других топовых компаниях.

    Принципы SkillFactory: акцент на практике, забота о студентах и ориентир на трудоустройство. 80% обучения — выполнение упражнений и реальных проектов. Каждого студента поддерживают менторы, 2 саппорт-линии и комьюнити курса. А карьерный центр помогает составить резюме, подготовиться к собеседованиям и познакомиться с IT-рекрутерами.`,

    `Data Scientist — это специалист, который работает с большими массивами данных, чтобы с их помощью решать задачи бизнеса.

    Простой пример использования больших данных и искусственного интеллекта — умные ленты в социальных сетях. На основе ваших просмотров и лайков алгоритм выдает рекомендации с контентом, который может быть вам интересен. Эту модель создал и обучил data scientist, и скорее всего, не один.

    В небольших компаниях и стартапах data scientist делает все: собирает и очищает данные, создает математическую модель для их анализа, тестирует ее и презентует готовое решение бизнесу.`
  ];
  const sources = [
    'Комсомольская правда KP.RU',
    'VC.RU',
    'Habr',
    'Tproger',
    'DINS',
    'vc.ru',
    'РБК',
    'Cossa',
    'AppTractor',
    'SecurityLab'
  ];
  const dates = [
    '13.09.2021',
    '15.10.2021',
    '01.11.2021',
    '10.11.2021',
    '20.11.2021',
    '01.12.2021',
    '10.12.2021',
    '20.12.2021',
    '01.01.2022',
    '10.01.2022'
  ];
  const wordCounts = [2543, 3233, 2100, 1800, 1500, 2200, 2000, 1700, 1600, 1900];

  const publications = ids.map((id, idx) => ({
    id,
    title: titles[idx % titles.length],
    date: dates[idx % dates.length],
    source: sources[idx % sources.length],
    url: 'https://example.com/article/' + id,
    content: contents[idx % contents.length],
    image: images[idx % images.length],
    attributes: {
      isTechNews: idx % 3 === 0,
      isAnnouncement: idx % 3 === 1,
      isDigest: idx % 3 === 2,
      wordCount: wordCounts[idx % wordCounts.length],
    }
  }));
  res.json(publications);
});

app.listen(3001, () => {
  console.log('Backend запущен на http://localhost:3001');
});