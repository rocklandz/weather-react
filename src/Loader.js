import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        marginTop: '2rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className='loader'></div>
    </div>
  );
};

export default Loader;
