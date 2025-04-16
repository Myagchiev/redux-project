import '../scss/forComponents/Footer.scss';
import FooterPhone from '../assets/footerPhone.svg';
import VK from '../assets/vk.svg';
import Inst from '../assets/inst.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__left">
          <p>Оплата</p>
          <p>Доставка</p>
        </div>
        <div className="footer__center">
          <img src={VK} alt="Иконка ВКонтакте" />
          <img src={Inst} alt="Иконка Instagram" />
        </div>
        <div className="footer__right">
          <img src={FooterPhone} alt="Иконка телефона" />
          <span> 8 920 999 43 50</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
