import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import Breadcrumbs from '../Breadcrumbs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Product, Products, ProductCategory, RouteParams } from '@/types/types';
import { products } from '@/data/products';
import '../../scss/forComponents/CatalogPages.scss';

const CatalogPage: React.FC = () => {
  const { category } = useParams<RouteParams>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categoryProducts = useMemo(() => {
    if (!category || !products[category as keyof Products]) return [];
    const originalProducts = products[category as keyof Products] as Product[];
    const result: Product[] = [];
    for (let i = 0; result.length < 24 && originalProducts.length > 0; i++) {
      result.push(originalProducts[i % originalProducts.length]);
    }
    return result;
  }, [category]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);

  const displayProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return categoryProducts.slice(startIndex, endIndex);
  }, [currentPage, categoryProducts]);

  if (!category || !products[category as keyof Products] || categoryProducts.length === 0) {
    return (
      <section className="catalog-page">
        <Breadcrumbs />
        <div className="container">
          <h2>Категория не найдена</h2>
          <p>Категория не найдена</p>
        </div>
      </section>
    );
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const weightCategories: ProductCategory[] = [
    'gotovye-miksy',
    'grains',
    'gotovye-komplekty',
    'otdelnye-vidy-kormov',
    'kormushki',
    'aksessuary-i-drugoe',
  ];
  const showWeights = weightCategories.includes(category as ProductCategory);

  const cartCategories: ProductCategory[] = [
    'gotovye-miksy',
    'grains',
    'gotovye-komplekty',
    'otdelnye-vidy-kormov',
    'kormushki',
    'aksessuary-i-drugoe',
  ];
  const showCart = cartCategories.includes(category as ProductCategory);

  return (
    <section className="catalog-page">
      <Breadcrumbs />
      <div className="container">
        <div className="products-grid" key={`page-${currentPage}`}>
          {displayProducts.map((product: Product, index: number) => (
            <ProductCard
              key={`${category}-${product.id}`}
              name={product.name}
              price={product.basePrice}
              image={product.image}
              description={product.description}
              showWeights={showWeights}
              showCart={showCart}
              id={product.id.toString()}
              category={category as ProductCategory}
              isBird={false}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination__arrow"
              onClick={handlePrev}
              disabled={currentPage === 1}
              aria-label="Предыдущая страница"
            >
              <IoIosArrowBack />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`pagination__number ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
                onClick={() => handlePageChange(index + 1)}
                aria-label={`Страница ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination__arrow"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Следующая страница"
            >
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogPage;