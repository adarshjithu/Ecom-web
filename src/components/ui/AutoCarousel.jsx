import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

const AutoCarousel = ({ 
  items, 
  renderItem, 
  slidesPerView = { 
    mobile: 2, 
    tablet: 3, 
    desktop: 5 
  },
  spaceBetween = 16,
  autoplayDelay = 500,
  loop = true,
  freeMode = true,
  className = ""
}) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, []);

  const handleTouchStart = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleTouchEnd = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      // Resume autoplay after a short delay
      setTimeout(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.autoplay.start();
        }
      }, 500);
    }
  };

  const handleSlideChange = () => {
    // Stop autoplay when user manually changes slides
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
      // Resume after delay
      setTimeout(() => {
        if (swiperRef.current && swiperRef.current.swiper) {
          swiperRef.current.swiper.autoplay.start();
        }
      }, 500);
    }
  };

  // Don't render if no items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, FreeMode]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView.mobile}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          stopOnLastSlide: false,
        }}
        freeMode={freeMode ? {
          enabled: true,
          momentum: true,
          momentumRatio: 0.5,
          momentumVelocityRatio: 0.5,
          minimumVelocity: 0.02,
          sticky: false,
        } : false}
        grabCursor={freeMode}
        allowTouchMove={true}
        touchRatio={1}
        touchAngle={45}
        resistance={true}
        resistanceRatio={0.85}
        loop={loop && items.length > slidesPerView.desktop}
        breakpoints={{
          640: {
            slidesPerView: slidesPerView.tablet,
          },
          1024: {
            slidesPerView: slidesPerView.desktop,
          },
          1336: {
            slidesPerView: slidesPerView.xxl || slidesPerView.desktop,
          },
        }}
        className="w-full"
        style={{ paddingBottom: '20px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onSlideChange={handleSlideChange}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AutoCarousel; 