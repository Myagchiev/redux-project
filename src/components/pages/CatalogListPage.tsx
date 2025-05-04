import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import type { Category } from '../../data/categories';
import '../../scss/forComponents/CatalogListPage.scss';

const CatalogListPage: React.FC = () => {
  return (
    <section className="catalog-list-page">
      <div className="container">
        <h2>Каталог</h2>
        <div className="categories-grid">
          {categories
            .filter((cat: Category) => cat.path.startsWith('/catalog/'))
            .map((category: Category) => (
              <Link
                key={category.path}
                to={category.path}
                className="category-item"
              >
                {category.name}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogListPage;
