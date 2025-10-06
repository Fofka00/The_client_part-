import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import KeyImg from '../Img/Characters.svg';   
import LockImg from '../Img/Group 1171274237.svg'; 
import Header from '../components/Header';
import Footer from '../components/Footer'; 

function LoginPage({ onLogin }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValid = login.trim() && password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

  // Моковые данные для теста
    const validLogin = 'test';
    const validPassword = '1234';

  setTimeout(() => {
    if (login === validLogin && password === validPassword) {
      // Сохраняем фейковый токен и срок действия
      const fakeToken = '1234567890';
      const fakeExpire = new Date(Date.now() + 3600 * 1000).toISOString();
      localStorage.setItem('accessToken', fakeToken);
      localStorage.setItem('expire', fakeExpire);
      onLogin({ name: 'Avatar', currentTariff: 'beginner', avatar: '/avatar.jpg' });
      navigate('/');
    } else {
      setError('Неправильное имя или пароль');
    }
    setLoading(false);
  }, 700);
};
  
  return (
    <>
    <Header />
    <div className="login-root">
      <div className="login-left">
        <h1>ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ<br />НА ТАРИФ, НЕОБХОДИМО<br />АВТОРИЗОВАТЬСЯ.</h1>
        <img src={KeyImg} alt="" className="login-illustration" />
      </div>
      <div className="login-right">
        <div className="login-lock">
          <img src={LockImg} alt="" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__tabs">
            <span className="active">Войти</span>
            <span className="disabled">Зарегистрироваться</span>
          </div>
          <label>
            <p>Логин или номер телефона:</p>
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              autoComplete="username"
            />
          </label>
          <label>
            <p>Пароль:</p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" disabled={!isValid || loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
          <a href="#" className="login-form__restore">Восстановить пароль</a>
          <div className="login-form__socials">
            <span>Войти через:</span>
            <div className="login-form__social-btns">
              <button type="button" className="social-btn google" tabIndex={-1}>Google</button>
              <button type="button" className="social-btn facebook" tabIndex={-1}>facebook</button>
              <button type="button" className="social-btn yandex" tabIndex={-1}>Яндекс</button>
            </div>
          </div>
        </form>
      </div>
    </div>
      <Footer />
    </>
  );
}

export default LoginPage;