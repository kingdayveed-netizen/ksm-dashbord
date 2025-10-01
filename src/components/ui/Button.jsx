import React from 'react';

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`w-full flex justify-center py-4 px-4 border border-transparent 
        rounded-md shadow-sm text-md font-medium text-white bg-primary-600
         hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
