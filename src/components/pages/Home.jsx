import { useMemo } from 'react'; // Изменение 1: Импорт useMemo
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import ProductCard from '../ProductCard';
import DonationForm from './DonationForm';
import Button from '../Button';
import { products } from '../../data/products';
import catalogMixes from '../../assets/catalogMixes.png';
import catalogFeeds from '../../assets/catalogFeeds.png';
import catalogFeeders from '../../assets/catalogFeeders.png';
import '../../scss/forComponents/Home.scss';

const Home = () => {
  const catalogItems = useMemo(
    // Изменение 2: Мемоизация catalogItems
    () => [
      {
        name: 'Кормушки',
        path: '/catalog/kormushki',
        image: catalogFeeders,
      },
      {
        name: 'Готовые миксы',
        description: '(смеси кормов)',
        path: '/catalog/gotovye-miksy',
        image: catalogMixes,
      },
      {
        name: 'Отдельные виды кормов',
        description: '(зёрен)',
        path: '/catalog/grains',
        image: catalogFeeds,
      },
    ],
    []
  );

  const getCategoryProducts = (category, count = 4) => {
    const baseProduct = products[category]?.[0];
    if (!baseProduct) {
      return [];
    }
    return Array.from({ length: count }, (_, index) => ({
      ...baseProduct,
      id: baseProduct.id,
    }));
  };

  const getRandomItems = (array, count = 4) => {
    if (!array || array.length === 0) {
      return [];
    }
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, array.length));
  };

  const productsData = useMemo(
    // Изменение 3: Обновление productsData с useMemo
    () => ({
      mixesProducts: getCategoryProducts('gotovye-miksy'),
      birdsProducts: getRandomItems(products.bird),
      grainsProducts: getRandomItems(products.grains),
      feedersProducts: getCategoryProducts('kormushki'),
    }),
    []
  );

  const sections = useMemo(
    // Изменение 4: Мемоизация sections
    () => [
      {
        title: 'Готовые миксы',
        products: productsData.mixesProducts,
        path: '/catalog/gotovye-miksy',
        showPrice: true,
        showWeights: true,
        showCart: true,
        category: 'gotovye-miksy',
        isBird: false,
      },
      {
        title: 'Виды птиц',
        products: productsData.birdsProducts,
        path: '/birds',
        showPrice: false,
        showWeights: false,
        showCart: false,
        category: 'bird',
        isBird: true,
      },
      {
        title: 'Зёрна',
        products: productsData.grainsProducts,
        path: '/catalog/grains',
        showPrice: true,
        showWeights: true,
        showCart: true,
        category: 'grains',
        isBird: false,
      },
      {
        title: 'Кормушки',
        products: productsData.feedersProducts,
        path: '/catalog/kormushki',
        showPrice: true,
        showWeights: false,
        showCart: true,
        category: 'kormushki',
        isBird: false,
      },
    ],
    [productsData]
  );

  return (
    <div className="home">
      <section className="catalog-preview">
        <div className="container">
          <h2>Каталог</h2>
          <div className="catalog-preview__grid mobile-slider">
            {catalogItems.map((item) => (
              <div key={item.path} className="catalog-preview__card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="catalog-preview__image"
                  loading="lazy"
                />
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
                <Link to={item.path}>
                  <Button
                    margin="30px 0 0 0"
                    aria-label={`Перейти к категории ${item.name}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section key={section.title} className="category-section">
          <div className="container">
            <div className="category-section__header">
              <h2>{section.title}</h2>
              <Link
                to={section.path}
                className="category-section__more"
                aria-label={`Посмотреть больше товаров в категории ${section.title}`}
              >
                Ещё <IoIosArrowDown />
              </Link>
            </div>
            <div className="category-section__grid">
              {section.products.length > 0 ? (
                section.products.map((product, index) => (
                  <ProductCard
                    key={`${section.category}-${product.id}-${index}`}
                    name={product.name}
                    price={product.basePrice}
                    showPrice={section.showPrice}
                    image={product.image}
                    description={product.description}
                    showWeights={section.showWeights}
                    showCart={section.showCart}
                    id={product.id}
                    category={section.category}
                    isBird={section.isBird}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                ))
              ) : (
                <p>Товары в этой категории отсутствуют</p>
              )}
            </div>
          </div>
        </section>
      ))}

      <DonationForm />
    </div>
  );
};

export default Home;
