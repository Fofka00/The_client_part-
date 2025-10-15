import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryCarousel from '../components/SummaryCarousel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './SummaryPage.css';
import PublicationsList from '../components/PublicationsList';
import imgDarts from '../Img/Group 1171274267.svg';
import { Link } from 'react-router-dom';
import { getPublicationIds } from '../mockApi';



function SummaryPage({ user, loading, onLogout, limits, loadingLimits }) {
  const location = useLocation();
  const navigate = useNavigate();
  const summary = location.state?.summary;
  const searchParams = location.state?.searchParams;

  const [publicationIds, setPublicationIds] = useState([]);
  const [idsLoading, setIdsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);


  useEffect(() => {
    if (summary && searchParams) {
      const fetchPublicationIds = async () => {
        setIdsLoading(true);
        try {
          const data = await getPublicationIds();
          setPublicationIds(data.publicationIds);
        } catch (err) {
          alert('Ошибка при получении публикаций: ' + err.message);
        } finally {
          setIdsLoading(false);
        }
      };
      fetchPublicationIds();
   }
  }, [summary, searchParams]);

  if (loading) return <div>Загрузка...</div>;
  if (!summary) {
    return (
      <div>
        <p>Нет данных для отображения.</p>
        <button onClick={() => navigate('/')}>Вернуться к поиску</button>
      </div>
    );
  }

  return (
  <>
    <Header user={user} onLogout={onLogout} limits={limits} loadingLimits={loadingLimits} />
    <section className='summaryMain'>
      <div className='summaryHead'>
        <div className='summaryHead__content'><h1>Ищем. Скоро будут результаты</h1>
          <p>Поиск может занять некоторое время, просим сохранять терпение.</p></div>
        <div><img src={imgDarts} alt="" /></div>
      </div>
      <SummaryCarousel summary={summary} />
      <h2 style={{fontWeight: '900'}}>СПИСОК ДОКУМЕНТОВ</h2>
      {idsLoading && <div>Загрузка публикаций...</div>}

      {!idsLoading && publicationIds.length > 0 && (
        <PublicationsList publicationIds={publicationIds} />
      )}

      {!idsLoading && publicationIds.length === 0 && (
        <div>Публикации не найдены.</div>
      )}
    </section>
    <Footer />
  </>
  );
}

export default SummaryPage;