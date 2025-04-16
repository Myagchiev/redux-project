import { useLocation, useNavigate, Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import '../scss/forComponents/Breadcrumbs.scss';
import { categories } from '../data/categories';

const Breadcrumbs = ({ productName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const crumbs = [
    { path: '/', name: 'Главная', isLast: pathnames.length === 0 },
  ];
  let path = '';

  pathnames.forEach((value, index) => {
    path += `/${value}`;
    const isLast = index === pathnames.length - 1;
    let displayName = value;

    if (value === 'catalog' && index === 0) {
      displayName = 'Каталог';
      path = '/';
    } else if (index === 1 && pathnames[0] === 'catalog') {
      const category = categories.find(
        (cat) => cat.path === `/catalog/${value}`
      );
      displayName = category ? category.name : value;
      if (value === 'grains') displayName = 'Зёрна';
      if (value === 'gotovye-miksy') displayName = 'Готовые миксы';
      if (value === 'kormushki') displayName = 'Кормушки';
    } else if (index === 2 && pathnames[0] === 'catalog' && productName) {
      displayName = productName;
    } else if (value === 'birds') {
      displayName = 'Птицы';
    } else if (index === 1 && pathnames[0] === 'birds' && productName) {
      displayName = productName;
    } else if (value === 'donations') {
      displayName = 'Пожертвования';
    } else if (value === 'about') {
      displayName = 'О проекте';
    } else if (value === 'login') {
      displayName = 'Профиль';
    } else if (value === 'cart') {
      displayName = 'Корзина';
    }

    crumbs.push({ path, name: displayName, isLast });
  });

  const uniqueCrumbs = crumbs.filter(
    (crumb, index, self) =>
      index ===
      self.findIndex((c) => c.path === crumb.path && c.name === crumb.name)
  );

  return (
    <div className="container">
      <nav className="breadcrumbs">
        {uniqueCrumbs.map(({ path, name, isLast }, index) => (
          <div key={path} className="breadcrumb-item">
            {!isLast ? (
              <Link to={path} className="breadcrumb-link">
                {name}
              </Link>
            ) : (
              <span className="breadcrumb-current">{name}</span>
            )}
            {index < uniqueCrumbs.length - 1 && (
              <span className="breadcrumb-separator">•</span>
            )}
          </div>
        ))}
      </nav>
      <button
        className="breadcrumbs__back"
        onClick={() => navigate(-1)}
        aria-label="Вернуться назад"
        disabled={pathnames.length === 0}
      >
        <IoIosArrowBack className="arrowBack" /> Назад
      </button>
    </div>
  );
};

export default Breadcrumbs;
