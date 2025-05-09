import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Breadcrumbs from '../Breadcrumbs';
import Button from '../Button';
import avatar from '../../assets/avatar.png';
import { BiEditAlt } from 'react-icons/bi';
import '../../scss/forComponents/LoginPage.scss';
import { Order, OrderItem } from '@/types/types';
import { IMaskInput } from 'react-imask';
import { v4 as uuidv4 } from 'uuid';

interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
}

interface LoginPageProps {
  orders: Order[];
}

const LoginPage = ({ orders: propOrders }: LoginPageProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [editName, setEditName] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [editPassword, setEditPassword] = useState<string>('');
  const [editAddress, setEditAddress] = useState<string>('');
  const [editNameError, setEditNameError] = useState<string>('');
  const [editPhoneError, setEditPhoneError] = useState<string>('');
  const [editPasswordError, setEditPasswordError] = useState<string>('');
  const [editAddressError, setEditAddressError] = useState<string>('');

  const normalizeWeight = (weight: string): string => {
    return weight.replace(/\s/g, '').toLowerCase();
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setUser(parsedUser);
      setIsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    let allOrders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];

    allOrders = allOrders.map((order: Order) => ({
      ...order,
      items: order.items.map((item: OrderItem) => {
        const uniqueId = item.uniqueId || uuidv4();
        if (
          item.id.includes('-') &&
          item.id.split('-').length === 3 &&
          !item.id.includes('uuid')
        ) {
          const [category, id, weight] = item.id.split('-');
          return {
            ...item,
            id: `${category}-${id}`,
            weight: normalizeWeight(weight || item.weight || ''),
            uniqueId,
          };
        }
        return {
          ...item,
          weight: normalizeWeight(item.weight || ''),
          uniqueId,
        };
      }),
    }));

    localStorage.setItem('orders', JSON.stringify(allOrders));
    setOrders(allOrders);
  }, []);

  const validatePhone = (value: string): string => {
    const phoneRegex = /^\+?\d{10,}$/;
    if (!value) {
      return 'Введите номер телефона';
    }
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return 'Введите корректный номер телефона (например, +79999999999)';
    }
    return '';
  };

  const validatePassword = (value: string): string => {
    if (!value) {
      return 'Введите пароль';
    }
    if (value.length < 6) {
      return 'Пароль должен содержать минимум 6 символов';
    }
    return '';
  };

  const validateName = (value: string): string => {
    if (!value) {
      return 'Введите ФИО';
    }
    if (value.trim().split(' ').length < 2) {
      return 'Введите минимум два слова (например, Имя Фамилия)';
    }
    return '';
  };

  const validateAddress = (value: string): string => {
    if (!value) {
      return 'Введите адрес';
    }
    if (value.length < 5) {
      return 'Адрес должен содержать минимум 5 символов';
    }
    return '';
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError(validatePhone(value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleEditNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditName(value);
    setEditNameError(validateName(value));
  };

  const handleEditPhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditPhone(value);
    setEditPhoneError(validatePhone(value));
  };

  const handleEditPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditPassword(value);
    setEditPasswordError(validatePassword(value));
  };

  const handleEditAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditAddress(value);
    setEditAddressError(validateAddress(value));
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    const phoneErr = validatePhone(phone);
    const passErr = validatePassword(password);

    if (phoneErr || passErr) {
      setPhoneError(phoneErr);
      setPasswordError(passErr);
      return;
    }

    const existingUser = localStorage.getItem('user');
    if (existingUser && JSON.parse(existingUser).phone === phone) {
      setPhoneError('Пользователь с таким номером уже зарегистрирован');
      return;
    }

    const newUser: User = {
      email: `${phone}@example.com`,
      phone,
      name: 'Николаев Николай Николаевич',
      password,
      address: 'Москва, ул. Примерная, д. 123',
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAuthenticated(true);
    setUser(newUser);
    setIsModalOpen(false);
    setPhone('');
    setPassword('');
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const phoneErr = validatePhone(phone);
    const passErr = validatePassword(password);

    if (phoneErr || passErr) {
      setPhoneError(phoneErr);
      setPasswordError(passErr);
      return;
    }

    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      setPhoneError('Пользователь не найден');
      return;
    }

    const parsedUser: User = JSON.parse(savedUser);
    if (parsedUser.phone === phone && parsedUser.password === password) {
      setIsAuthenticated(true);
      setUser(parsedUser);
      setIsModalOpen(false);
      setPhone('');
      setPassword('');
    } else {
      setPasswordError('Неверный номер телефона или пароль');
    }
  };

  const handleEditProfile = (e: FormEvent) => {
    e.preventDefault();
    const nameErr = validateName(editName);
    const phoneErr = validatePhone(editPhone);
    const passErr = validatePassword(editPassword);
    const addressErr = validateAddress(editAddress);

    if (nameErr || phoneErr || passErr || addressErr) {
      setEditNameError(nameErr);
      setEditPhoneError(phoneErr);
      setEditPasswordError(passErr);
      setEditAddressError(addressErr);
      return;
    }

    const updatedUser: User = {
      ...user!,
      name: editName,
      phone: editPhone,
      password: editPassword,
      address: editAddress,
      email: `${editPhone}@example.com`,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditModalOpen(false);
    setEditName('');
    setEditPhone('');
    setEditPassword('');
    setEditAddress('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setOrders([]);
    setIsModalOpen(true);
  };

  const handleCancelOrder = (orderId: string) => {
    console.log('Cancel order:', { orderId });
    const savedOrders = localStorage.getItem('orders');
    let allOrders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
    allOrders = allOrders.filter((order: Order) => order.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(allOrders));
    setOrders(allOrders);
  };

  const handleCancelItem = (orderId: string, uniqueId: string) => {
    console.log('Cancel item:', { orderId, uniqueId });
    const savedOrders = localStorage.getItem('orders');
    let allOrders: Order[] = savedOrders ? JSON.parse(savedOrders) : [];
    console.log('All orders before:', JSON.stringify(allOrders, null, 2));

    const orderIndex = allOrders.findIndex((order: Order) => order.id === orderId);
    if (orderIndex === -1) {
      console.log('Order not found:', orderId);
      return;
    }

    allOrders[orderIndex].items = allOrders[orderIndex].items.filter(
      (item: OrderItem) => item.uniqueId !== uniqueId
    );
    console.log(
      'Items after filter:',
      JSON.stringify(allOrders[orderIndex].items, null, 2)
    );

    if (allOrders[orderIndex].items.length === 0) {
      allOrders = allOrders.filter((order: Order) => order.id !== orderId);
      console.log('Order removed as it has no items');
    } else {
      allOrders[orderIndex].total = allOrders[orderIndex].items.reduce(
        (sum: number, item: OrderItem) => sum + item.price * item.quantity,
        0
      );
      console.log('Updated order total:', allOrders[orderIndex].total);
    }

    console.log('All orders after:', JSON.stringify(allOrders, null, 2));
    localStorage.setItem('orders', JSON.stringify(allOrders));
    setOrders([...allOrders]);
  };

  const handleCardClick = (orderId: string) => {
    if (window.confirm('Вы уверены, что хотите отменить заказ?')) {
      handleCancelOrder(orderId);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPhone('');
    setPassword('');
    setPhoneError('');
    setPasswordError('');
  };

  const openEditModal = () => {
    setEditName(user!.name);
    setEditPhone(user!.phone);
    setEditPassword(user!.password);
    setEditAddress(user!.address || 'Москва, ул. Примерная, д. 123');
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditName('');
    setEditPhone('');
    setEditPassword('');
    setEditAddress('');
    setEditNameError('');
    setEditPhoneError('');
    setEditPasswordError('');
    setEditAddressError('');
  };

  if (!isAuthenticated) {
    return (
      <section className="login-page">
        <Breadcrumbs />
        <div className="container">
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <button className="modal-close" onClick={closeModal}>
                  ✕
                </button>
                <h2>Вход в аккаунт</h2>
                <form className="login-form">
                  <div className="input-group">
                    <IMaskInput
                      mask="+7 (000) 000-00-00"
                      placeholder="+7 (999) 999-99-99"
                      value={phone}
                      onAccept={(value: any) =>
                        handlePhoneChange({ target: { value } } as any)
                      }
                      overwrite
                    />
                    {phoneError && <p className="error">{phoneError}</p>}
                  </div>
                  <div className="input-group">
                    <input
                      type="password"
                      placeholder="Пароль"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {passwordError && <p className="error">{passwordError}</p>}
                  </div>
                  <div className="modal-buttons">
                    <Button
                      text="Зарегистрироваться"
                      backgroundColor="#fff"
                      color="black"
                      border="1px solid"
                      borderColor="var(--gray-color)"
                      onClick={handleRegister}
                      padding="14px"
                      width="260px"
                    />
                    <Button
                      text="Войти в аккаунт"
                      backgroundColor="var(--main-green-color)"
                      onClick={handleLogin}
                      width="260px"
                      padding="14px"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="login-page">
      <Breadcrumbs />
      <div className="container">
        <div className="titles">
          <p>Аккаунт</p>
        </div>
        <div className="profile-wrapper">
          <div className="profile-left">
            <div className="profile-info">
              <img src={avatar} alt="Аватар" className="profile-avatar" />
              <div className="profile-details">
                <BiEditAlt
                  className="edit-icon"
                  onClick={openEditModal}
                  size={30}
                />
                <p className="profile-name">{user?.name}</p>
                <p className="profile-phone">
                  phone:{' '}
                  {user?.phone || (
                    <span className="add-phone">Добавить телефон</span>
                  )}
                </p>
                <p className="profile-email">{user?.email}</p>
              </div>
            </div>
            <h3>Адрес:</h3>
            <div className="profile-address">
              <p>{user?.address || 'Москва, ул. Примерная, д. 123'}</p>
            </div>
            <Button text="Выйти" backgroundColor="red" onClick={handleLogout} />
          </div>
          <div className="profile-right">
            {orders.length === 0 ? (
              <p className="emptyCart">У вас нет заказов</p>
            ) : (
              <>
                <h2 className="fillCart">Ваши заказы</h2>
                <div className="orders-list">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="order-item"
                      onClick={() => handleCardClick(order.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <p>
                        <strong>Заказ от {order.date}</strong>
                      </p>
                      <div className="order-summary">
                        <p>
                          <strong>Итого: {order.total} ₽</strong>
                        </p>
                        <div className="order-status">
                          <p>Статус: В обработке</p>
                          <Button
                            text="Отменить заказ"
                            backgroundColor="red"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCancelOrder(order.id);
                            }}
                          />
                        </div>
                      </div>
                      {order.items.map((item) => (
                        <div key={item.uniqueId} className="cart-item">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item__image"
                          />
                          <div className="cart-item__details">
                            <h3>{item.name}</h3>
                            <p>Вес: {item.weight}</p>
                            <p>Цена за единицу: {item.price} ₽</p>
                            <p>Количество: {item.quantity}</p>
                          </div>
                          <div className="cart-item__actions">
                            <p>{item.price * item.quantity} ₽</p>
                            <Button
                              text="Отменить"
                              backgroundColor="red"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCancelItem(order.id, item.uniqueId);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="modal-overlay edit-modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={closeEditModal}>
              ✕
            </button>
            <h2>Редактировать профиль</h2>
            <form className="login-form">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="ФИО"
                  value={editName}
                  onChange={handleEditNameChange}
                />
                {editNameError && <p className="error">{editNameError}</p>}
              </div>
              <div className="input-group">
                <IMaskInput
                  mask="+7 (000) 000-00-00"
                  placeholder="+7 (999) 999-99-99"
                  value={editPhone}
                  onAccept={(value: any) =>
                    handleEditPhoneChange({ target: { value } } as any)
                  }
                  overwrite
                />
                {editPhoneError && <p className="error">{editPhoneError}</p>}
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Пароль"
                  value={editPassword}
                  onChange={handleEditPasswordChange}
                />
                {editPasswordError && (
                  <p className="error">{editPasswordError}</p>
                )}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Адрес"
                  value={editAddress}
                  onChange={handleEditAddressChange}
                />
                {editAddressError && <p className="error">{editAddressError}</p>}
              </div>
              <Button
                text="Сохранить"
                backgroundColor="var(--main-green-color)"
                onClick={handleEditProfile}
                width="50%"
              />
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginPage;