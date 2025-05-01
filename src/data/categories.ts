export interface Category {
  name: string;
  path: string;
}

export const categories: Category[] = [
  { name: 'Готовые миксы', path: '/catalog/gotovye-miksy' },
  { name: 'Отдельные виды кормов', path: '/catalog/otdelnye-vidy-kormov' },
  { name: 'Кормушки', path: '/catalog/kormushki' },
  { name: 'Готовые комплекты', path: '/catalog/gotovye-komplekty' },
  { name: 'Аксессуары и другое', path: '/catalog/aksessuary-i-drugoe' },
  { name: 'Зёрна', path: '/catalog/grains' },
];