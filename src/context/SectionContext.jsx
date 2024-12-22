// src/context/SectionContext.js
import React, { createContext, useContext, useRef } from "react";

const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const landingViewRef = useRef(null);
  const howItWorksRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const clearPricingRef = useRef(null);
  const faqRef = useRef(null);
  const customerFeedbackRef = useRef(null);
  const readyToShipRef = useRef(null);

  return (
    <SectionContext.Provider
      value={{
        refs: {
          landingViewRef,
          howItWorksRef,
          whyChooseUsRef,
          clearPricingRef,
          faqRef,
          customerFeedbackRef,
          readyToShipRef,
        },
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};

export const useSectionContext = () => {
  return useContext(SectionContext);
};
