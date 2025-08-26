import React, { useState, useEffect } from 'react';
import { testimonials, Testimonial } from '@/data/testimonials';
import { Star } from 'lucide-react';

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    // Auto-slide always unless paused by user interaction
    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 1000); // Auto-slide every 1 seconds
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

  // Function to get the testimonials to display (e.g., 3 at a time)
  const getDisplayedTestimonials = () => {
    const displayed = [];
    const total = testimonials.length;
    for (let i = -1; i <= 1; i++) { // Show current, previous, and next
      let index = (currentIndex + i + total) % total;
      displayed.push({ testimonial: testimonials[index], offset: i });
    }
    return displayed;
  };

  return (
    <section className="py-12 bg-dark-800/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Traders Are Saying</h2>
        <div
          className="relative h-80 flex justify-center items-center overflow-hidden" // Added overflow-hidden
          aria-roledescription="carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {getDisplayedTestimonials().map(({ testimonial, offset }, i) => (
            <div
              key={testimonial.name} // Use unique key from testimonial data
              className={`bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 w-full md:w-1/2 lg:w-1/3 flex-shrink-0 transition-all duration-500 ease-in-out hover:translate-y-1 hover:shadow-xl absolute`}
              style={{
                transform: `translateX(calc(-50% + ${offset * 100}px)) scale(${1 - Math.abs(offset) * 0.1})`, // Adjust 100px for overlap
                zIndex: 30 - Math.abs(offset),
                opacity: 1 - Math.abs(offset) * 0.3,
                left: '50%',
                top: '0',
              }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`w-5 h-5 ${starIndex < testimonial.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                  />
                ))}
              </div>
              {/* Avatar - Reverted to initials */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-xl font-bold text-white border-2 border-primary-300 shadow-lg">
                  {testimonial.name.substring(0, 2).toUpperCase()}
                </div>
              </div>
              <p className="text-lg text-gray-300 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
              <p className="font-bold text-white text-xl">{testimonial.name}</p>
              <p className="text-sm text-gray-300">{testimonial.professionOrLocation}</p>
            </div>
          ))}
          <div className="flex justify-center absolute bottom-0 w-full mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                  currentIndex === index ? 'bg-accent-400 scale-125 glow' : 'bg-gray-600'
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
