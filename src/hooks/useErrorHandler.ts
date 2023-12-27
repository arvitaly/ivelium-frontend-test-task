import { useCallback } from "react";

const useErrorHandler = () => {
  return useCallback((e: unknown) => {
    console.error(e);
    console.log(JSON.stringify(e));
  }, []);
};

export default useErrorHandler;
