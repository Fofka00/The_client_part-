import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhyUsCarousel from '../components/WhyUsCarousel';
import Tariffs from '../components/Tariffs';
import '../components/HomePage.css';
import Ilustration from '../Img/Group 13.svg'
import Ilustration1 from '../Img/Group 14.svg'
import tarifsImg from '../Img/Group 1171274214.svg'
import tarifsImg1 from '../Img/Group 1171274215.svg'
import tarifsImg2 from '../Img/Group 1171274216.svg'

function HomePage({ user, handleLogout }) {
  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <main className="main">
        <section className="hero">
          <div className="hero__content" style={{width: "740px"}}>
            <h1 style={{fontSize: "55px", fontWeight: "1000", maxWidth: ""}}>СЕРВИС ПО ПОИСКУ <br /> ПУБЛИКАЦИЙ <br /> О КОМПАНИИ <br /> ПО ЕГО ИНН</h1>
            <p style={{fontSize: "20px", fontWeight: "400"}}>Комплексный анализ публикаций, получение данных <br /> в формате PDF на электронную почту.</p>
            {user && (
              <button
                className="hero__button"
                onClick={() => window.location.href = '/search'}
              >
                Запросить данные
              </button>
            )}
          </div>
          <div className="hero__img" style={{maxWidth: "629px"}}>
            <img src={Ilustration} alt="Иллюстрация" />
          </div>
        </section>

        <section className="why-us">
          <h2>ПОЧЕМУ ИМЕННО МЫ</h2>
          <WhyUsCarousel />
        </section>

        <div><img src={Ilustration1} alt="Ilustration" /></div>

        <section className="tariffs">
          <h2>НАШИ ТАРИФЫ</h2>
          <Tariffs user={user} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;