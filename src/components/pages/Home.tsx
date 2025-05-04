import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import ProductCard from '../ProductCard';
import DonationForm from './DonationForm';
import Button from '../Button';
import { Product, Bird, Grain, Products, CatalogItem, SectionConfig, ProductCategory } from '@/types/types';
import { products } from '@/data/products';
import catalogMixes from '../../assets/catalogMixes.png';
import catalogFeeders from '../../assets/catalogFeeders.png';
import catalogFeeds from '../../assets/catalogFeeds.png';
import '../../scss/forComponents/Home.scss';

const Home: React.FC = () => {
  const catalogItems: CatalogItem[] = useMemo(
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
        name: 'Зёрна',
        description: '(отдельные виды кормов)',
        path: '/catalog/grains',
        image: catalogFeeds,
      },
    ],
    []
  );

  const getCategoryProducts = (category: keyof Products, count = 4): Product[] => {
    const baseProduct = products[category]?.[0] as Product | undefined;
    if (!baseProduct) {
      return [];
    }
    return Array(count).fill(baseProduct);
  };

  const getRandomItems = <T extends { id: number }>(
    array: T[] | undefined,
    count = 4
  ): T[] => {
    if (!array || array.length === 0) return [];
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, array.length));
  };

  const productsData = useMemo(
    () => ({
      mixesProducts: getCategoryProducts('gotovye-miksy'),
      birdsProducts: getRandomItems<Bird>(products.bird),
      grainsProducts: getRandomItems<Grain>(products.grains),
      feedersProducts: getCategoryProducts('kormushki'),
    }),
    []
  );

  const sections: SectionConfig[] = useMemo(
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
                    text="Подробнее"
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
                section.products.map((product: Product | Bird | Grain, index: number) => (
                  <ProductCard
                    key={`${section.category}-${product.id}-${index}`}
                    id={product.id.toString()}
                    name={product.name}
                    price={'basePrice' in product ? product.basePrice : undefined}
                    showPrice={section.showPrice}
                    image={product.image}
                    description={product.description}
                    showWeights={section.showWeights}
                    showCart={section.showCart}
                    category={section.category as ProductCategory}
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