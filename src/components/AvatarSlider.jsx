import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import '../scss/forComponents/AvatarSlider.scss';

const AvatarSlider = ({ items = [], title, itemsPerPage = 4 }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(items.length - itemsPerPage, prev + 1));
  };

  const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);

  if (!items.length) {
    return null;
  }

  return (
    <div className="avatar-slider container">
      <div className="avatar-slider__wrapper">
        <h2>{title}</h2>
        <div className="second_wrapper">
          <button
            className="avatar-slider__arrow"
            onClick={handlePrev}
            disabled={startIndex === 0}
            aria-label="Предыдущие элементы"
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
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSlider;
