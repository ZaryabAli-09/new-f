import React, { useState, useRef, useEffect } from "react";
import Card from "../Utils/Card.jsx"; // Adjust the import path as per your folder structure
import $GS from "../../styles/constants";

const FAQs = () => {
  const [faqs] = useState([
    {
      question: "What services do you offer?",
      answer:
        "We offer a variety of services including shipping, logistics management, and custom solutions to meet your needs.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support through our contact page, or by calling our support number available 24/7.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Yes! We offer a 30-day money-back guarantee on all of our services if you're not satisfied.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Absolutely! We provide international shipping options to many countries worldwide.",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(null);
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

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`mb-4 transition cursor-pointer duration-300 ${
              activeIndex === index ? "text-hover-text" : ""
            }`}
          >
            <div onClick={() => toggleFAQ(index)}>
              <Card>
                <div className="w-full text-left transition-all duration-300">
                  <h3
                    className={`text-lg md:text-xl font-semibold text-text-normal group-hover:text-hover-text`}
                  >
                    {faq.question}
                  </h3>
                  <span
                    className={`text-gray-500 ${
                      activeIndex === index ? "hidden" : "block"
                    }`}
                  >
                    +
                  </span>
                  <span
                    className={`text-gray-500 ${
                      activeIndex === index ? "block" : "hidden"
                    }`}
                  >
                    –
                  </span>
                </div>
              </Card>
            </div>
            {activeIndex === index && (
              <Card className="border border-hover-border shadow-bright mt-2">
                <p className="text-hover-text text-sm md:text-base text-left">
                  {faq.answer}
                </p>
              </Card>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
