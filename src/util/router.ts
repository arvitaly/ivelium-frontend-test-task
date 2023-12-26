export const formatLink = (path: string) => {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
};
