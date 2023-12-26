const useErrorHandler = () => (e: unknown) => {
  console.error(e);
  console.log(JSON.stringify(e));
};

export default useErrorHandler;
