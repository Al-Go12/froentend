import React from 'react';

const Loader = () => {
  return (
    <div style={loaderStyle}>
      <span style={barStyle}></span>
      <span style={barStyle}></span>
      <span style={barStyle}></span>
    </div>
  );
};

export default Loader;

const loaderStyle = {
  display: 'flex',
  alignItems: 'center'
};

const barStyle = {
  display: 'inline-block',
  width: '3px',
  height: '20px',
  backgroundColor: 'rgba(255, 255, 255, .5)',
  borderRadius: '10px',
  animation: 'scale-up4 1s linear infinite'
};
