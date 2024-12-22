import React, { useRef, useEffect, useState } from "react";
import {
  FaDollarSign,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import Card from "../Utils/Card.jsx";
import $GS from "../../styles/constants";

const ClearPricing = () => {
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
        className={`${$GS.textHeading_1} ${
          isVisible ? "animate__animated animate__fadeInDown" : ""
        }`}
      >
        Clear Pricing, No Hidden Fees
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Pricing Card 1 */}
        <Card
          className={`${$GS.cardContainer} ${
            isVisible ? "animate__animated animate__zoomIn" : ""
          }`}
        >
          <FaDollarSign
            className={`${$GS.iconSize} text-blue-600 ${$GS.iconHover} hover:text-blue-400`}
          />
          <h3 className={$GS.textHeading_3}>Transparent Pricing</h3>
          <p className={$GS.textNormal_1}>
            Enjoy straightforward pricing options designed to fit your budget.
          </p>
        </Card>

        {/* Pricing Card 2 */}
        <Card
          className={`${$GS.cardContainer} ${
            isVisible ? "animate__animated animate__zoomIn" : ""
          }`}
        >
          <FaCheckCircle
            className={`${$GS.iconSize} text-green-600 ${$GS.iconHover} hover:text-green-400`}
          />
          <h3 className={$GS.textHeading_3}>No Hidden Fees</h3>
          <p className={$GS.textNormal_1}>
            Rest assured, the price you see is the price you get, with no
            surprises.
          </p>
        </Card>

        {/* Pricing Card 3 */}
        <Card
          className={`${$GS.cardContainer} ${
            isVisible ? "animate__animated animate__zoomIn" : ""
          }`}
        >
          <FaExclamationCircle
            className={`${$GS.iconSize} text-yellow-600 ${$GS.iconHover} hover:text-yellow-400`}
          />
          <h3 className={$GS.textHeading_3}>Complete Clarity</h3>
          <p className={$GS.textNormal_1}>
            Our services are competitively priced with complete transparency.
          </p>
        </Card>
      </div>

      {/* Pricing Information Section */}
      <div className="mt-12">
        <h3
          className={`${$GS.textHeading_2} ${
            isVisible
              ? "animate__animated animate__fadeInDown animate__delay-0-5s"
              : ""
          }`}
        >
          Service Pricing
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* USPS and UPS International in same column */}
          <div className="grid grid-cols-1 gap-6">
            {/* USPS Pricing */}
            <Card
              className={`${
                isVisible
                  ? "animate__animated animate__slideInLeft animate__delay-1s"
                  : ""
              }`}
            >
              <h4 className={$GS.listHeading_1}>USPS</h4>
              <ul className={$GS.listBullet}>
                <li>
                  Express: <strong>Starting from affordable rates</strong>
                </li>
                <li>
                  Priority: <strong>Get competitive pricing options</strong>
                </li>
                <li>
                  Ground Advantage: <strong>Options that fit your needs</strong>
                </li>
              </ul>
            </Card>

            {/* UPS International Pricing */}
            <Card
              className={`${
                isVisible
                  ? "animate__animated animate__slideInLeft animate__delay-1s"
                  : ""
              }`}
            >
              <h4 className={$GS.listHeading_1}>UPS International</h4>
              <ul className={$GS.listBullet}>
                <li>Options available for various needs</li>
                <li>Competitive pricing based on service type</li>
                <li>Choose from expedited to standard delivery</li>
              </ul>
            </Card>
          </div>

          {/* UPS USA Pricing in own column */}
          <Card
            className={`${
              isVisible
                ? "animate__animated animate__slideInRight animate__delay-1s"
                : ""
            }`}
          >
            <h4 className={$GS.listHeading_1}>UPS USA</h4>
            <h5 className={$GS.listHeading_2}>Next Day Services:</h5>
            <ul className={$GS.listBullet}>
              <li>Options available, starting from competitive rates</li>
              <li>Check our flexible pricing options</li>
            </ul>
            <h5 className={$GS.listHeading_2}>2nd Day Services:</h5>
            <ul className={$GS.listBullet}>
              <li>Variety of services tailored to your needs</li>
              <li>Transparent pricing structure</li>
            </ul>
            <h5 className={$GS.listHeading_2}>Manifested Services:</h5>
            <ul className={$GS.listBullet}>
              <li>Packages designed to offer flexibility</li>
              <li>Customize your shipping based on your requirements</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ClearPricing;
