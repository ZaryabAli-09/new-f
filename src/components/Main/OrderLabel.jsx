// src/components/Main/OrderLabel.js
import React, { useState } from "react";
import Card from "../Utils/Card"; // Ensure you have a Card component
import $GS from "../../styles/constants"; // Import your styles
import { toast } from "react-hot-toast";

const OrderLabel = () => {
  const [formData, setFormData] = useState({
    sender: {
      name: "",
      phone: "",
      company: "",
      street: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
    },
    receiver: {
      name: "",
      phone: "",
      company: "",
      street: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
    },
    package: {
      serviceType: "UPS",
      weight: "",
      length: "",
      width: "",
      height: "",
      description: "",
      reference1: "",
      reference2: "",
      requireSignature: false,
      saturdayDelivery: false,
    },
  });

  const validateForm = () => {
    const errors = [];

    // Validate sender fields
    const sender = formData.sender;
    if (!sender.name) errors.push("Sender name is required.");
    if (!sender.phone) errors.push("Sender phone is required.");
    if (!sender.company) errors.push("Sender company is required.");
    if (!sender.street) errors.push("Sender street is required.");
    if (!sender.city) errors.push("Sender city is required.");
    if (!sender.state) errors.push("Sender state is required.");
    if (!sender.zip) errors.push("Sender zip is required.");

    // Validate receiver fields
    const receiver = formData.receiver;
    if (!receiver.name) errors.push("Receiver name is required.");
    if (!receiver.phone) errors.push("Receiver phone is required.");
    if (!receiver.company) errors.push("Receiver company is required.");
    if (!receiver.street) errors.push("Receiver street is required.");
    if (!receiver.city) errors.push("Receiver city is required.");
    if (!receiver.state) errors.push("Receiver state is required.");
    if (!receiver.zip) errors.push("Receiver zip is required.");

    // Validate package fields
    const pkg = formData.package;
    if (!pkg.weight) errors.push("Package weight is required.");
    if (!pkg.length) errors.push("Package length is required.");
    if (!pkg.width) errors.push("Package width is required.");
    if (!pkg.height) errors.push("Package height is required.");
    if (!pkg.description) errors.push("Package description is required.");

    // Validate numeric fields for positive numbers
    ["weight", "length", "width", "height"].forEach((key) => {
      if (pkg[key] && isNaN(pkg[key])) {
        errors.push(`Package ${key} must be a valid number.`);
      } else if (pkg[key] && Number(pkg[key]) <= 0) {
        errors.push(`Package ${key} must be greater than 0.`);
      }
    });

    return errors;
  };

  // Handle changes to the form inputs
  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  function onSubmitOrderLabel(e) {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      toast.error(`Validation Errors:\n${errors.join("\n")}`);
      return;
    }

    console.log(formData);
  }

  return (
    <div className="px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      {/* Responsive grid for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Combined Package Information and Require Signature Card */}
        <Card className="col-span-1">
          <h2 className={`${$GS.textHeading_2} mb-4`}>Package Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="content-end">
              <label htmlFor="serviceType" className={`${$GS.textNormal_1}`}>
                Service Type
              </label>
              <input
                id="serviceType"
                name="serviceType"
                type="text"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="UPS US Next Day Air Manifested (96%+ Success Rate)"
                onChange={(e) => handleInputChange(e, "package")}
                value={formData.package.serviceType}
              />
            </div>
            <div>
              <label htmlFor="weight" className={`${$GS.textNormal_1}`}>
                Weight
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="0 lbs"
                value={formData.package.weight}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
          </div>

          <h3 className={`${$GS.textNormal_1} mt-4 mb-2`}>
            Dimensions (optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="length" className={`${$GS.textNormal_1}`}>
                Length * (in)
              </label>
              <input
                id="length"
                name="length"
                type="number"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="0 in"
                value={formData.package.length}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
            <div>
              <label htmlFor="width" className={`${$GS.textNormal_1}`}>
                Width * (in)
              </label>
              <input
                id="width"
                name="width"
                type="number"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="0 in"
                value={formData.package.width}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
            <div>
              <label htmlFor="height" className={`${$GS.textNormal_1}`}>
                Height * (in)
              </label>
              <input
                id="height"
                name="height"
                type="number"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="0 in"
                value={formData.package.height}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
          </div>

          <label htmlFor="description" className={`${$GS.textNormal_1} mt-4`}>
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
            placeholder="Enter package information"
            value={formData.package.description}
            onChange={(e) => handleInputChange(e, "package")}
          />

          {/* References Side by Side */}
          <div className="flex justify-between mt-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="reference1" className={`${$GS.textNormal_1}`}>
                Reference 1 (optional)
              </label>
              <input
                id="reference1"
                name="reference1"
                type="text"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Enter first reference number"
                value={formData.package.reference1}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="reference2" className={`${$GS.textNormal_1}`}>
                Reference 2 (optional)
              </label>
              <input
                id="reference2"
                name="reference2"
                type="text"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Enter second reference number"
                value={formData.package.reference2}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
          </div>

          {/* Require Signature Checkboxes */}
          <h3 className={`${$GS.textHeading_3} mt-6 mb-2`}>
            Require Signature
          </h3>
          <label className="flex items-center text-custom-text">
            <input
              type="checkbox"
              name="requireSignature"
              checked={formData.package.requireSignature}
              onChange={(e) => handleInputChange(e, "package")}
              className="mr-2"
            />
            Require a signature on delivery
          </label>
          <label className="flex items-center text-custom-text mt-1">
            <input
              type="checkbox"
              name="saturdayDelivery"
              checked={formData.package.saturdayDelivery}
              onChange={(e) => handleInputChange(e, "package")}
              className="mr-2"
            />
            Saturday Delivery
          </label>
        </Card>

        {/* From Address Card */}
        <Card className="col-span-1">
          <h2 className={`${$GS.textHeading_2} mb-4`}>From Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="content-end">
              <label htmlFor="fromAddress" className={`${$GS.textNormal_1}`}>
                Saved Address
              </label>
              <select
                id="fromAddress"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
              >
                <option>Select a saved address...</option>
              </select>
            </div>

            <div>
              <label htmlFor="fromCountry" className={`${$GS.textNormal_1}`}>
                Country *
              </label>
              <input
                id="fromCountry"
                type="text"
                name="country"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                defaultValue="United States"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="nameFrom" className={`${$GS.textNormal_1}`}>
                Name *
              </label>
              <input
                id="senderName"
                name="name"
                type="text"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Sender's Name"
                value={formData.sender.name}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>

            <div>
              <label htmlFor="companyFrom" className={`${$GS.textNormal_1}`}>
                Company / Reference Number (optional)
              </label>
              <input
                id="companyFrom"
                type="text"
                name="company"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Company"
                value={formData.sender.company}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="phoneFrom" className={`${$GS.textNormal_1}`}>
                Phone
              </label>
              <input
                id="phoneFrom"
                name="phone"
                type="text"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Phone"
                value={formData.sender.phone}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>

            <div>
              <label htmlFor="streetFrom" className={`${$GS.textNormal_1}`}>
                Street *
              </label>
              <input
                id="streetFrom"
                type="text"
                name="street"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Street"
                value={formData.sender.street}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="street2From" className={`${$GS.textNormal_1}`}>
                Street 2 (optional)
              </label>
              <input
                id="street2From"
                type="text"
                name="street2"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Street 2"
                value={formData.sender.street2}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>

            <div>
              <label htmlFor="cityFrom" className={`${$GS.textNormal_1}`}>
                City
              </label>
              <input
                id="cityFrom"
                type="text"
                name="city"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="City"
                value={formData.sender.city}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="stateFrom" className={`${$GS.textNormal_1}`}>
                State
              </label>
              <input
                id="stateFrom"
                type="text"
                name="state"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="State"
                value={formData.sender.state}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>

            <div>
              <label htmlFor="zipFrom" className={`${$GS.textNormal_1}`}>
                Zip *
              </label>
              <input
                id="zipFrom"
                type="text"
                name="zip"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Zip"
                value={formData.sender.zip}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>
          </div>
        </Card>

        {/* To Address Card */}
        <Card className="col-span-1">
          <h2 className={`${$GS.textHeading_2} mb-4`}>To Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="content-end">
              <label htmlFor="toAddress" className={`${$GS.textNormal_1}`}>
                Saved Address
              </label>
              <select
                id="toAddress"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
              >
                <option>Select a saved address...</option>
              </select>
            </div>

            <div>
              <label htmlFor="toCountry" className={`${$GS.textNormal_1}`}>
                Country *
              </label>
              <input
                id="toCountry"
                type="text"
                name="country"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                defaultValue="United States"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="nameTo" className={`${$GS.textNormal_1}`}>
                Name *
              </label>
              <input
                id="receiverName"
                name="name"
                type="text"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Receiver's Name"
                value={formData.receiver.name}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>

            <div>
              <label htmlFor="companyTo" className={`${$GS.textNormal_1}`}>
                Company / Reference Number (optional)
              </label>
              <input
                id="companyTo"
                type="text"
                name="company"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Company"
                value={formData.receiver.company}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="phoneTo" className={`${$GS.textNormal_1}`}>
                Phone
              </label>
              <input
                id="receiverPhone"
                name="phone"
                type="text"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Receiver's Phone"
                value={formData.receiver.phone}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>

            <div>
              <label htmlFor="streetTo" className={`${$GS.textNormal_1}`}>
                Street *
              </label>
              <input
                id="streetTo"
                type="text"
                name="street"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Street"
                value={formData.receiver.street}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="street2To" className={`${$GS.textNormal_1}`}>
                Street 2 (optional)
              </label>
              <input
                id="street2To"
                type="text"
                name="street"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Street 2"
                value={formData.receiver.street2}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>

            <div>
              <label htmlFor="cityTo" className={`${$GS.textNormal_1}`}>
                City
              </label>
              <input
                id="cityTo"
                type="text"
                name="city"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="City"
                value={formData.receiver.city}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="stateTo" className={`${$GS.textNormal_1}`}>
                State
              </label>
              <input
                id="stateFrom"
                type="text"
                name="state"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="State"
                value={formData.sender.state}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>

            <div>
              <label htmlFor="zipTo" className={`${$GS.textNormal_1}`}>
                Zip *
              </label>
              <input
                id="zipTo"
                type="text"
                name="zip"
                className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Zip"
                value={formData.receiver.zip}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onSubmitOrderLabel}
          className="px-6 border border-white py-2 bg-custom-primary text-white rounded-lg"
        >
          Submit Order
        </button>
      </div>

      {/* Price Section */}
      <div className="flex justify-between items-center mt-8">
        <p className={`${$GS.textHeading_2} m-8`}>Price: $12.00</p>
        <div className="flex justify-center">
          <Card>
            <span
              className={`${$GS.textHeading_2} cursor-pointer`}
              onClick={() => {}}
            >
              Order Label
            </span>
          </Card>
        </div>
        <div className="text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Icarus Ships. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderLabel;
