import RocketImg from '../Img/Group 1171274244.svg';
import Folder from '../Img/Folders.svg';
import Document from '../Img/Document.svg';
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import './SearchPage.css'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function validateInn(inn) {
  return /^\d{10}$|^\d{12}$/.test(inn);
}

function isFuture(date) {
  return new Date(date) > new Date();
}

function SearchPage({ user, loading, onLogout, limits, loadingLimits }) {
  const navigate = useNavigate();
  const [inn, setInn] = useState('');
  const [maxFullness, setMaxFullness] = useState(false);
  const [inBusinessNews, setInBusinessNews] = useState(false);
  const [onlyMainRole, setOnlyMainRole] = useState(false);
  const [tonality, setTonality] = useState('');
  const [onlyWithRisk, setOnlyWithRisk] = useState(false);
  const [includeTechNews, setIncludeTechNews] = useState(false);
  const [includeAnnouncements, setIncludeAnnouncements] = useState(false);
  const [includeDigests, setIncludeDigests] = useState(false);
  const [limit, setLimit] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Загрузка...</div>;
  }




  const validate = () => {
    const newErrors = {};
    if (!validateInn(inn)) newErrors.inn = 'Введите корректный ИНН (10 или 12 цифр)';
    if (!tonality) newErrors.tonality = 'Выберите тональность';
    if (!limit || isNaN(limit) || limit < 1 || limit > 1000) newErrors.limit = 'От 1 до 1000';
    if (!dateStart) newErrors.dateStart = 'Укажите дату начала';
    if (!dateEnd) newErrors.dateEnd = 'Укажите дату конца';
    if (dateStart && isFuture(dateStart)) newErrors.dateStart = 'Дата не может быть в будущем';
    if (dateEnd && isFuture(dateEnd)) newErrors.dateEnd = 'Дата не может быть в будущем';
    if (dateStart && dateEnd && dateStart > dateEnd) newErrors.dateStart = 'Дата начала позже даты конца';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setLoadingSummary(true);
      setSummary(null);
      try {
        const body = {
          inn,
          maxFullness,
          inBusinessNews,
          onlyMainRole,
          tonality,
          onlyWithRisk,
          includeTechNews,
          includeAnnouncements,
          includeDigests,
          limit,
          dateStart,
          dateEnd
        };
        const response = await fetch('http://localhost:3001/objectsearch/histograms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
          
        });
        if (!response.ok) throw new Error('Ошибка запроса');
        const data = await response.json();
        setSummary(data);
        navigate('/summary', { state: { summary: data, searchParams: body } });
      } catch (err) {
        alert('Ошибка при поиске: ' + err.message);
      } finally {
        setLoadingSummary(false);
      }
    }
  };
  

  const isValid = Object.keys(validate()).length === 0;

  return (
    <>
      <Header user={user} onLogout={onLogout} limits={limits} loadingLimits={loadingLimits} />
      <div className="search-page">
        <div>
            <h1 className="search-title">НАЙДИТЕ НЕОБХОДИМЫЕ<br />ДАННЫЕ В ПАРУ КЛИКОВ.</h1>
            <p className="search-subtitle">
              Задайте параметры поиска.<br />
              Чем больше заполните, тем точнее поиск
            </p>
            {loadingSummary && <div>Загрузка сводки...</div>}
            <div className="search-main">
              <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-form__columns">
                  <div className="search-form__left">
                    <label>
                      <p>ИНН компании*</p>
                      <input type="text" placeholder="10 цифр" value={inn} onChange={e => setInn(e.target.value)} className={errors.inn ? 'input-error' : ''} />
                      {errors.inn && <div className="error-text">{errors.inn}</div>}
                    </label>
                    <label>
                      <p>Тональность</p>
                      <select   value={tonality} onChange={e => setTonality(e.target.value)}>
                        <option>Любая</option>
                        <option>Позитивная</option>
                        <option>Негативная</option>
                      </select>
                    </label>
                    <label>
                      <p>Количество документов в выдаче*</p>
                      <input type="number" placeholder="От 1 до 1000"   value={limit} onChange={e => setLimit(e.target.value)} />
                    </label>
                    <label>
                      <p>Диапазон поиска*</p>
                      <div className="date-range">
                        <input type="date" value={dateStart} onChange={e => setDateStart(e.target.value)} className={errors.dateStart ? 'input-error' : ''} />
                        <input type="date" value={dateEnd} onChange={e => setDateEnd(e.target.value)} className={errors.dateStart ? 'input-error' : ''} />
                      </div>
                      {errors.dateStart && <div className="error-text">{errors.dateStart}</div>}
                    </label>
                  </div>
                  <div className="search-form__right">
                    <label>
                      <input type="checkbox" checked={maxFullness} onChange={() => setMaxFullness(!maxFullness)} className="custom-checkbox-input" />
                      <span className="custom-checkbox"></span>
                      Признак максимальной полноты

                    </label>
                    <label>
                      <input type="checkbox" checked={inBusinessNews}  onChange={() => setInBusinessNews(!inBusinessNews)} className="custom-checkbox-input"/>
                      <span className="custom-checkbox"></span>
                      Упоминания в бизнес-контексте

                    </label>
                    <label>
                      <input type="checkbox" checked={onlyMainRole} onChange={() => setOnlyMainRole(!onlyMainRole)} className="custom-checkbox-input"/>
                      <span className="custom-checkbox"></span>
                      Главная роль в публикации
                    </label>
                    <label>
                      <input type="checkbox" disabled className="custom-checkbox-input" />
                      <span className="disable-checkbox"></span>
                      Публикации только с риск-факторами
                    </label>
                    <label>
                      <input type="checkbox" disabled className="custom-checkbox-input" />
                      <span className="disable-checkbox"></span>
                      Включать технические новости рынков
                    </label>
                    <label>
                      <input type="checkbox" checked={includeTechNews} onChange={() => setIncludeTechNews(!includeTechNews)} className="custom-checkbox-input"/>
                      <span className="custom-checkbox"></span>
                      Включать анонсы и календари
                    </label>
                    <label>
                      <input type="checkbox" disabled className="custom-checkbox-input"/>
                      <span className="disable-checkbox"></span>
                      Включать сводки новостей
                    </label>
                    <div className="search-btnContainer">
                        <button type="submit" className="search-btn">
                          Поиск
                        </button>
                    </div>
                  </div>
                  
                </div>
                
                <div className="search-note">
                  * Обязательные к заполнению поля
                </div>
            </form>
            </div>
        </div>

        <div className='Main__right'>
          <div>
            <img src={Folder} alt="" className='ImgFolder'/>
            <img src={Document} alt="" className='ImgDocument'/>
          </div>
          <img src={RocketImg} alt="" className="search-illustration" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SearchPage;