import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';
import CardTemplate from '../CardTemplate';
import ProductCard from '../ProductCard';
import AvatarSlider from '../AvatarSlider';
import { products } from '../../data/products';
import '../../scss/forComponents/BirdDetailPage.scss';

// Типизация параметров маршрута
interface RouteParams {
  id: string;
}

// Тип для объекта птицы
interface Bird {
  id: number;
  name: string;
  image: string;
  imageBig?: string;
  description: string;
  pageDescription?: string;
  relatedMixes?: Array<{ id: number; name: string; image: string }>;
}

// Тип для объекта зерна
interface Grain {
  id: number;
  name: string;
  image: string;
  relatedBirds?: Array<{ id: number }>;
  basePrice?: number;
  description?: string;
}

// Тип для объекта рекомендаций
interface Recommendation {
  id: number;
  name: string;
  image: string;
  description?: string;
  basePrice?: number;
  category: string;
}

// Тип для данных products
interface ProductsData {
  bird: Bird[];
  grains: Grain[];
  [key: string]: Array<Bird | Grain>;
}

// Типизация пропсов компонентов
interface BreadcrumbsProps {
  productName?: string;
}

interface CardTemplateProps {
  image: string;
  alt: string;
  title: string;
  description: string;
}

interface ProductCardProps {
  key: string;
  name: string;
  image: string;
  description?: string;
  showPrice: boolean;
  showWeights: boolean;
  showCart: boolean;
  id: number;
  category: string;
  isBird: boolean;
  price?: number;
}

interface AvatarSliderProps {
  items: Array<{ id: number; name: string; image: string }>;
  title: string;
  itemsPerPage: number;
}

// Типизация данных products
declare const products: ProductsData;

const BirdDetailPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const cleanId = id?.toString() || '';
  const bird = products.bird.find((item) => item.id.toString() === cleanId);

  if (!bird) {
    return (
      <section className="bird-detail-page">
        <Breadcrumbs />
        <div className="container">
          <p>Птица не найдена</p>
        </div>
      </section>
    );
  }

  const getRecommendations = (type: string): Recommendation[] => {
    const source = type === 'bird' ? products.bird : products[type];
    return source
      .filter((item) => item.id.toString() !== cleanId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4)
      .map((item) => ({
        ...item,
        id: item.id,
        category: type,
      }));
  };

  const viewedItems: Recommendation[] = getRecommendations('bird');
  const boughtItems: Recommendation[] = getRecommendations('grains');

  const relatedGrains: Array<{ id: number; name: string; image: string }> =
    products.grains
      .filter((grain) =>
        grain.relatedBirds?.some((b) => b.id.toString() === cleanId)
      )
      .map((grain) => ({
        id: grain.id,
        name: grain.name,
        image: grain.image,
      }));

  return (
    <section className="bird-detail-page">
      <Breadcrumbs productName={bird.name} />
      <CardTemplate
        image={bird.imageBig || bird.image}
        alt={bird.name}
        title={bird.name}
        description={bird.pageDescription || bird.description}
      />

      <div className="avatar-sliders container">
        {relatedGrains.length > 0 && (
          <AvatarSlider
            items={relatedGrains}
            title="Виды зёрен, которыми питаются данные птицы"
            itemsPerPage={4}
          />
        )}
        {bird.relatedMixes?.length > 0 && (
          <AvatarSlider
            items={bird.relatedMixes}
            title="Виды миксов, которыми могут питаться данные птицы"
            itemsPerPage={4}
          />
        )}
      </div>

      <section className="recommendations">
        <div className="container">
          <h2>Другие птицы</h2>
          <div className="recommendations__grid">
            {viewedItems.map((item) => (
              <ProductCard
                key={`${item.category}-${item.id}`}
                name={item.name}
                image={item.image}
                description={item.description}
                showPrice={false}
                showWeights={false}
                showCart={false}
                id={item.id}
                category={item.category}
                isBird={true}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="recommendations">
        <div className="container">
          <h2>Рекомендуемые корма</h2>
          <div className="recommendations__grid">
            {boughtItems.map((item) => (
              <ProductCard
                key={`${item.category}-${item.id}`}
                name={item.name}
                price={item.basePrice}
                image={item.image}
                description={item.description}
                showWeights={true}
                showCart={true}
                showPrice={true}
                id={item.id}
                category={item.category}
                isBird={false}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default BirdDetailPage;