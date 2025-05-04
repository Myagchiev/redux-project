import { useState } from 'react';
import ProductCard from '../ProductCard';
import Breadcrumbs from '../Breadcrumbs';
import Pagination from '../Pagination';
import { products } from '../../data/products';
import { Bird } from '../../types/types';
import '../../scss/forComponents/BirdsPage.scss';

const BirdsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 8;

  const extendedBirds: Bird[] = [];
  const originalBirds: Bird[] = products.bird || [];
  for (
    let i = 0;
    extendedBirds.length < 24 && originalBirds.length > 0;
    i++
  ) {
    extendedBirds.push(originalBirds[i % originalBirds.length]);
  }

  const totalPages: number = Math.ceil(extendedBirds.length / itemsPerPage);

  const paginatedItems: Bird[] = extendedBirds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="birds-page container">
      <Breadcrumbs />
      <h2>Птицы</h2>
      <div className="birds-grid">
        {paginatedItems.map((bird, index) => (
          <ProductCard
            key={`bird-${bird.id}-${index}`}
            id={bird.id.toString()}
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