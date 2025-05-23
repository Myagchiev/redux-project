import Breadcrumbs from '../Breadcrumbs';
import Button from '../Button';
import about from '../../assets/about-intro.jpg';
import anna from '../../assets/team-anna.jpg';
import ivan from '../../assets/team-ivan.jpg';
import maria from '../../assets/team-maria.jpg';
import '../../scss/forComponents/AboutPage.scss';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const AboutPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Анна',
      role: 'Основатель',
      image: anna,
    },
    {
      name: 'Иван',
      role: 'Орнитолог',
      image: ivan,
    },
    {
      name: 'Мария',
      role: 'Дизайнер',
      image: maria,
    },
  ];

  return (
    <section className="about-page">
      <Breadcrumbs />
      <div className="container">
        <h1 className="about-page__title">О проекте</h1>

        <div className="about-page__section about-page__intro">
          <div className="about-page__content">
            <h2>Кто мы такие</h2>
            <p>
              Мы — команда энтузиастов, которые заботятся о здоровье и счастье
              птиц. Наш проект создан, чтобы предоставить владельцам пернатых
              друзей лучшие корма, аксессуары и знания для ухода.
            </p>
            <Button
              text="Узнать больше"
              backgroundColor="var(--main-green-color)"
              onClick={() => alert('Вы уже достаточно знаете!')}
            />
          </div>
          <div className="about-page__image">
            <img src={about} alt="О нас" />
          </div>
        </div>

        <div className="about-page__section about-page__mission">
          <h2>Наша миссия</h2>
          <p className="mission-text">
            Сделать жизнь птиц ярче и здоровее, предлагая экологичные корма и
            помогая владельцам лучше понимать своих питомцев.
          </p>
        </div>

        <div className="about-page__section about-page__team">
          <h2>Наша команда</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="team-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-card__image"
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;