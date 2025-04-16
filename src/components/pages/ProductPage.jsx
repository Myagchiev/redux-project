import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import Breadcrumbs from '../Breadcrumbs';
import CardTemplate from '../CardTemplate';
import Button from '../Button';
import ProductCard from '../ProductCard';
import AvatarSlider from '../AvatarSlider';
import Notification from '../Notification';
import { products } from '../../data/products';
import { weights, calculateTotalPrice } from '../../utils/weightUtils';
import '../../scss/forComponents/ProductPage.scss';

const ProductPage = () => {
  const { category, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const product = products[category]?.find((item) => item.id.toString() === id);

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

  const totalPrice = calculateTotalPrice(
    product.basePrice,
    selectedWeight,
    quantity
  );

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
  };

  const handleQuantityChange = (delta) => {
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
        image: product.image,
        weight: selectedWeight,
        quantity,
      })
    );
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const getRecommendations = useMemo(() => {
    const allCategories = Object.keys(products).filter(
      (cat) => cat !== category && cat !== 'bird'
    );
    const recommendations = [];

    while (recommendations.length < 4 && allCategories.length > 0) {
      const randomCategory =
        allCategories[Math.floor(Math.random() * allCategories.length)];
      const categoryProducts = products[randomCategory];
      if (categoryProducts && categoryProducts.length > 0) {
        const randomProduct =
          categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
        if (
          !recommendations.some(
            (p) => p.id === randomProduct.id && p.category === randomCategory
          )
        ) {
          recommendations.push({
            ...randomProduct,
            id: randomProduct.id,
            category: randomCategory,
          });
        }
      }
      allCategories.splice(allCategories.indexOf(randomCategory), 1);
    }

    return recommendations;
  }, [category]);

  const viewedProducts = getRecommendations;
  const boughtProducts = getRecommendations;

  const getAvatarSliders = () => {
    const sliders = [];

    if (category === 'kormushki') {
      if (product.recommendedBirds?.length) {
        sliders.push(
          <AvatarSlider
            key="birds"
            items={product.recommendedBirds}
            title="Виды птиц, для которых подойдёт данный товар"
          />
        );
      }
    } else if (category === 'aksessuary-i-drugoe') {
      if (product.suitableFor?.length) {
        sliders.push(
          <AvatarSlider
            key="birds"
            items={product.suitableFor}
            title="Виды птиц, для которых подойдёт данный товар"
          />
        );
      }
    } else if (
      ['gotovye-miksy', 'otdelnye-vidy-kormov', 'gotovye-komplekty'].includes(
        category
      )
    ) {
      if (product.relatedBirds?.length) {
        sliders.push(
          <AvatarSlider
            key="birds"
            items={product.relatedBirds}
            title="Виды птиц, для которых подойдёт данный товар"
          />
        );
      }
      if (product.grains?.length) {
        sliders.push(
          <AvatarSlider
            key="grains"
            items={product.grains}
            title="Зёрна, из которых состоит данный товар"
          />
        );
      }
    } else if (category === 'grains') {
      if (product.relatedBirds?.length) {
        sliders.push(
          <AvatarSlider
            key="birds1"
            items={product.relatedBirds}
            title="Виды птиц, которые питаются данным видом зерна"
          />,
          <AvatarSlider
            key="birds2"
            items={product.relatedMixes}
            title="Виды миксов, которыесодержат данный вид зерна"
          />
        );
      }
    } else if (category === 'bird') {
      const relatedGrains = products.grains.filter((grain) =>
        grain.relatedBirds.some((bird) => bird.id.toString() === id)
      );
      if (relatedGrains.length) {
        sliders.push(
          <AvatarSlider
            key="grains1"
            items={relatedGrains.map((grain) => ({
              id: grain.id,
              name: grain.name,
              image: grain.image,
            }))}
            title="Виды зёрен, которыми питаются данные птицы"
          />,
          <AvatarSlider
            key="grains2"
            items={relatedGrains.map((grain) => ({
              id: grain.id,
              name: grain.name,
              image: grain.image,
            }))}
            title="Виды зёрен, которыми питаются данные птицы"
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
        description={product.pageDescription || product.description}
      >
        {product.basePrice && (
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
                name={p.name}
                price={p.basePrice}
                image={p.image}
                description={p.description}
                showWeights={[
                  'gotovye-miksy',
                  'otdelnye-vidy-kormov',
                  'gotovye-komplekty',
                  'grains',
                ].includes(p.category)}
                showCart={true}
                showPrice={!!p.basePrice}
                id={p.id}
                category={p.category}
                isBird={false}
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
                name={p.name}
                price={p.basePrice}
                image={p.image}
                description={p.description}
                showWeights={[
                  'gotovye-miksy',
                  'otdelnye-vidy-kormov',
                  'gotovye-komplekty',
                  'grains',
                ].includes(p.category)}
                showCart={true}
                showPrice={!!p.basePrice}
                id={p.id}
                category={p.category}
                isBird={false}
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
