import { useState, FormEvent } from 'react';
import { IMaskInput } from 'react-imask';
import Button from './Button';
import '../scss/forComponents/CheckoutModal.scss';
import { CartItem, Order, OrderItem } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

interface Cart {
  items: CartItem[];
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onConfirm: () => void;
  onOrderUpdate?: (order: Order) => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryDate: string;
  comment: string;
  paymentMethod: string;
  agreement: boolean;
}

interface Errors {
  name: string;
  phone: string;
  email: string;
  address: string;
  deliveryDate: string;
  paymentMethod: string;
  agreement: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onConfirm,
  onOrderUpdate,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryDate: '',
    comment: '',
    paymentMethod: '',
    agreement: false,
  });
  const [errors, setErrors] = useState<Errors>({
    name: '',
    phone: '',
    email: '',
    address: '',
    deliveryDate: '',
    paymentMethod: '',
    agreement: '',
  });

  const totalSum = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const validateStep1 = (): boolean => {
    const newErrors: Errors = {
      name: '',
      phone: '',
      email: '',
      address: errors.address,
      deliveryDate: errors.deliveryDate,
      paymentMethod: errors.paymentMethod,
      agreement: errors.agreement,
    };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = 'Введите ФИО';
      isValid = false;
    } else if (formData.name.trim().split(' ').length < 2) {
      newErrors.name = 'Введите минимум два слова (например, Имя Фамилия)';
      isValid = false;
    }

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone) {
      newErrors.phone = 'Введите номер телефона';
      isValid = false;
    } else if (cleanedPhone.length !== 11) {
      newErrors.phone = 'Введите корректный номер телефона (например, +7 (999) 999-99-99)';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Введите email';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Errors = {
      name: errors.name,
      phone: errors.phone,
      email: errors.email,
      address: '',
      deliveryDate: '',
      paymentMethod: errors.paymentMethod,
      agreement: errors.agreement,
    };
    let isValid = true;

    if (!formData.address) {
      newErrors.address = 'Введите адрес';
      isValid = false;
    } else if (formData.address.length < 5) {
      newErrors.address = 'Адрес должен содержать минимум 5 символов';
      isValid = false;
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Выберите дату доставки';
      isValid = false;
    } else {
      const selectedDate = new Date(formData.deliveryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.deliveryDate = 'Дата доставки не может быть раньше сегодняшнего дня';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Errors = {
      name: errors.name,
      phone: errors.phone,
      email: errors.email,
      address: errors.address,
      deliveryDate: errors.deliveryDate,
      paymentMethod: '',
      agreement: '',
    };
    let isValid = true;

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Выберите способ оплаты';
      isValid = false;
    }

    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласиться с условиями';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    const cleanedPhone = formData.phone.replace(/\D/g, '');
    const formattedPhone = cleanedPhone.startsWith('7')
      ? `+${cleanedPhone}`
      : `+7${cleanedPhone}`;

    const orderItems: OrderItem[] = cart.items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      weight: item.weight,
      price: item.price,
      quantity: item.quantity,
      uniqueId: item.uniqueId || uuidv4(),
    }));

    const order: Order = {
      id: `order-${Date.now()}`,
      items: orderItems,
      total: totalSum,
      date: new Date().toISOString().split('T')[0],
      userEmail: formData.email,
      deliveryDetails: {
        name: formData.name,
        phone: formattedPhone,
        address: formData.address,
        deliveryDate: formData.deliveryDate,
        comment: formData.comment,
        paymentMethod: formData.paymentMethod,
      },
    };

    const savedOrders = localStorage.getItem('orders');
    const orders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    if (onOrderUpdate) {
      onOrderUpdate(order);
    }

    setStep(4);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      deliveryDate: '',
      comment: '',
      paymentMethod: '',
      agreement: false,
    });
    setErrors({
      name: '',
      phone: '',
      email: '',
      address: '',
      deliveryDate: '',
      paymentMethod: '',
      agreement: '',
    });
    if (step === 4) {
      onConfirm();
    }
    onClose();
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    return date.toLocaleDateString('ru-RU', options);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Закрыть модальное окно"
        >
          ✕
        </button>

        {step === 1 && (
          <form className="checkout-form" onSubmit={handleNext}>
            <h2>Оплата и доставка</h2>
            <p className="fund-text">
              10% от стоимости Вашего заказа идут в фонд
            </p>
            <div className="input-group">
              <input
                type="text"
                placeholder="ФИО"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="input-group">
              <IMaskInput
                mask="+7 (000) 000-00-00"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onAccept={(value) =>
                  setFormData({ ...formData, phone: value })
                }
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="error">
                  {errors.phone}
                </p>
              )}
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="error">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="modal-footer">
              <p className="total">Итого: {totalSum} ₽</p>
              <Button
                type="submit"
                text="Дальше"
                backgroundColor="var(--main-green-color)"
              />
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="checkout-form" onSubmit={handleNext}>
            <h2>Оплата и доставка</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Адрес доставки"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <p id="address-error" className="error">
                  {errors.address}
                </p>
              )}
            </div>
            <div className="input-group">
              <input
                type="date"
                value={formData.deliveryDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryDate: e.target.value })
                }
                aria-invalid={!!errors.deliveryDate}
                aria-describedby={
                  errors.deliveryDate ? 'deliveryDate-error' : undefined
                }
              />
              {errors.deliveryDate && (
                <p id="deliveryDate-error" className="error">
                  {errors.deliveryDate}
                </p>
              )}
            </div>
            <div className="input-group">
              <textarea
                placeholder="Комментарий к заказу"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <p className="total">Итого: {totalSum} ₽</p>
              <Button
                type="submit"
                text="Дальше"
                backgroundColor="var(--main-green-color)"
              />
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="checkout-form" onSubmit={handleNext}>
            <h2>Оплата и доставка</h2>
            <h3>Способ оплаты:</h3>
            <div className="payment-options">
              <label
                className={`payment-option ${
                  formData.paymentMethod === 'cash' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={() =>
                    setFormData({ ...formData, paymentMethod: 'cash' })
                  }
                  aria-invalid={!!errors.paymentMethod}
                />
                Наличными или картой при получении
              </label>
              <label
                className={`payment-option ${
                  formData.paymentMethod === 'online' ? 'selected' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={() =>
                    setFormData({ ...formData, paymentMethod: 'online' })
                  }
                  aria-invalid={!!errors.paymentMethod}
                />
                Оплата картой на сайте
              </label>
              {errors.paymentMethod && (
                <p id="paymentMethod-error" className="error">
                  {errors.paymentMethod}
                </p>
              )}
            </div>
            <div className="agreement">
              <label>
                <input
                  type="checkbox"
                  checked={formData.agreement}
                  onChange={(e) =>
                    setFormData({ ...formData, agreement: e.target.checked })
                  }
                  aria-invalid={!!errors.agreement}
                  aria-describedby={
                    errors.agreement ? 'agreement-error' : undefined
                  }
                />
                Оформляя заказ, я даю своё согласие на обработку персональных
                данных и подтверждаю ознакомление с договором-офертой
              </label>
              {errors.agreement && (
                <p id="agreement-error" className="error">
                  {errors.agreement}
                </p>
              )}
            </div>
            <div className="modal-footer">
              <p className="total">Итого: {totalSum} ₽</p>
              <Button
                type="submit"
                text="Оплатить"
                backgroundColor="var(--main-green-color)"
              />
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="success-modal">
            <h2>Заказ успешно оформлен</h2>
            <div className="success-content">
              <div className="success-thank-you">
                <Button text="Спасибо" onClick={handleClose} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;