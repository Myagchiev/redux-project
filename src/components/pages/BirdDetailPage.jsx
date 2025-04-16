import { useParams } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs';
import CardTemplate from '../CardTemplate';
import ProductCard from '../ProductCard';
import AvatarSlider from '../AvatarSlider';
import { products } from '../../data/products';
import '../../scss/forComponents/BirdDetailPage.scss';

const BirdDetailPage = () => {
  const { id } = useParams();
  const cleanId = id.toString();
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

  const getRecommendations = (type) => {
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

  const viewedItems = getRecommendations('bird');
  const boughtItems = getRecommendations('grains');

  const relatedGrains = products.grains
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
