import { useState, useEffect } from 'react';
import '../scss/forComponents/Button.scss';

const Button = ({
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <button
      className="custom-button"
      style={{
        width,
        height,
        padding,
        backgroundColor,
        color,
        border,
        margin: isMobile ? '10px 0 0' : margin,
        borderColor,
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
