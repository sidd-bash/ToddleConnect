import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

const withConditionalRender = (Component) => (props) => {
  const location = useLocation();
  const desiredPath = "/main"; // Replace with your desired URL

  if (location.pathname === desiredPath) {
    return <Component {...props} />;
  }

  return null; // Or render an alternative component/message
};

export default withConditionalRender;
