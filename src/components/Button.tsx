import { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import { ButtonProps } from '@/types/types';
import '@/scss/forComponents/Button.scss';

const Button: React.FC<ButtonProps> = ({
  text = 'Подробнее',
  color = '#fff',
  padding = '12px 32px',
  backgroundColor = 'var(--main-green-color)',
  border = 'none',
  margin = '0',
  'aria-label': ariaLabel,
  ...props
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const buttonStyles: CSSProperties = {
    padding,
    backgroundColor,
    color,
    border,
    margin: isMobile ? '10px 0 0' : margin,
  };

  return (
    <button
      className="custom-button"
      style={buttonStyles}
      aria-label={ariaLabel || (text ? undefined : 'Кнопка действия')}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;