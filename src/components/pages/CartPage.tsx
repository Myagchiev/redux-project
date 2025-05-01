import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import CheckoutModal from '@/components/CheckoutModal';
import { FiTrash2 } from 'react-icons/fi';
import empty from '@/assets/empty.png';
import emptyPhone from '@/assets/emptyPhone.png';
import '@/scss/forComponents/CartPage.scss';

// Тип для пропсов
interface CartPageProps {
  onOrderUpdate: () => void; // Предполагаю, что это функция без аргументов
}

// Тип для элемента корзины (должен совпадать с CartItem в cartSlice.ts)
interface CartItem {
  id: number;
  weight: number;
  quantity: number;
  price: number;
  name: string;
  image?: string;
}

const CartPage: React.FC<CartPageProps> = ({ onOrderUpdate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const handleRemove = (id: number, weight: number) => {
    dispatch(removeFromCart({ id, weight }));
  };

  const handleQuantityChange = (id: number, weight: number, delta: number) => {
    dispatch(updateQuantity({ id, weight, delta }));
  };

  const handleCheckout = () => {
    if (!cart.items.length) return;

    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      alert('Пожалуйста, войдите в аккаунт для оформления заказа');
      return;
    }

    setIsCheckoutOpen(true);
  };

  const handleConfirmCheckout = () => {
    dispatch(clearCart());
    setIsCheckoutOpen(false);
    navigate('/payment-delivery');
  };

  const totalSum = cart.items.reduce(
    (sum, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  if (!cart.items.length) {
    return (
      <section className="cart-page">
        <Breadcrumbs />
        <div className="empty container">
          <h2>Ваша корзина пуста...</h2>
          <picture>
            <img src={emptyPhone} alt="пусто" className="empty__image" />
            <img src={empty} alt="пусто" className="emptyDesk__image" />
          </picture>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <Breadcrumbs />
      <div className="container">
        <div className="cart-items">
          {cart.items.map((item: CartItem) => (
            <div key={`${item.id}-${item.weight}`} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item__image"
              />
              <div className="cart-item__details">
                <h3>{item.name}</h3>
                <p>Вес: {item.weight}</p>
                <p>Цена за единицу: {item.price} ₽</p>
                <div className="cart-item__quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.weight, -1)
                    }
                    aria-label="Уменьшить количество"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.weight, 1)
                    }
                    aria-label="Увеличить количество"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="cart-item__actions">
                <p>{item.price * item.quantity} ₽</p>
                <FiTrash2
                  className="cart-item__remove"
                  onClick={() => handleRemove(item.id, item.weight)}
                  aria-label="Удалить из корзины"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Итого: {totalSum} ₽</h3>
          <Button
            text="Оформить заказ"
            backgroundColor="var(--main-green-color)"
            onClick={handleCheckout}
          />
        </div>
      </div>
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onConfirm={handleConfirmCheckout}
        onOrderUpdate={onOrderUpdate}
      />
    </section>
  );
};

export default CartPage;