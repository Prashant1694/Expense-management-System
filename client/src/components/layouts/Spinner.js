import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="flex flex-col items-center space-y-2">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" role="status" />
        <span className="text-blue-700 text-lg font-medium">Please wait...</span>
      </div>
    </div>
  );
};

export default Spinner;
