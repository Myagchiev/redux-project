import { useState } from 'react';
import ProductCard from '../ProductCard';
import Breadcrumbs from '../Breadcrumbs';
import Pagination from '../Pagination';
import { products } from '../../data/products';
import '../../scss/forComponents/BirdsPage.scss';

const BirdsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Дублируем птиц до 24
  const extendedBirds = [];
  const originalBirds = products.bird || [];
  for (let i = 0; extendedBirds.length < 24 && originalBirds.length > 0; i++) {
    const bird = originalBirds[i % originalBirds.length];
    extendedBirds.push({
      ...bird,
      id: `${bird.id}-${extendedBirds.length}`,
    });
  }

  const totalPages = Math.ceil(extendedBirds.length / itemsPerPage);

  const paginatedItems = extendedBirds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="birds-page container">
      <Breadcrumbs /> {/* Добавлено */}
      <h2>Птицы</h2>
      <div className="birds-grid">
        {paginatedItems.map((bird) => (
          <ProductCard
            key={`bird-${bird.id}`}
            id={bird.id.split('-')[0]}
            name={bird.name}
            image={bird.image}
            description={bird.description}
            showPrice={false}
            showWeights={false}
            showCart={false}
            category="bird"
            isBird={true}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BirdsPage;
