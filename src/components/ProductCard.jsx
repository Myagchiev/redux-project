import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from './Button';
import Notification from './Notification';
import { weights, calculateTotalPrice } from '../utils/weightUtils';
import '../scss/forComponents/ProductCard.scss';

const ProductCard = ({
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
}) => {
  const dispatch = useDispatch();
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [showNotification, setShowNotification] = useState(false);

  const totalPrice = useMemo(
    () => (basePrice ? calculateTotalPrice(basePrice, selectedWeight) : null),
    [basePrice, selectedWeight]
  );

  const handleAddToCart = (e) => {
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
      })
    );

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
  };

  return (
    <div className={isBird ? 'bird-card' : 'product-card'}>
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
