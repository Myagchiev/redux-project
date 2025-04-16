import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CiSearch, CiMenuBurger } from 'react-icons/ci';
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from 'react-icons/io';
import { FiUserPlus, FiShoppingCart, FiPhone } from 'react-icons/fi';
import Logo from '../assets/logo.svg';
import { categories } from '../data/categories';
import { products } from '../data/products';
import '../scss/forComponents/Navbar.scss';

const Navbar = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const catalogRef = useRef(null);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemsCount = useSelector((state) => state.cart?.itemsCount || 0);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    setIsAuthenticated(!!savedUser);

    const handleClickOutside = (event) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setIsCatalogOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
        setSearchQuery('');
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-toggle')
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = [];
    Object.keys(products).forEach((category) => {
      if (category === 'bird') return;
      products[category].forEach((product) => {
        const categoryName =
          categories.find((cat) => cat.path === `/catalog/${category}`)?.name ||
          category;
        if (
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.description &&
            product.description.toLowerCase().includes(query.toLowerCase())) ||
          categoryName.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            id: `${category}-${product.id}`,
            name: product.name,
            category,
            image: product.image,
          });
        }
      });
    });
    setSearchResults(results.slice(0, 5));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const firstResult = searchResults[0];
      navigate(
        `/catalog/${firstResult.category}/${firstResult.id.split('-')[1]}`
      );
      setSearchQuery('');
      setSearchResults([]);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="topRow">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Логотип" />
            </Link>
          </div>
          <div className="topRight">
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {isMobileMenuOpen ? <IoIosClose /> : <CiMenuBurger />}
            </button>
            <div className="phone">
              <FiPhone />
              <span>8 920 999 43 50</span>
            </div>
            <Link to="/cart" className="cart">
              <FiShoppingCart
                className={`cartIcon ${location.pathname === '/cart' ? 'active' : ''} ${
                  cartItemsCount === 0 ? 'empty' : ''
                }`}
              />
              {cartItemsCount > 0 && (
                <span className="cartCount">{cartItemsCount}</span>
              )}
            </Link>
            <Link to="/login" className="profile">
              <FiUserPlus
                className={`userIcon ${location.pathname === '/login' ? 'active' : ''} ${
                  !isAuthenticated ? 'empty' : ''
                }`}
              />
            </Link>
          </div>
        </div>

        <div className={`bottomRow ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="navLinks" ref={mobileMenuRef}>
            <div
              className="catalog"
              ref={catalogRef}
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsCatalogOpen(!isCatalogOpen);
                }
              }}
            >
              Каталог {isCatalogOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              {isCatalogOpen && (
                <ul className={`dropdown ${isCatalogOpen ? 'open' : ''}`}>
                  {categories.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => {
                          setIsCatalogOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              О проекте
            </Link>
            <Link to="/birds" onClick={() => setIsMobileMenuOpen(false)}>
              Птицы
            </Link>
            <Link to="/donations" onClick={() => setIsMobileMenuOpen(false)}>
              Пожертвования
            </Link>
            <div className="mobile-search" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  aria-label="Поиск товаров"
                />
                <CiSearch className="searchIcon" />
              </form>
              {searchResults.length > 0 && (
                <ul className="search-results">
                  {searchResults.map((result) => (
                    <li key={result.id}>
                      <Link
                        to={`/catalog/${result.category}/${result.id.split('-')[1]}`}
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <img
                          src={result.image}
                          alt={result.name}
                          className="search-result__image"
                        />
                        <span>{result.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="search desktop-search" ref={searchRef}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                aria-label="Поиск товаров"
              />
              <CiSearch className="searchIcon" />
            </form>
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((result) => (
                  <li key={result.id}>
                    <Link
                      to={`/catalog/${result.category}/${result.id.split('-')[1]}`}
                      onClick={() => {
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                    >
                      <img
                        src={result.image}
                        alt={result.name}
                        className="search-result__image"
                      />
                      <span>{result.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
