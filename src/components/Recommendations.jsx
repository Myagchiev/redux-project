import React, { useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import '../scss/forComponents/Recommendations.scss';

const Recommendations = ({ category = 'grains', excludeId }) => {
  const items = useMemo(() => {
    const source = products[category] || [];
    return source
      .filter((item) => item.id.toString() !== excludeId)
      .slice(0, 4);
  }, [category, excludeId]);

  return (
    <div className="recommendations">
      <h2>Рекомендации</h2>
      <div className="recommendations__grid">
        {items.map((item) => (
          <ProductCard
            key={`${category}-${item.id}`}
            id={item.id}
            name={item.name}
            price={item.basePrice}
            image={item.image}
            description={item.description}
            showPrice={!!item.basePrice}
            showWeights={[
              'gotovye-miksy',
              'otdelnye-vidy-kormov',
              'gotovye-komplekty',
              'grains',
            ].includes(category)}
            showCart={!!item.basePrice}
            category={category}
            isBird={category === 'bird'}
          />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
