import '../scss/forComponents/Button.scss'; // Импорт стилей кнопки

const Button = ({
  text = 'Подробнее', // Текст по умолчанию
  color = '#fff', // Цвет текста по умолчанию (белый)
  width = 'auto', // Изменили на auto, чтобы кнопка растягивалась
  height = 'auto',
  padding = '12px 32px', // Паддинги по умолчанию (top/bottom left/right)
  backgroundColor = 'var(--main-green-color)', // Фон по умолчанию через CSS-переменную
  border = 'none',
  borderColor,
  margin = '0',
  ...props // Остальные пропсы (например, onClick)
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
      {...props} // Передаём дополнительные пропсы, например onClick
    >
      {text}
    </button>
  );
};

export default Button;
