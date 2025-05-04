import { useMemo } from 'react';
import { Product, Bird, Grain, ProductCategory } from '@/types/types';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import '../scss/forComponents/Recommendations.scss';

interface RecommendationsProps {
  category?: string;
  excludeId: string | number;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  category = 'grains',
  excludeId,
}) => {
  const items = useMemo(() => {
    const source = products[category as keyof typeof products] as Array<Product | Bird | Grain> | undefined;
    return source
      ? source
          .filter((item) => item.id.toString() !== excludeId.toString())
          .slice(0, 4)
      : [];
  }, [category, excludeId]);

  return (
    <div className="recommendations">
      <h2>Рекомендации</h2>
      <div className="recommendations__grid">
        {items.map((item) => (
          <ProductCard
            key={`${category}-${item.id}`}
            id={item.id.toString()}
            name={item.name}
            price={'basePrice' in item ? item.basePrice : undefined}
            image={item.image}
            description={item.description}
            showPrice={'basePrice' in item && !!item.basePrice}
            showWeights={['gotovye-miksy', 'otdelnye-vidy-kormov', 'gotovye-komplekty', 'grains'].includes(
              category
            )}
            showCart={'basePrice' in item && !!item.basePrice}
            category={category as ProductCategory}
            isBird={category === 'bird'}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;