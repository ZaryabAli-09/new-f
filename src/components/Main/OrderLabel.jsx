// src/components/Main/OrderLabel.js
import React, { useState, useEffect } from "react";
import Card from "../Utils/Card"; // Ensure you have a Card component
import $GS from "../../styles/constants"; // Import your styles
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import a loading spinner icon

const OrderLabel = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [submitLoading, setSubmitLoading] = useState(false);
  console.log(user, isAuthenticated);

  const [shippingServices, setShippingServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    service_name: "",
    sender: {
      name: "",
      phone: "",
      company: "",
      street: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
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
      country: "US",
    },
    package: {
      length: "",
      width: "",
      height: "",
      weight: "",
      weight_unit: "LB",
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
    if (!sender.country) errors.push("Sender country is required.");

    // Validate receiver fields
    const receiver = formData.receiver;
    if (!receiver.name) errors.push("Receiver name is required.");
    if (!receiver.phone) errors.push("Receiver phone is required.");
    if (!receiver.company) errors.push("Receiver company is required.");
    if (!receiver.street) errors.push("Receiver street is required.");
    if (!receiver.city) errors.push("Receiver city is required.");
    if (!receiver.state) errors.push("Receiver state is required.");
    if (!receiver.zip) errors.push("Receiver zip is required.");
    if (!receiver.country) errors.push("Receiver country is required.");

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

  async function onSubmitOrderLabel(e) {
    e.preventDefault();

    if (!user || !isAuthenticated) {
      toast.error("Please login first!");
      return;
    }

    const errors = validateForm();

    if (errors.length > 0) {
      toast.error(`Validation Errors:\n${errors.join("\n")}`);
      return;
    }
    setSubmitLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/order-label/create-shipment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData, userId: user._id }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
        setSubmitLoading(false);
        return;
      }

      setSubmitLoading(false);
      toast.success(result.message);
    } catch (error) {
      setSubmitLoading(false);
      toast.error(result.message);
    }

    // console.log(formData);
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/order-label/shipment-services`
        ); // Adjust this based on your API route
        const result = await response.json();

        if (result.status === "success") {
          // Assuming the 'services' object contains the services as key-value pairs
          const services = Object.keys(result.data.services).map(
            (serviceName) => ({
              name: serviceName,
              ...result.data.services[serviceName],
            })
          );

          setShippingServices(services); // Set services in state
        } else {
          console.error("Error fetching services:", result.message);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // Handle dropdown selection
  // Handle selection change and update formData
  const handleSelectChange = (event) => {
    const serviceName = event.target.value;
    setSelectedService(serviceName);

    // Update formData with the selected service name
    setFormData({
      ...formData,
      service_name: serviceName,
    });
  };

  return (
    <div className="px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      {/* Responsive grid for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Combined Package Information and Require Signature Card */}
        <Card className="col-span-1">
          <h2 className={`${$GS.textSmall} mb-4`}>Package Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="content-end">
              <label
                htmlFor="serviceType"
                className="text-normal text-custom-text text-xs"
              >
                Service
              </label>
              <select
                id="serviceType"
                name="serviceType"
                className="border border-custom-border p-2 w-52 bg-transparent text-custom-text text-xsh-10 overflow-y-auto"
                onChange={handleSelectChange}
                value={selectedService}
                style={{
                  maxHeight: "150px", // Ensures max height for scrollable dropdown
                  overflowY: "auto", // Vertical scrolling enabled
                }}
              >
                <option value="" disabled className="text-xs">
                  Select a service
                </option>

                {shippingServices.map((service) => (
                  <option
                    key={service.name}
                    value={service.name}
                    className="text-xs sm:text-sm"
                  >
                    {service.name} - Cost: ${service.manifested_cost}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="weight" className={`${$GS.textSmall}`}>
                Weight
              </label>
              <input
                id="weight"
                name="weight"
                type="number"
                className="border placeholder:text-xs border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="0 lbs"
                value={formData.package.weight}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
          </div>

          <h3 className={`${$GS.textSmall} mt-4 mb-2`}>
            Dimensions (optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="length" className={`${$GS.textSmall}`}>
                Length * (in)
              </label>
              <input
                id="length"
                name="length"
                type="number"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="0 in"
                value={formData.package.length}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
            <div>
              <label htmlFor="width" className={`${$GS.textSmall}`}>
                Width * (in)
              </label>
              <input
                id="width"
                name="width"
                type="number"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="0 in"
                value={formData.package.width}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
            <div>
              <label htmlFor="height" className={`${$GS.textSmall}`}>
                Height * (in)
              </label>
              <input
                id="height"
                name="height"
                type="number"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="0 in"
                value={formData.package.height}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
          </div>

          <label htmlFor="description" className={`${$GS.textSmall} mt-4`}>
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
            placeholder="Enter package information"
            value={formData.package.description}
            onChange={(e) => handleInputChange(e, "package")}
          />

          {/* References Side by Side */}
          <div className="flex justify-between mt-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="reference1" className={`${$GS.textSmall}`}>
                Reference 1 (optional)
              </label>
              <input
                id="reference1"
                name="reference1"
                type="text"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Enter first reference number"
                value={formData.package.reference1}
                onChange={(e) => handleInputChange(e, "package")}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="reference2" className={`${$GS.textSmall}`}>
                Reference 2 (optional)
              </label>
              <input
                id="reference2"
                name="reference2"
                type="text"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
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
          <h2 className={`${$GS.textSmall} mb-4`}>From Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="content-end">
              <label htmlFor="fromAddress" className={`${$GS.textSmall}`}>
                Saved Address
              </label>
              <select
                id="fromAddress"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
              >
                <option>Select a saved address...</option>
              </select>
            </div>

            <div>
              <label htmlFor="fromCountry" className={`${$GS.textSmall}`}>
                Country *
              </label>
              <input
                id="fromCountry"
                type="text"
                name="country"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                defaultValue="United States"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="nameFrom" className={`${$GS.textSmall}`}>
                Name *
              </label>
              <input
                id="senderName"
                name="name"
                type="text"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Sender's Name"
                value={formData.sender.name}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>

            <div>
              <label htmlFor="companyFrom" className={`${$GS.textSmall}`}>
                Company
              </label>
              <input
                id="companyFrom"
                type="text"
                name="company"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Company"
                value={formData.sender.company}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="phoneFrom" className={`${$GS.textSmall}`}>
                Phone
              </label>
              <input
                id="phoneFrom"
                name="phone"
                type="text"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Phone"
                value={formData.sender.phone}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>

            <div>
              <label htmlFor="streetFrom" className={`${$GS.textSmall}`}>
                Street *
              </label>
              <input
                id="streetFrom"
                type="text"
                name="street"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Street"
                value={formData.sender.street}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="street2From" className={`${$GS.textSmall}`}>
                Street 2 (optional)
              </label>
              <input
                id="street2From"
                type="text"
                name="street2"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Street 2"
                value={formData.sender.street2}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>

            <div>
              <label htmlFor="cityFrom" className={`${$GS.textSmall}`}>
                City
              </label>
              <input
                id="cityFrom"
                type="text"
                name="city"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="City"
                value={formData.sender.city}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="stateFrom" className={`${$GS.textSmall}`}>
                State
              </label>
              <input
                id="stateFrom"
                type="text"
                name="state"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="State"
                value={formData.sender.state}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>

            <div>
              <label htmlFor="zipFrom" className={`${$GS.textSmall}`}>
                Zip *
              </label>
              <input
                id="zipFrom"
                type="text"
                name="zip"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Zip"
                value={formData.sender.zip}
                onChange={(e) => handleInputChange(e, "sender")}
              />
            </div>
          </div>
        </Card>

        {/* To Address Card */}
        <Card className="col-span-1">
          <h2 className={`${$GS.textSmall} mb-4`}>To Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="content-end">
              <label htmlFor="toAddress" className={`${$GS.textSmall}`}>
                Saved Address
              </label>
              <select
                id="toAddress"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
              >
                <option>Select a saved address...</option>
              </select>
            </div>

            <div>
              <label htmlFor="toCountry" className={`${$GS.textSmall}`}>
                Country *
              </label>
              <input
                id="toCountry"
                type="text"
                name="country"
                className="placeholder:text-xs border border-custom-border  p-2 w-full bg-transparent text-custom-text"
                defaultValue="United States"
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="nameTo" className={`${$GS.textSmall}`}>
                Name *
              </label>
              <input
                id="receiverName"
                name="name"
                type="text"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Receiver's Name"
                value={formData.receiver.name}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>

            <div>
              <label htmlFor="companyTo" className={`${$GS.textSmall}`}>
                Company
              </label>
              <input
                id="companyTo"
                type="text"
                name="company"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Company"
                value={formData.receiver.company}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="phoneTo" className={`${$GS.textSmall}`}>
                Phone
              </label>
              <input
                id="receiverPhone"
                name="phone"
                type="text"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Receiver's Phone"
                value={formData.receiver.phone}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>

            <div>
              <label htmlFor="streetTo" className={`${$GS.textSmall}`}>
                Street *
              </label>
              <input
                id="streetTo"
                type="text"
                name="street"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Street"
                value={formData.receiver.street}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="street2To" className={`${$GS.textSmall}`}>
                Street 2 (optional)
              </label>
              <input
                id="street2To"
                type="text"
                name="street2"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="Street 2"
                value={formData.receiver.street2}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>

            <div>
              <label htmlFor="cityTo" className={`${$GS.textSmall}`}>
                City
              </label>
              <input
                id="cityTo"
                type="text"
                name="city"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="City"
                value={formData.receiver.city}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="stateTo" className={`${$GS.textSmall}`}>
                State
              </label>
              <input
                id="stateFrom"
                type="text"
                name="state"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
                placeholder="State"
                value={formData.receiver.state}
                onChange={(e) => handleInputChange(e, "receiver")}
              />
            </div>

            <div>
              <label htmlFor="zipTo" className={`${$GS.textSmall}`}>
                Zip *
              </label>
              <input
                id="zipTo"
                type="text"
                name="zip"
                className="placeholder:text-xs border border-custom-border p-2 w-full bg-transparent text-custom-text"
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
          className="disabled:hover:cursor-not-allowed px-6 border border-white py-2 bg-custom-primary text-white rounded-lg"
          disabled={submitLoading}
        >
          {submitLoading ? (
            <AiOutlineLoading3Quarters className="text-xl animate-spin mx-auto" />
          ) : (
            "Submit Order"
          )}
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
