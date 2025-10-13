import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Img/SGN_09_24_2022_1663968217400 1.svg';
import Rect from '../Img/Rectangle 7.svg';
import useravatar from '../Img/Mask group (3).svg';
import React, { useState } from 'react';
import LogoBurger from '../Img/eqw 1 (1).svg';

function Header({ user, limits, loadingLimits, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo} alt="СКАН" />
      </div>
      <nav className="header__nav">
        <Link to="/">Главная</Link>
        <Link to="/tariffs">Тарифы</Link>
        <Link to="/faq">FAQ</Link>
      </nav>
      <div className="header__right">
        {user ? (
          <>
            <div className="header__limits">
              {loadingLimits ? (
                <div className="header__loader">Загрузка...</div>
              ) : (
                <>
                  <div className="header__limits-used">
                    Использовано компаний <b>{limits?.used ?? '-'}</b>
                  </div>
                  <div className="header__limits-total">
                    Лимит по компаниям<b className="header__limits-green">{limits?.total ?? '-'}</b>
                  </div>
                </>
              )}
            </div>
            <div className="header__profile">
              <div className="header__profile User">
                <span className="header__profile-name">{user.name}</span>
                <button className="header__logout-btn" onClick={onLogout}>Выйти</button>
              </div>
              <div>
                <img src={useravatar} alt={user.name} className="header__profile-avatar" />
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/register" className="header__register-btn">Зарегистрироваться</Link>
            <img src={Rect} alt="Разделитель" className="header__dividerImg" />
            <Link to="/login" className="header__login-btn">Войти</Link>
          </>
        )}
        <button
          className="header__burger"
          aria-label="Открыть меню"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="header__burger-lines">
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
          </span>
        </button>
      </div>
      {isMenuOpen && (
        <div className="header__mobile-menu">
          <div className="header__mobile-top">
            <img src={LogoBurger} alt="СКАН" />
            <button className="header__close" onClick={() => setIsMenuOpen(false)}>×</button>
          </div>
          <nav className="header__mobile-nav">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link>
            <Link to="/tariffs" onClick={() => setIsMenuOpen(false)}>Тарифы</Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
          </nav>
          {!user ? (
            <div className="header__mobile-auth">
              <span className="header__mobile-register">Зарегистрироваться</span>
              <Link to="/login" className="header__mobile-login" onClick={() => setIsMenuOpen(false)}>Войти</Link>
            </div>
          ) : (
            <div className="header__mobile-auth">
              <span className="header__profile-name">{user.name}</span>
              <button
                className="header__logout-btn"
                onClick={() => {
                  setIsMenuOpen(false);
                  onLogout();
                }}
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;