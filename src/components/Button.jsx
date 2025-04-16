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
        margin,
        borderColor,
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
