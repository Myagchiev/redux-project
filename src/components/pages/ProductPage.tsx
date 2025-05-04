import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import Breadcrumbs from '../Breadcrumbs';
import CardTemplate from '../CardTemplate';
import Button from '../Button';
import ProductCard from '../ProductCard';
import AvatarSlider from '../AvatarSlider';
import Notification from '../Notification';
import { Product, Bird, Grain, Products, ProductCardProps, ProductCategory, RouteParams, CartItem, ButtonProps } from '@/types/types';
import { products } from '@/data/products';
import { weights, calculateTotalPrice } from '../../utils/weightUtils';
import '../../scss/forComponents/ProductPage.scss';

const ProductPage: React.FC = () => {
  const { category, id } = useParams<RouteParams>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedWeight, setSelectedWeight] = useState<string>(weights[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const product = useMemo(() => {
    if (!category || !id) return null;
    const categoryProducts = products[category as keyof Products] as Array<Product | Bird | Grain>;
    return categoryProducts?.find((item) => item.id.toString() === id);
  }, [category, id]);

  const getRandomRecommendations = (excludeCategory: ProductCategory | undefined, count = 4): ProductCardProps[] => {
    if (!excludeCategory) return [];
    const allCategories = Object.keys(products).filter(
      (cat) => cat !== excludeCategory && cat !== 'bird'
    ) as ProductCategory[];

    const availableProducts = allCategories
      .flatMap((cat) =>
        (products[cat as keyof Products] as Array<Product | Grain>).map((prod) => ({
          id: prod.id.toString(),
          name: prod.name,
          price: 'basePrice' in prod ? prod.basePrice : undefined,
          image: prod.image,
          description: prod.description,
          showWeights: ['gotovye-miksy', 'otdelnye-vidy-kormov', 'gotovye-komplekty', 'grains'].includes(cat),
          showCart: true,
          showPrice: 'basePrice' in prod,
          category: cat,
          isBird: false,
        }))
      );

    const shuffledProducts = [...availableProducts].sort(() => Math.random() - 0.5);
    return shuffledProducts.slice(0, Math.min(count, shuffledProducts.length));
  };

  const viewedProducts = useMemo(() => getRandomRecommendations(category as ProductCategory), [category]);
  const boughtProducts = useMemo(() => getRandomRecommendations(category as ProductCategory), [category]);

  if (!product) {
    return (
      <section className="product-page">
        <Breadcrumbs />
        <div className="container">
          <p>Продукт не найден</p>
        </div>
      </section>
    );
  }

  const totalPrice = 'basePrice' in product ? calculateTotalPrice(product.basePrice, selectedWeight, quantity) : 0;

  const handleWeightChange = (weight: string) => {
    setSelectedWeight(weight);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!id || !category || !totalPrice || !selectedWeight || !quantity) {
      return;
    }
    dispatch(
      addToCart({
        id: `${category}-${id}`,
        name: product.name,
        price: totalPrice / quantity,
        image: product.image || '',
        weight: selectedWeight,
        quantity,
      } as CartItem)
    );
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const getAvatarSliders = () => {
    const sliders: React.ReactElement[] = [];

    if (category === 'kormushki' && 'recommendedBirds' in product) {
      const recommendedBirds = products.bird
        .filter((bird) => product.recommendedBirds?.some((b) => b.id === bird.id))
        .map((bird) => ({ id: bird.id, name: bird.name, image: bird.image }));
      if (recommendedBirds.length) {
        sliders.push(
          <AvatarSlider
            key="birds"
            items={recommendedBirds}
            title="Виды птиц, для которых подойдёт данный товар"
            itemsPerPage={4}
          />
        );
      }
    } else if (category === 'aksessuary-i-drugoe' && 'suitableFor' in product) {
      const suitableBirds = products.bird
        .filter((bird) => product.suitableFor?.some((b) => b.id === bird.id))
        .map((bird) => ({ id: bird.id, name: bird.name, image: bird.image }));
      if (suitableBirds.length) {
        sliders.push(
          <AvatarSlider
            key="birds"
            items={suitableBirds}
            title="Виды птиц, для которых подойдёт данный товар"
            itemsPerPage={4}
          />
        );
      }
    } else if (
      ['gotovye-miksy', 'otdelnye-vidy-kormov', 'gotovye-komplekty'].includes(category as ProductCategory) &&
      ('relatedBirds' in product || 'grains' in product)
    ) {
      if ('relatedBirds' in product && product.relatedBirds?.length) {
        const relatedBirds = products.bird
          .filter((bird) => product.relatedBirds?.some((b) => b.id === bird.id))
          .map((bird) => ({ id: bird.id, name: bird.name, image: bird.image }));
        if (relatedBirds.length) {
          sliders.push(
            <AvatarSlider
              key="birds"
              items={relatedBirds}
              title="Виды птиц, для которых подойдёт данный товар"
              itemsPerPage={4}
            />
          );
        }
      }
      if ('grains' in product && product.grains?.length) {
        const relatedGrains = products.grains
          .filter((grain) => product.grains?.some((g) => g.id === grain.id))
          .map((grain) => ({ id: grain.id, name: grain.name, image: grain.image }));
        if (relatedGrains.length) {
          sliders.push(
            <AvatarSlider
              key="grains"
              items={relatedGrains}
              title="Зёрна, из которых состоит данный товар"
              itemsPerPage={4}
            />
          );
        }
      }
    } else if (category === 'grains' && 'relatedBirds' in product && 'relatedMixes' in product) {
      const relatedBirds = products.bird
        .filter((bird) => product.relatedBirds?.some((b) => b.id === bird.id))
        .map((bird) => ({ id: bird.id, name: bird.name, image: bird.image }));

      const relatedMixes = product.relatedMixes || [];

      if (relatedBirds.length) {
        sliders.push(
          <AvatarSlider
            key="birds"
            items={relatedBirds}
            title="Виды птиц, которые питаются данным видом зерна"
            itemsPerPage={4}
          />
        );
      }
      if (relatedMixes.length) {
        sliders.push(
          <AvatarSlider
            key="mixes"
            items={relatedMixes}
            title="Виды миксов, которые содержат данный вид зерна"
            itemsPerPage={4}
          />
        );
      }
    }

    return sliders;
  };

  return (
    <section className="product-page">
      <Breadcrumbs productName={product.name} />
      <CardTemplate
        image={product.imageBig || product.image}
        alt={product.name}
        title={product.name}
        description={
          Array.isArray(product.pageDescription)
            ? product.pageDescription.join(' ')
            : product.description
        }
      >
        {'basePrice' in product && product.basePrice && (
          <>
            <div className="product-page__weights">
              {weights.map((weight) => (
                <button
                  key={weight}
                  className={`weight-option ${selectedWeight === weight ? 'active' : ''}`}
                  onClick={() => handleWeightChange(weight)}
                  aria-label={`Выбрать вес ${weight}`}
                >
                  {weight}
                </button>
              ))}
            </div>
            <p className="product-page__price">{totalPrice} ₽</p>
            <div className="product-page__quantity">
              <p>Количество:</p>
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Уменьшить количество"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                aria-label="Увеличить количество"
              >
                +
              </button>
            </div>
            <div className="product-page__actions">
              <Button
                text="Купить"
                backgroundColor="var(--main-green-color)"
                onClick={handleBuyNow}
              />
              <Button
                text="Добавить в корзину"
                backgroundColor="white"
                color="var(--main-green-color)"
                border="1px solid var(--main-green-color)"
                onClick={handleAddToCart}
              />
            </div>
          </>
        )}
      </CardTemplate>

      {getAvatarSliders().length > 0 && (
        <div className="avatar-sliders container">{getAvatarSliders()}</div>
      )}

      <section className="recommendations">
        <div className="container">
          <h2>С этим товаром смотрят</h2>
          <div className="recommendations__grid">
            {viewedProducts.map((p) => (
              <ProductCard
                key={`${p.category}-${p.id}`}
                {...p}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="recommendations">
        <div className="container">
          <h2>С этим товаром покупают</h2>
          <div className="recommendations__grid">
            {boughtProducts.map((p) => (
              <ProductCard
                key={`${p.category}-${p.id}`}
                {...p}
              />
            ))}
          </div>
        </div>
      </section>

      {showNotification && (
        <Notification
          message="Товар добавлен в корзину!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </section>
  );
};

export default ProductPage;