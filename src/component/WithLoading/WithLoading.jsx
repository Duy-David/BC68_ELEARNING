import React, { useState, useEffect } from 'react';
import Loading from '../../component/Loading/Loading'; // Giả sử bạn có component Loading

const WithLoading = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default WithLoading;
