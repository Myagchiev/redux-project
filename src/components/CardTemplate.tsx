import { ReactNode } from 'react';
import '../scss/forComponents/CardTemplate.scss';
interface CardTemplateProps {
  image: string;
  alt?: string;
  title: string;
  description?: string | string[] | null;
  children?: ReactNode;
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
      : ['Описание отсутствует'];

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