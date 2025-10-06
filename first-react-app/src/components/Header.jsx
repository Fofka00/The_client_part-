import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Img/SGN_09_24_2022_1663968217400 1.svg';
import Rect from '../Img/Rectangle 7.svg';
import useravatar from '../Img/Mask group (3).svg';

function Header({ user, limits, loadingLimits, onLogout }) {
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
                    Лимит по компаниям <b className="header__limits-green">{limits?.total ?? '-'}</b>
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
      </div>
    </header>
  );
}

export default Header;