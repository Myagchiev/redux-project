import { useState, useEffect, useRef, KeyboardEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CiSearch, CiMenuBurger } from 'react-icons/ci';
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from 'react-icons/io';
import { FiUserPlus, FiShoppingCart, FiPhone } from 'react-icons/fi';
import Logo from '../assets/logo.svg';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { Product as ProductType, Grain } from '@/types/types';
import '../scss/forComponents/Navbar.scss';

interface SearchProduct {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface NavbarState {
  cart: {
    itemsCount: number;
  };
}

const Navbar: React.FC = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const catalogRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const cartItemsCount = useSelector((state: NavbarState) => state.cart?.itemsCount || 0);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    setIsAuthenticated(!!savedUser);

    const handleClickOutside = (event: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target as Node)) {
        setIsCatalogOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
        setSearchQuery('');
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.mobile-menu-toggle')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results: SearchProduct[] = [];
    Object.keys(products).forEach((category) => {
      if (category === 'bird') return;

      const categoryData = categories.find((cat) => cat.path === `/catalog/${category}`);
      const categoryName = categoryData ? categoryData.name : category;

      const categoryProducts = products[category as keyof typeof products] as Array<
        ProductType | Grain
      >;
      categoryProducts.forEach((product) => {
        if (
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.description &&
            product.description.toLowerCase().includes(query.toLowerCase())) ||
          categoryName.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            id: product.id.toString(),
            name: product.name,
            category,
            image: product.image,
          });
        }
      });
    });
    setSearchResults(results.slice(0, 5));
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const firstResult = searchResults[0];
      navigate(`/catalog/${firstResult.category}/${firstResult.id}`);
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
              {cartItemsCount > 0 && <span className="cartCount">{cartItemsCount}</span>}
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
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
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
                    <li key={`${result.category}-${result.id}`}>
                      <Link
                        to={`/catalog/${result.category}/${result.id}`}
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
                  <li key={`${result.category}-${result.id}`}>
                    <Link
                      to={`/catalog/${result.category}/${result.id}`}
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