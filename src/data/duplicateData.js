// src/data/duplicateData.js
import { products } from './products.js';

// Дублируем птиц до 12 штук
export const duplicatedBirds = Array(24)
  .fill()
  .map((_, i) => ({
    ...products.bird[i % products.bird.length],
    id: `${products.bird[i % products.bird.length].id}-${i}`, // Уникальный ID
  }));

// Дублируем зерна до 12 штук
export const duplicatedGrains = Array(24)
  .fill()
  .map((_, i) => ({
    ...products.grains[i % products.grains.length],
    id: `${products.grains[i % products.grains.length].id}-${i}`,
  }));
