import { useState } from "react";
import { createContext } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
        isLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
