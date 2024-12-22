// src/components/Main/OrderLabel.js
import React from 'react';
import Card from '../Utils/Card'; // Ensure you have a Card component
import $GS from '../../styles/constants'; // Import your styles

const OrderLabel = () => {
  return (
    <div className="px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      {/* Responsive grid for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Combined Package Information and Require Signature Card */}
        <Card className="col-span-1">
          <h2 className={`${$GS.textHeading_2} mb-4`}>Package Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="content-end">
              <label htmlFor="packageType" className={`${$GS.textNormal_1}`}>Type</label>
              <input id="packageType" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="UPS US Next Day Air Manifested (96%+ Success Rate)" />
            </div>
            <div>
              <label htmlFor="packageWeight" className={`${$GS.textNormal_1}`}>Package Weight</label>
              <input id="packageWeight" type="number"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="0 lbs" />
            </div>
          </div>

          <h3 className={`${$GS.textHeading_3} mt-4 mb-2`}>Dimensions (optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="length" className={`${$GS.textNormal_1}`}>Length * (in)</label>
              <input id="length" type="number"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="0 in" />
            </div>
            <div>
              <label htmlFor="width" className={`${$GS.textNormal_1}`}>Width * (in)</label>
              <input id="width" type="number"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="0 in" />
            </div>
            <div>
              <label htmlFor="height" className={`${$GS.textNormal_1}`}>Height * (in)</label>
              <input id="height" type="number"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="0 in" />
            </div>
          </div>

          <label htmlFor="description" className={`${$GS.textNormal_1} mt-4`}>Description (optional)</label>
          <textarea id="description"
                    className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                    placeholder="Enter package information" />

          {/* References Side by Side */}
          <div className="flex justify-between mt-4">
            <div className="w-1/2 pr-2">
              <label htmlFor="reference1" className={`${$GS.textNormal_1}`}>Reference 1 (optional)</label>
              <input id="reference1" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Enter first reference number" />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="reference2" className={`${$GS.textNormal_1}`}>Reference 2 (optional)</label>
              <input id="reference2" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Enter second reference number" />
            </div>
          </div>

          {/* Require Signature Checkboxes */}
          <h3 className={`${$GS.textHeading_3} mt-6 mb-2`}>Require Signature</h3>
          <label className="flex items-center text-custom-text">
            <input type="checkbox" className="mr-2" /> Require a signature on delivery
          </label>
          <label className="flex items-center text-custom-text mt-1">
            <input type="checkbox" className="mr-2" /> Saturday Delivery
          </label>
        </Card>

        {/* From Address Card */}
        <Card className="col-span-1">
          <h2 className={`${$GS.textHeading_2} mb-4`}>From Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="content-end">
              <label htmlFor="fromAddress" className={`${$GS.textNormal_1}`}>Saved Address</label>
              <select id="fromAddress" className="border border-custom-border p-2 w-full bg-transparent text-custom-text">
                <option>Select a saved address...</option>
              </select>
            </div>

            <div>
              <label htmlFor="fromCountry" className={`${$GS.textNormal_1}`}>Country *</label>
              <input id="fromCountry" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     defaultValue="United States" readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="nameFrom" className={`${$GS.textNormal_1}`}>Name *</label>
              <input id="nameFrom" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Name" />
            </div>

            <div>
              <label htmlFor="companyFrom" className={`${$GS.textNormal_1}`}>Company / Reference Number (optional)</label>
              <input id="companyFrom" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Company" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="phoneFrom" className={`${$GS.textNormal_1}`}>Phone</label>
              <input id="phoneFrom" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Phone" />
            </div>

            <div>
              <label htmlFor="streetFrom" className={`${$GS.textNormal_1}`}>Street *</label>
              <input id="streetFrom" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Street" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="street2From" className={`${$GS.textNormal_1}`}>Street 2 (optional)</label>
              <input id="street2From" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Street 2" />
            </div>

            <div>
              <label htmlFor="cityFrom" className={`${$GS.textNormal_1}`}>City</label>
              <input id="cityFrom" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="City" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="stateFrom" className={`${$GS.textNormal_1}`}>State</label>
              <select id="stateFrom" className="border border-custom-border p-2 w-full bg-transparent text-custom-text">
                <option>Select state...</option>
              </select>
            </div>

            <div>
              <label htmlFor="zipFrom" className={`${$GS.textNormal_1}`}>Zip *</label>
              <input id="zipFrom" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Zip" />
            </div>
          </div>
        </Card>

        {/* To Address Card */}
        <Card className="col-span-1">
          <h2 className={`${$GS.textHeading_2} mb-4`}>To Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="content-end">
              <label htmlFor="toAddress" className={`${$GS.textNormal_1}`}>Saved Address</label>
              <select id="toAddress" className="border border-custom-border p-2 w-full bg-transparent text-custom-text">
                <option>Select a saved address...</option>
              </select>
            </div>

            <div>
              <label htmlFor="toCountry" className={`${$GS.textNormal_1}`}>Country *</label>
              <input id="toCountry" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     defaultValue="United States" readOnly />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="nameTo" className={`${$GS.textNormal_1}`}>Name *</label>
              <input id="nameTo" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Name" />
            </div>

            <div>
              <label htmlFor="companyTo" className={`${$GS.textNormal_1}`}>Company / Reference Number (optional)</label>
              <input id="companyTo" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Company" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="phoneTo" className={`${$GS.textNormal_1}`}>Phone</label>
              <input id="phoneTo" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Phone" />
            </div>

            <div>
              <label htmlFor="streetTo" className={`${$GS.textNormal_1}`}>Street *</label>
              <input id="streetTo" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Street" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="street2To" className={`${$GS.textNormal_1}`}>Street 2 (optional)</label>
              <input id="street2To" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Street 2" />
            </div>

            <div>
              <label htmlFor="cityTo" className={`${$GS.textNormal_1}`}>City</label>
              <input id="cityTo" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="City" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="content-end">
              <label htmlFor="stateTo" className={`${$GS.textNormal_1}`}>State</label>
              <select id="stateTo" className="border border-custom-border p-2 w-full bg-transparent text-custom-text">
                <option>Select state...</option>
              </select>
            </div>

            <div>
              <label htmlFor="zipTo" className={`${$GS.textNormal_1}`}>Zip *</label>
              <input id="zipTo" type="text"
                     className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
                     placeholder="Zip" />
            </div>
          </div>
        </Card>
      </div>

      {/* Price Section */}
      <div className="flex justify-between items-center mt-8">
        <p className={`${$GS.textHeading_2} m-8`}>Price: $12.00</p>
        <div className="flex justify-center">
          <Card>
            <span className={`${$GS.textHeading_2} cursor-pointer`} onClick={() => {}}>Order Label</span>
          </Card>
        </div>
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Icarus Ships. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default OrderLabel;