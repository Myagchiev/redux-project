import { useState, useMemo } from 'react';
import ProductCard from '../ProductCard';
import Breadcrumbs from '../Breadcrumbs';
import Pagination from '../Pagination';
import { products } from '../../data/products';
import '../../scss/forComponents/CatalogPages.scss';

const GrainsPage = () => {
  const category = 'grains';

  const categoryProducts = useMemo(() => products.grains || [], []);

  const extendedProducts = useMemo(() => {
    const result = [];
    for (let i = 0; result.length < 24 && categoryProducts.length > 0; i++) {
      const product = categoryProducts[i % categoryProducts.length];
      result.push({
        ...product,
        id: `${product.id}-${result.length}`,
      });
    }
    return result;
  }, [categoryProducts]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(extendedProducts.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const displayProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return extendedProducts.slice(startIndex, endIndex);
  }, [currentPage, extendedProducts]);

  if (!extendedProducts.length) {
    return (
      <section className="catalog-page">
        <Breadcrumbs />
        <div className="container">
          <h2>Зёрна</h2>
          <p>Товары в этой категории отсутствуют</p>
        </div>
      </section>
    );
  }

  return (
    <section className="catalog-page">
      <Breadcrumbs />
      <div className="container">
        <h2>Зёрна</h2>
        <div className="products-grid">
          {displayProducts.map((product, index) => (
            <ProductCard
              key={`${category}-${product.id}-${index}`}
              name={product.name}
              price={product.basePrice}
              image={product.image}
              description={product.description}
              showWeights={true}
              showCart={true}
              showPrice={true}
              id={product.id.split('-')[0]}
              category={category}
              isBird={false}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default GrainsPage;
