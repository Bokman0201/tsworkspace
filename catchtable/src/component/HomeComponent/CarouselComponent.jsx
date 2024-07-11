import React, { useEffect, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './Carousel.css'; // CSS 파일

const CarouselComponent = () => {
    const autoplayOptions = { delay: 4000 }; // 2초마다 자동 슬라이드
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        [Autoplay(autoplayOptions)]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);

    const onInit = useCallback(() => {
        if (emblaApi) {
            setScrollSnaps(emblaApi.scrollSnapList());
            emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
        }
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('init', onInit);
            return () => emblaApi.off('init', onInit);
        }
    }, [emblaApi, onInit]);


    const scrollTo = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    return (
        <div className="carousel-wrapper">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">
                        <img src="https://dummyimage.com/600x400/53e686/0011ff" alt="Slide 1" />
                        <div className="slide-content">
                            <h1>제목</h1>
                            <span>부제목</span>
                            <p>설명</p>
                        </div>
                    </div>
                    <div className="embla__slide">
                        <img src="https://dummyimage.com/600x400/s72f5/0011ff" alt="Slide 2" />
                        <div className="slide-content">
                            <h1>제목</h1>
                            <span>부제목</span>
                            <p>설명</p>
                        </div>
                    </div>
                    <div className="embla__slide">
                        <img src="https://dummyimage.com/600x400/c9e08b/0011ff" alt="Slide 3" />
                        <div className="slide-content">
                            <h1>제목</h1>
                            <span>부제목</span>
                            <p>설명</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselComponent;
