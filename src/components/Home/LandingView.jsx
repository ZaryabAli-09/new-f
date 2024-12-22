import React, { useEffect, useRef } from "react";
import landingBackground from '../../assets/landing.webp';
import './LandingView.css'; // Ensure you've created this file

const LandingView = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeIn');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return (
    <section ref={ref} className="landing-view flex flex-col items-center justify-center h-screen text-center relative" style={{
      backgroundImage: `url(${landingBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top',
    }}>
      <div className="overlay absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-4 md:p-8 lg:p-12">
        <h1 className="text-4xl md:text-5xl font-bold lg:text-6xl mb-4 text-primary animate__animated animate__zoomIn animate__delay-1s">
          Welcome to Icarus Ships!
        </h1>
        <p className="text-md md:text-xl lg:text-2xl mb-8 text-secondary animate__animated animate__fadeInUp animate__delay-1.5s">
          Your gateway to swift and reliable shipping solutions.
        </p>
        <button
          aria-label="Get Started"
          className="btn-start text-white text-lg md:text-xl px-6 py-2 rounded border-2 border-dark-orange transition-all duration-300" 
          onMouseDown={(e) => {
            e.currentTarget.classList.add('animate__animated', 'animate__wobble');
          }} 
          onAnimationEnd={(e) => {
            e.currentTarget.classList.remove('animate__animated', 'animate__wobble');
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default LandingView;