import * as React from 'react';
import { useState, useEffect } from 'react';
import '@/scss/forComponents/Button.scss';

// Интерфейс для пропсов
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  color?: string;
  width?: string;
  height?: string;
  padding?: string;
  backgroundColor?: string;
  border?: string;
  borderColor?: string;
  margin?: string;
}

const Button: React.FC<ButtonProps> = ({
  text = 'Подробнее',
  color = '#fff',
  width = 'auto',
  height = 'auto',
  padding = '12px 32px',
  backgroundColor = 'var(--main-green-color)',
  border = 'none',
  borderColor,
  margin = '0',
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

  const buttonStyles: React.CSSProperties = {
    width,
    height,
    padding,
    backgroundColor,
    color,
    border,
    margin: isMobile ? '10px 0 0' : margin,
    borderColor,
  };

  return (
    <button className="custom-button" style={buttonStyles} {...props}>
      {text}
    </button>
  );
};

export default Button;