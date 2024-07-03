import React from 'react';
import PrefixedTextField from './RoughTwo';

const RoughOne = () => {
  const handleFinalValueChange = (finalValue) => {
    console.log('Final value:', finalValue);
  };

  return (
    <div>
      <h2>Prefixed Text Field Example</h2>
      <PrefixedTextField prefix="http://" onFinalValueChange={handleFinalValueChange} />
    </div>
  );
};

export default RoughOne;
