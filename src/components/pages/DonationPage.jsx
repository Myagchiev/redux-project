import Breadcrumbs from '../Breadcrumbs';
import DonationForm from './DonationForm';
import donat from '../../assets/donation-banner.jpg';
import Button from '../Button';
import '../../scss/forComponents/DonationPage.scss';

const DonationPage = () => {
  return (
    <section className="donation-page">
      <Breadcrumbs />
      <div className="container">
        <h1 className="donation-page__title">Пожертвования</h1>

        {/* Баннер */}
        <div className="donation-page__banner">
          <img src={donat} alt="Поддержите проект" />
          <div className="banner-text">
            <h2>Поддержите наших пернатых друзей</h2>
            <p>Ваши пожертвования помогают нам улучшать жизнь птиц!</p>
            <Button
              text="Пожертвовать сейчас"
              backgroundColor="var(--main-green-color)"
              color="#fff"
              padding="12px 30px"
            />
          </div>
        </div>

        {/* Информация */}
        <div className="donation-page__info">
          <h2>Куда идут ваши деньги</h2>
          <p>
            Все пожертвования направляются на улучшение кормов, поддержку
            исследований и защиту птиц в природе.
          </p>
          <ul>
            <li>Разработка новых экологичных кормов</li>
            <li>Программы по изучению птиц</li>
            <li>Помощь заповедникам</li>
          </ul>
        </div>
      </div>
      <DonationForm />
    </section>
  );
};

export default DonationPage;
