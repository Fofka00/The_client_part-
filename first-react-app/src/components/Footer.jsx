import React from 'react';
import './Footer.css';
import FooterLogo from '../Img/eqw 1.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className='footerContainer'>
        <div>
          <img src={FooterLogo} alt="ReactLogo" />
        </div>
        <div className='footerInfo'>
          <div>
            <a href="">г. Москва, Цветной б-р, 40 <br /></a>
            <a href="">+7 495 771 21 11 <br /></a>
            <a href="">info@skan.ru</a>
          </div>
          <div>
            <a href="">Copyright. 2022</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;