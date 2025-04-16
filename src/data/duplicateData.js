import { products } from './products.js';

export const duplicatedBirds = Array(24)
  .fill()
  .map((_, i) => ({
    ...products.bird[i % products.bird.length],
    id: `${products.bird[i % products.bird.length].id}-${i}`,
  }));

export const duplicatedGrains = Array(24)
  .fill()
  .map((_, i) => ({
    ...products.grains[i % products.grains.length],
    id: `${products.grains[i % products.grains.length].id}-${i}`,
  }));
