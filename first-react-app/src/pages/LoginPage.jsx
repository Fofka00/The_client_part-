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

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  try {
    const response = await fetch('http://localhost:3001/account/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });
    if (!response.ok) throw new Error('Ошибка входа');
    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('expire', data.expire);
    }
    onLogin(data.user);
    navigate('/');
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  
  return (
    <>
    <Header />
    <div className="login-root">
      <div className="login-left">
        <h1>ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ<br />НА ТАРИФ, НЕОБХОДИМО<br />АВТОРИЗОВАТЬСЯ.</h1>
        <img src={KeyImg} alt="" className="login-illustration desktop-only" />
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
        <img src={KeyImg} alt="" className="login-illustration mobile-only" />
      </div>
    </div>
      <Footer />
    </>
  );
}

export default LoginPage;