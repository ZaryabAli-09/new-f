import React from "react";
import { FaStar } from "react-icons/fa";
import customer_man1 from "../../assets/customer_man1.jpg";
import customer_man2 from "../../assets/customer_man2.jpg";
import customer_woman1 from "../../assets/customer_woman1.jpg";
import Card from "../Utils/Card.jsx"; // Ensure this path matches your directory structure
import $GS from "../../styles/constants";

// Sample Customer Feedback Data with images and ratings
const feedbackData = [
  {
    name: "Maya Horton",
    designation: "Customer",
    feedback:
      "I run a small business that requires me to ship my products out daily, and even with variable sizes and weights of my parcel, a 120lb label costs the same as a 20lb label, which is nice. It has literally saved me so much money.",
    image: customer_man1,
    rating: 4.5,
  },
  {
    name: "Nathan Melon",
    designation: "Customer",
    feedback:
      "I can't believe how quick the service is. It is fully automated, and when I have important items that need to be shipped quickly, I always use the overnight labels that can get them shipped ASAP.",
    image: customer_woman1,
    rating: 5,
  },
  {
    name: "Jackson Martin",
    designation: "Customer",
    feedback:
      "The user interface is so user-friendly! I was able to set up my shipping preferences in minutes. Plus, the customer service is outstanding!",
    image: customer_man2,
    rating: 4,
  },
];

const CustomerFeedback = () => {
  return (
    <section className="py-10 md:py-20 px-4 bg-custom-background text-text-emphasizing">
      <h2 className={`${$GS.textHeading_1} mb-4 md:mb-8`}>
        What Our Customers Say
      </h2>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackData.map((feedback, index) => (
            <Card key={index}>
              <div className="flex items-center mb-4">
                <img
                  src={feedback.image}
                  alt={feedback.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3
                    className={`text-lg md:text-xl font-semibold text-text-normal group-hover:text-hover-text`}
                  >
                    {feedback.name}
                  </h3>
                  <h4 className="text-sm md:text-md text-text-normal group-hover:text-hover-text">
                    {feedback.designation}
                  </h4>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(5)].map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    className={
                      starIndex < feedback.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-sm md:text-base text-text-normal group-hover:text-hover-text">
                {feedback.feedback}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
