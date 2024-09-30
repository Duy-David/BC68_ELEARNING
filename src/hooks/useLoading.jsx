import { useState, useCallback } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const turnOnLoading = useCallback(() => setIsLoading(true), []);
  const turnOffLoading = useCallback(() => setIsLoading(false), []);

  return {
    isLoading,
    turnOnLoading,
    turnOffLoading,
  };
};

export default useLoading;
