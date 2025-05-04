import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { addToCart } from '@/redux/cartSlice';
import Button from '@/components/Button';
import Notification from '@/components/Notification';
import { weights, calculateTotalPrice } from '@/utils/weightUtils';
import { ProductCardProps, CartItem, ProductCategory } from '@/types/types';
import '@/scss/forComponents/ProductCard.scss';

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price: basePrice,
  showPrice = true,
  image,
  description,
  showWeights = true,
  showCart = true,
  id,
  category,
  isBird = false,
  style,
}) => {
  const dispatch = useDispatch();
  const [selectedWeight, setSelectedWeight] = useState<string>(weights[0]);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const totalPrice = useMemo<number | null>(
    () => (basePrice ? calculateTotalPrice(basePrice, selectedWeight) : null),
    [basePrice, selectedWeight]
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isBird || !id || !category || !totalPrice || !selectedWeight) {
      return;
    }

    dispatch(
      addToCart({
        id: `${category}-${id}`,
        name,
        price: totalPrice,
        image,
        weight: selectedWeight,
        quantity: 1,
      } as CartItem)
    );

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleWeightChange = (weight: string) => {
    setSelectedWeight(weight);
  };

  return (
    <div className={isBird ? 'bird-card' : 'product-card'} style={style}>
      <img
        src={image}
        alt={name}
        className={isBird ? 'bird-card__image' : 'product-card__image'}
        loading="lazy"
      />
      <h3>{name}</h3>
      <p className={isBird ? '' : 'product-card__description'}>{description}</p>
      {showPrice && !isBird && totalPrice && (
        <p className="product-card__price">{totalPrice} ₽</p>
      )}
      {showWeights && !isBird && totalPrice && (
        <div className="product-card__weights">
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
      )}
      <div className="product-card__actions">
        <Link to={isBird ? `/birds/${id}` : `/catalog/${category}/${id}`}>
          <Button
            text="Подробнее"
            backgroundColor="var(--main-green-color)"
            aria-label={`Подробнее о ${name}`}
          />
        </Link>
        {showCart && !isBird && totalPrice && (
          <div className="cart_div">
            <FiShoppingCart
              className="product-card__cart-icon"
              onClick={handleAddToCart}
              aria-label={`Добавить ${name} в корзину`}
            />
          </div>
        )}
      </div>

      {showNotification && (
        <Notification
          message="Товар добавлен в корзину!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;