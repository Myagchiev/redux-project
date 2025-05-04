import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  CartState,
} from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';
import CheckoutModal from '@/components/CheckoutModal';
import { FiTrash2 } from 'react-icons/fi';
import empty from '@/assets/empty.png';
import emptyPhone from '@/assets/emptyPhone.png';
import { Order, CartItem } from '@/types/types';
import '@/scss/forComponents/CartPage.scss';

interface CartPageProps {
  onOrderUpdate: (newOrder: Order) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onOrderUpdate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart) as CartState;
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const handleRemove = (id: string, weight: string) => {
    dispatch(removeFromCart({ id, weight }));
  };

  const handleQuantityChange = (id: string, weight: string, delta: number) => {
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
    const newOrder: Order = {
      id: Date.now().toString(),
      items: cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        weight: item.weight,
        price: item.price,
        quantity: item.quantity,
        uniqueId: item.uniqueId,
      })),
      total: totalSum,
      date: new Date().toISOString(),
    };
    onOrderUpdate(newOrder);
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
          <div className="empty-images">
            <img
              src={emptyPhone}
              alt="Пустая корзина"
              className="empty__image"
            />
            <img src={empty} alt="Пустая корзина" className="emptyDesk__image" />
          </div>
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
            <div key={item.uniqueId} className="cart-item">
              <img
                src={item.image ?? empty}
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
                    disabled={item.quantity <= 1}
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
                  aria-label={`Удалить ${item.name} из корзины`}
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
            disabled={!cart.items.length}
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