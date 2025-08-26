import React, { useState, useEffect } from 'react';
import { testimonials, Testimonial } from '@/data/testimonials';

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 3000); // Auto-slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-12 bg-dark-800/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Traders Are Saying</h2>
        <div
          className="relative"
          aria-roledescription="carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <div className="flex flex-col md:flex-row justify-center md:space-x-4 overflow-hidden">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 w-full md:w-1/2 lg:w-1/3 flex-shrink-0 mb-4 md:mb-0 transition-all duration-500 ease-in-out">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-white text-xl">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.professionOrLocation}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                  Math.floor(currentIndex / 1) === Math.floor(index / 1) ? 'bg-accent-400 scale-125' : 'bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
