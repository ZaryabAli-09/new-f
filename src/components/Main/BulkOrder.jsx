// src/components/Main/BulkOrder.js
import React, { useState } from 'react';
import Card from '../Utils/Card'; // Ensure you have a Card component
import $GS from '../../styles/constants'; // Import your styles
import { FaUpload } from 'react-icons/fa'; // Import a suitable icon

import './BulkOrder.css'; // Import custom CSS for styling.

const BulkOrder = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [labelType, setLabelType] = useState('');

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
    // Implement logic to read and validate the CSV file
  };

  return (
    <div className="px-4 md:px-10 py-10 md:py-20 bg-custom-background">
      {/* Label Type Select */}
      <div className="mb-6">
        <label htmlFor="labelType" className={`${$GS.textNormal_1} mb-2`}>Label Type</label>
        <select
          id="labelType"
          value={labelType}
          onChange={(e) => setLabelType(e.target.value)}
          className="border border-custom-border p-2 w-full bg-transparent text-custom-text"
        >
          <option value="">Select Label Type...</option>
          <option value="type1">Label Type 1</option>
          <option value="type2">Label Type 2</option>
          <option value="type3">Label Type 3</option>
        </select>
      </div>

      {/* CSV Upload Section */}
      <Card className="mb-6 p-6">
        <h2 className={`${$GS.textHeading_2} mb-4`}>Upload CSV Template</h2>
        <div
          className="border-2 border-dashed border-blue-400 p-6 text-center rounded-md cursor-pointer"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length) {
              setCsvFile(files[0]);
            }
          }}
          onClick={() => document.getElementById('file-upload').click()} // Trigger file input on click
        >
          <FaUpload className="mx-auto mb-2 text-blue-600" size={40} />
          <p className="text-blue-600">Drag & drop your CSV file here</p>
          <span className="inline-block mt-2 text-blue-600">
            or <span className="underline">choose a file</span>
          </span>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {csvFile && (
          <p className={`${$GS.textNormal_1} mt-2`}>Uploaded File: {csvFile.name}</p>
        )}
      </Card>

      {/* Data Table Section */}
      <Card>
        <h2 className={`${$GS.textHeading_2} mb-4`}>Uploaded Data</h2>
        <div className="overflow-x-auto max-h-96">
          <table className="min-w-full border-separate border-spacing-0 border-custom-border">
            <thead className="bg-custom-background text-custom-text sticky top-0 z-30 border border-custom-border">
              <tr>
                <th colSpan="6" className="border border-custom-border p-2 text-left">From</th>
                <th colSpan="6" className="border border-custom-border p-2 text-left">To</th>
                <th colSpan="6" className="border border-custom-border p-2 text-left">Package Info</th>
              </tr>
              <tr className="bg-custom-background text-custom-text">
                {/* From Section */}
                <th className="border border-custom-border p-2">Name *</th>
                <th className="border border-custom-border p-2">Company</th>
                <th className="border border-custom-border p-2">Phone</th>
                <th className="border border-custom-border p-2">Street *</th>
                <th className="border border-custom-border p-2">Street 2</th>
                <th className="border border-custom-border p-2">City</th>
                {/* To Section */}
                <th className="border border-custom-border p-2">Name *</th>
                <th className="border border-custom-border p-2">Company</th>
                <th className="border border-custom-border p-2">Phone</th>
                <th className="border border-custom-border p-2">Street *</th>
                <th className="border border-custom-border p-2">Street 2</th>
                <th className="border border-custom-border p-2">City</th>
                {/* Package Info Section */}
                <th className="border border-custom-border p-2">Type *</th>
                <th className="border border-custom-border p-2">Weight *</th>
                <th className="border border-custom-border p-2">Length</th>
                <th className="border border-custom-border p-2">Width</th>
                <th className="border border-custom-border p-2">Height</th>
                <th className="border border-custom-border p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row for structure; real data would come from your CSV parser */}
              <tr className="bg-custom-background text-custom-text">
                {/* From Section */}
                <td className="border border-custom-border p-2">John Doe</td>
                <td className="border border-custom-border p-2">Acme Corp</td>
                <td className="border border-custom-border p-2">123-456-7890</td>
                <td className="border border-custom-border p-2">123 Elm Street</td>
                <td className="border border-custom-border p-2">Apt 4B</td>
                <td className="border border-custom-border p-2">Springfield</td>
                {/* To Section */}
                <td className="border border-custom-border p-2">Jane Smith</td>
                <td className="border border-custom-border p-2">XYZ Ltd.</td>
                <td className="border border-custom-border p-2">987-654-3210</td>
                <td className="border border-custom-border p-2">456 Oak Avenue</td>
                <td className="border border-custom-border p-2">Suite 200</td>
                <td className="border border-custom-border p-2">Metropolis</td>
                {/* Package Info Section */}
                <td className="border border-custom-border p-2">UPS US Next Day</td>
                <td className="border border-custom-border p-2">2 lbs</td>
                <td className="border border-custom-border p-2">10 in</td>
                <td className="border border-custom-border p-2">5 in</td>
                <td className="border border-custom-border p-2">8 in</td>
                <td className="border border-custom-border p-2">Fragile, handle with care</td>
              </tr>
              {/* Repeat rows as needed */}
              <tr className="bg-custom-background text-custom-text">
                <td className="border border-custom-border p-2">Alice Johnson</td>
                <td className="border border-custom-border p-2">Beta LLC</td>
                <td className="border border-custom-border p-2">101-202-3030</td>
                <td className="border border-custom-border p-2">789 Pine Lane</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Gotham</td>
                <td className="border border-custom-border p-2">Bob Brown</td>
                <td className="border border-custom-border p-2">Delta Inc.</td>
                <td className="border border-custom-border p-2">202-303-4040</td>
                <td className="border border-custom-border p-2">101 Spruce St</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Star City</td>
                <td className="border border-custom-border p-2">Type B</td>
                <td className="border border-custom-border p-2">1 lbs</td>
                <td className="border border-custom-border p-2">8 in</td>
                <td className="border border-custom-border p-2">4 in</td>
                <td className="border border-custom-border p-2">3 in</td>
                <td className="border border-custom-border p-2">Standard delivery</td>
              </tr>
              {/* Add more rows to test scroll behavior */}
              
              <tr className="bg-custom-background text-custom-text">
                <td className="border border-custom-border p-2">Alice Johnson</td>
                <td className="border border-custom-border p-2">Beta LLC</td>
                <td className="border border-custom-border p-2">101-202-3030</td>
                <td className="border border-custom-border p-2">789 Pine Lane</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Gotham</td>
                <td className="border border-custom-border p-2">Bob Brown</td>
                <td className="border border-custom-border p-2">Delta Inc.</td>
                <td className="border border-custom-border p-2">202-303-4040</td>
                <td className="border border-custom-border p-2">101 Spruce St</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Star City</td>
                <td className="border border-custom-border p-2">Type B</td>
                <td className="border border-custom-border p-2">1 lbs</td>
                <td className="border border-custom-border p-2">8 in</td>
                <td className="border border-custom-border p-2">4 in</td>
                <td className="border border-custom-border p-2">3 in</td>
                <td className="border border-custom-border p-2">Standard delivery</td>
              </tr>
              
              <tr className="bg-custom-background text-custom-text">
                <td className="border border-custom-border p-2">Alice Johnson</td>
                <td className="border border-custom-border p-2">Beta LLC</td>
                <td className="border border-custom-border p-2">101-202-3030</td>
                <td className="border border-custom-border p-2">789 Pine Lane</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Gotham</td>
                <td className="border border-custom-border p-2">Bob Brown</td>
                <td className="border border-custom-border p-2">Delta Inc.</td>
                <td className="border border-custom-border p-2">202-303-4040</td>
                <td className="border border-custom-border p-2">101 Spruce St</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Star City</td>
                <td className="border border-custom-border p-2">Type B</td>
                <td className="border border-custom-border p-2">1 lbs</td>
                <td className="border border-custom-border p-2">8 in</td>
                <td className="border border-custom-border p-2">4 in</td>
                <td className="border border-custom-border p-2">3 in</td>
                <td className="border border-custom-border p-2">Standard delivery</td>
              </tr>
              
              <tr className="bg-custom-background text-custom-text">
                <td className="border border-custom-border p-2">Alice Johnson</td>
                <td className="border border-custom-border p-2">Beta LLC</td>
                <td className="border border-custom-border p-2">101-202-3030</td>
                <td className="border border-custom-border p-2">789 Pine Lane</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Gotham</td>
                <td className="border border-custom-border p-2">Bob Brown</td>
                <td className="border border-custom-border p-2">Delta Inc.</td>
                <td className="border border-custom-border p-2">202-303-4040</td>
                <td className="border border-custom-border p-2">101 Spruce St</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Star City</td>
                <td className="border border-custom-border p-2">Type B</td>
                <td className="border border-custom-border p-2">1 lbs</td>
                <td className="border border-custom-border p-2">8 in</td>
                <td className="border border-custom-border p-2">4 in</td>
                <td className="border border-custom-border p-2">3 in</td>
                <td className="border border-custom-border p-2">Standard delivery</td>
              </tr>
              
              <tr className="bg-custom-background text-custom-text">
                <td className="border border-custom-border p-2">Alice Johnson</td>
                <td className="border border-custom-border p-2">Beta LLC</td>
                <td className="border border-custom-border p-2">101-202-3030</td>
                <td className="border border-custom-border p-2">789 Pine Lane</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Gotham</td>
                <td className="border border-custom-border p-2">Bob Brown</td>
                <td className="border border-custom-border p-2">Delta Inc.</td>
                <td className="border border-custom-border p-2">202-303-4040</td>
                <td className="border border-custom-border p-2">101 Spruce St</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Star City</td>
                <td className="border border-custom-border p-2">Type B</td>
                <td className="border border-custom-border p-2">1 lbs</td>
                <td className="border border-custom-border p-2">8 in</td>
                <td className="border border-custom-border p-2">4 in</td>
                <td className="border border-custom-border p-2">3 in</td>
                <td className="border border-custom-border p-2">Standard delivery</td>
              </tr>
              
              <tr className="bg-custom-background text-custom-text">
                <td className="border border-custom-border p-2">Alice Johnson</td>
                <td className="border border-custom-border p-2">Beta LLC</td>
                <td className="border border-custom-border p-2">101-202-3030</td>
                <td className="border border-custom-border p-2">789 Pine Lane</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Gotham</td>
                <td className="border border-custom-border p-2">Bob Brown</td>
                <td className="border border-custom-border p-2">Delta Inc.</td>
                <td className="border border-custom-border p-2">202-303-4040</td>
                <td className="border border-custom-border p-2">101 Spruce St</td>
                <td className="border border-custom-border p-2">N/A</td>
                <td className="border border-custom-border p-2">Star City</td>
                <td className="border border-custom-border p-2">Type B</td>
                <td className="border border-custom-border p-2">1 lbs</td>
                <td className="border border-custom-border p-2">8 in</td>
                <td className="border border-custom-border p-2">4 in</td>
                <td className="border border-custom-border p-2">3 in</td>
                <td className="border border-custom-border p-2">Standard delivery</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Price Section */}
      <div className="flex justify-between items-center mt-8">
        <p className={`${$GS.textHeading_2} m-8`}>Total Price: $24.00</p>
        <div className="flex justify-center">
          <Card>
            <span className={`${$GS.textHeading_2} cursor-pointer`} onClick={() => {}}>Submit Bulk Order</span>
          </Card>
        </div>
        <div className="text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Icarus Ships. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;