import { useLocation, useNavigate, Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import '../scss/forComponents/Breadcrumbs.scss';
import { categories } from '../data/categories';

interface Breadcrumb {
  path: string;
  name: string;
  isLast: boolean;
}

interface BreadcrumbsProps {
  productName?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ productName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const crumbs: Breadcrumb[] = [
    { path: '/', name: 'Главная', isLast: pathnames.length === 0 },
  ];

  let currentPath = '';

  pathnames.forEach((value, index) => {
    currentPath += `/${value}`;
    const isLast = index === pathnames.length - 1;
    let displayName = value;

    if (value === 'catalog' && index === 0) {
      displayName = 'Каталог';
      currentPath = '/catalog';
    } else if (index === 1 && pathnames[0] === 'catalog') {
      const category = categories.find(
        (cat) => cat.path === `/catalog/${value}`
      );
      displayName = category ? category.name : value;
      const categoryNames: Record<string, string> = {
        grains: 'Зёрна',
        'gotovye-miksy': 'Готовые миксы',
        kormushki: 'Кормушки',
        'gotovye-komplekty': 'Готовые комплекты',
        'otdelnye-vidy-kormov': 'Отдельные виды кормов',
        'aksessuary-i-drugoe': 'Аксессуары и другое',
      };
      displayName = categoryNames[value] || displayName;
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

    crumbs.push({ path: currentPath, name: displayName, isLast });
  });

  const uniqueCrumbs = crumbs.reduce((acc: Breadcrumb[], crumb) => {
    const exists = acc.find(
      (c) => c.path === crumb.path && c.name === crumb.name
    );
    if (!exists) acc.push(crumb);
    return acc;
  }, []);

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
