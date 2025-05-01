import * as React from 'react';
import '../scss/forComponents/CardTemplate.scss';

// Интерфейс для пропсов
interface CardTemplateProps {
  image: string; // URL изображения
  alt?: string; // Альтернативный текст (опционально)
  title: string; // Заголовок
  description?: string | string[] | null; // Описание: строка, массив строк или null
  children?: React.ReactNode; // Дополнительный контент
}

const CardTemplate: React.FC<CardTemplateProps> = ({
  image,
  alt = 'Изображение',
  title,
  description,
  children,
}) => {
  const descriptionParts: string[] = Array.isArray(description)
    ? description
    : typeof description === 'string'
      ? description.split('<br>').filter((part) => part.trim() !== '')
      : [description || 'Описание отсутствует'];

  return (
    <section className="card-template">
      <div className="container">
        <div className="card-template__wrapper">
          <div className="card-template__image">
            <img src={image} alt={alt} />
          </div>
          <div className="card-template__content">
            <h2>{title}</h2>
            {descriptionParts.map((part, index) => (
              <p key={index} className="card-template__description">
                {part}
              </p>
            ))}
            {children && <div className="card-template__extra">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardTemplate;