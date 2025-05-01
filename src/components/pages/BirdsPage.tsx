import { useState } from 'react';
import ProductCard from '../ProductCard';
import Breadcrumbs from '../Breadcrumbs';
import Pagination from '../Pagination';
import { products } from '../../data/products';
import '../../scss/forComponents/BirdsPage.scss';

// Тип для объекта птицы
interface Bird {
  id: number;
  name: string;
  image: string;
  description: string;
}

// Тип для расширенного объекта птицы (с модифицированным id)
interface ExtendedBird extends Omit<Bird, 'id'> {
  id: string; // id в формате `${number}-${number}`
}

// Тип для данных products
interface ProductsData {
  bird: Bird[];
  [key: string]: any; // Для других категорий, если они есть
}

// Типизация пропсов компонентов
interface ProductCardProps {
  key: string;
  id: string;
  name: string;
  image: string;
  description: string;
  showPrice: boolean;
  showWeights: boolean;
  showCart: boolean;
  category: string;
  isBird: boolean;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Типизация Breadcrumbs, если не нужны пропсы
interface BreadcrumbsProps {}

// Типизация данных products
declare const products: ProductsData;

const BirdsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 8;

  // Дублирование карточек
  const extendedBirds: ExtendedBird[] = [];
  const originalBirds: Bird[] = products.bird || [];
  for (
    let i = 0;
    extendedBirds.length < 24 && originalBirds.length > 0;
    i++
  ) {
    const bird = originalBirds[i % originalBirds.length];
    extendedBirds.push({
      ...bird,
      id: `${bird.id}-${extendedBirds.length}`,
    });
  }

  const totalPages: number = Math.ceil(extendedBirds.length / itemsPerPage);

  const paginatedItems: ExtendedBird[] = extendedBirds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="birds-page container">
      <Breadcrumbs />
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