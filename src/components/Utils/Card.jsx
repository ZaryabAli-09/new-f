// src/components/Card.js
import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-small p-6 md:p-8 border-thin border-custom-border transition-shadow duration-300 
                    bg-card-background group hover:border-hover-border hover:shadow-bright ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
