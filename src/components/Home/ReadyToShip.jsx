// src/components/ReadyToShip.js
import React, { useEffect, useRef, useState } from "react";
import { FaShippingFast, FaBox } from "react-icons/fa";
import "animate.css";
import Card from "../Utils/Card.jsx"; // Make sure the path to Card is correct
import $GS from "../../styles/constants";

const ReadyToShip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-10 bg-custom-background relative overflow-hidden"
    >
      <div
        className={`container mx-auto text-center animate__delay-1s ${
          isVisible ? "animate__animated animate__fadeInUp" : "opacity-0"
        }`}
      >
        <h2 className={`${$GS.textHeading_1} mb-4`}>
          Ready to Ship Your Goods?
        </h2>
        <p className={`${$GS.textHeading_3} mb-8 text-text-normal`}>
          Experience fast, reliable shipping at unbeatable prices. It's time to
          get your products moving!
        </p>
        <div className="flex justify-center mb-10">
          {[
            { icon: <FaShippingFast />, text: "Fast Delivery" },
            { icon: <FaBox />, text: "Multiple Options" },
          ].map((item, index) => (
            <Card key={index} className="mx-4">
              {" "}
              {/* Pass in the additional style*/}
              <div className="flex flex-col items-center">
                <span
                  className={`text-6xl text-custom-border mb-2 group-hover:text-hover-text`}
                >
                  {item.icon}
                </span>
                <p
                  className={`text-lg text-text-normal group-hover:text-hover-text`}
                >
                  {item.text}
                </p>
              </div>
            </Card>
          ))}
        </div>
        <a
          href="#"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded shadow-lg transition ease-in-out duration-200"
          aria-label="Start Shipping Today"
        >
          Start Shipping Today
        </a>
      </div>
    </section>
  );
};

export default ReadyToShip;
