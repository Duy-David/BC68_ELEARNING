import React from 'react';
import CheckIcon from '../Icon/CheckIcon';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CourseInfo = () => {
  const details = [
    { label: 'Level', value: 'Beginner' },
    { label: 'Duration', value: '15.3 hours' },
    { label: 'Lectures', value: '4 lectures' },
    { label: 'Subject', value: 'Data Modeling' },
    { label: 'Language', value: 'Vietnamese' },
  ];

  const materials = ['Videos', 'Booklets'];

  return (
    <div className="w-full p-8 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Price Section */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-3xl font-bold text-red-600">$49.00</span>
        <span className="text-gray-400 line-through">$76.00</span>
        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-md">35% OFF</span>
      </div>

      {/* Course Details */}
      <div className="space-y-4 mb-6">
        {details.map((detail, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-500">{detail.label}</span>
            <span className="font-semibold text-gray-900">{detail.value}</span>
          </div>
        ))}
      </div>

      {/* Material Includes */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">Material Includes</h4>
        <ul className="space-y-2">
          {materials.map((material, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <CheckIcon color="text-blue-500" />
              {material}
            </li>
          ))}
        </ul>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md flex items-center justify-center hover:bg-blue-700">
        <FontAwesomeIcon icon={faBasketShopping} className="mx-3" />
        Add to cart
      </button>
    </div>
  );
};

export default CourseInfo;