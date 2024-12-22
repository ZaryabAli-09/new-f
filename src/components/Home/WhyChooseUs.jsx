// src/components/WhyChooseUs.js
import React, { useEffect, useRef, useState } from "react";
import { FaStar, FaDollarSign, FaPhone } from "react-icons/fa";
import Card from "../Utils/Card.jsx"; // Adjust the import path as needed
import $GS from "../../styles/constants.js";

const WhyChooseUs = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section
      ref={ref}
      className="py-10 md:py-20 px-4 md:px-10 bg-custom-background relative overflow-hidden"
    >
      <h2
        className={`${$GS.textHeading_1}
          ${isVisible ? "animate__animated animate__fadeInDown" : ""}`}
        aria-label="Why Choose Us"
      >
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
        {/* Feature 1: Quality Service */}
        <Card
          className={`flex flex-col items-center text-gray-500 ${
            isVisible ? "animate__animated animate__fadeInUp" : ""
          }`}
        >
          <FaStar className="text-5xl md:text-6xl text-yellow-600 mb-2 md:mb-4 z-10 transition-all duration-300 transform hover:text-yellow-400 hover:scale-110" />
          <h3
            className="text-xl md:text-2xl font-bold mb-2 text-text-normal z-10 hover:text-hover-text"
            aria-label="Unmatched Quality Service"
          >
            Unmatched Quality Service
          </h3>
          <p className="text-center mb-2 text-sm md:text-base z-10">
            Experience exceptional service that prioritizes your needs.
          </p>
          <ul className="text-gray-500 text-xs md:text-sm mt-4 z-10">
            <li className="my-2 flex items-center">
              <span className="text-yellow-600 mr-2">✔️</span>
              <span>24/7 availability to meet your needs.</span>
            </li>
            <li className="my-2 flex items-center">
              <span className="text-yellow-600 mr-2">✔️</span>
              <span>Rigorous quality checks for consistent excellence.</span>
            </li>
            <li className="my-2 flex items-center">
              <span className="text-yellow-600 mr-2">✔️</span>
              <span>98% satisfaction guarantee for your peace of mind.</span>
            </li>
          </ul>
          <blockquote className="mt-4 italic text-gray-400 z-10 p-2 rounded-md bg-transparent border-l-4 border-yellow-600">
            “Their service exceeded my expectations!” - Happy Customer
          </blockquote>
        </Card>

        {/* Feature 2: Affordable Rates */}
        <Card
          className={`flex flex-col items-center text-gray-500 ${
            isVisible
              ? "animate__animated animate__fadeInUp animate__delay-0-5s"
              : ""
          }`}
        >
          <FaDollarSign className="text-5xl md:text-6xl text-green-600 mb-2 md:mb-4 z-10 transition-all duration-300 transform hover:text-green-400 hover:scale-110" />
          <h3
            className="text-xl md:text-2xl font-bold mb-2 text-text-normal z-10 hover:text-hover-text"
            aria-label="Transparent and Affordable Rates"
          >
            Transparent and Affordable Rates
          </h3>
          <p className="text-center mb-2 text-sm md:text-base z-10">
            Discover competitive pricing without hidden fees.
          </p>
          <ul className="text-gray-500 text-xs md:text-sm mt-4 z-10">
            <li className="my-2 flex items-center">
              <span className="text-green-600 mr-2">✔️</span>
              <span>Clear, hassle-free pricing with no hidden charges.</span>
            </li>
            <li className="my-2 flex items-center">
              <span className="text-green-600 mr-2">✔️</span>
              <span>Exclusive discounts for our loyal customers.</span>
            </li>
            <li className="my-2 flex items-center">
              <span className="text-green-600 mr-2">✔️</span>
              <span>Exceptional value that fits your budget.</span>
            </li>
          </ul>
          <blockquote className="mt-4 italic text-gray-400 z-10 p-2 rounded-md bg-transparent border-l-4 border-green-600">
            “Incredible value for the price!” - Satisfied User
          </blockquote>
        </Card>

        {/* Feature 3: 24/7 Support */}
        <Card
          className={`flex flex-col items-center text-gray-500 ${
            isVisible
              ? "animate__animated animate__fadeInUp animate__delay-1s"
              : ""
          }`}
        >
          <FaPhone className="text-5xl md:text-6xl text-blue-600 mb-2 md:mb-4 z-10 transition-all duration-300 transform hover:text-blue-400 hover:scale-110" />
          <h3
            className="text-xl md:text-2xl font-bold mb-2 text-text-normal z-10 hover:text-hover-text"
            aria-label="24/7 Support at Your Fingertips"
          >
            24/7 Support at Your Fingertips
          </h3>
          <p className="text-center mb-2 text-sm md:text-base z-10">
            Our dedicated team is here to help whenever you need us.
          </p>
          <ul className="text-gray-500 text-xs md:text-sm mt-4 z-10">
            <li className="my-2 flex items-center">
              <span className="text-blue-600 mr-2">✔️</span>
              <span>Multilingual support to cater to all customers.</span>
            </li>
            <li className="my-2 flex items-center">
              <span className="text-blue-600 mr-2">✔️</span>
              <span>Swift response times for quick resolutions.</span>
            </li>
            <li className="my-2 flex items-center">
              <span className="text-blue-600 mr-2">✔️</span>
              <span>Experts on standby ready to assist you.</span>
            </li>
          </ul>
          <blockquote className="mt-4 italic text-gray-400 z-10 p-2 rounded-md bg-transparent border-l-4 border-blue-600">
            “They provide unmatched customer service!” - Loyal Client
          </blockquote>
        </Card>
      </div>
    </section>
  );
};

export default WhyChooseUs;
