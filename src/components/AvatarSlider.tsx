import { useState, useMemo } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RelatedItem } from '@/types/types';
import '../scss/forComponents/AvatarSlider.scss';

interface AvatarSliderProps {
  items: RelatedItem[];
  title: string;
  itemsPerPage?: number;
}

const AvatarSlider: React.FC<AvatarSliderProps> = ({ items, title, itemsPerPage = 4 }) => {
  const [startIndex, setStartIndex] = useState<number>(0);

  const visibleItems = useMemo(
    () => items.slice(startIndex, startIndex + itemsPerPage),
    [items, startIndex, itemsPerPage]
  );

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(items.length - itemsPerPage, prev + 1));
  };

  if (!items.length) {
    return null;
  }

  return (
    <div className="avatar-slider container" role="region" aria-labelledby={`slider-title-${title}`}>
      <div className="avatar-slider__wrapper">
        <h2 id={`slider-title-${title}`}>{title}</h2>
        <div className="second_wrapper">
          <button
            className="avatar-slider__arrow"
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Предыдущие элементы"
            tabIndex={0}
          >
            <IoIosArrowBack />
          </button>
          <div className="avatar-slider__grid">
            {visibleItems.map((item) => (
              <div key={item.id} className="avatar-slider__item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="avatar-slider__image"
                  loading="lazy"
                />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <button
            className="avatar-slider__arrow"
            onClick={handleNext}
            disabled={startIndex >= items.length - itemsPerPage}
            aria-label="Следующие элементы"
            tabIndex={0}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSlider;