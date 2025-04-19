import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import '../../scss/forComponents/CatalogListPage.scss';

const CatalogListPage = () => {
  return (
    <section className="catalog-list-page">
      <div className="container">
        <h2>Каталог</h2>
        <div className="categories-grid">
          {categories
            .filter((cat) => cat.path.startsWith('/catalog/'))
            .map((category) => (
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
