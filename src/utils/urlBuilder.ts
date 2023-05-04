export const urlBuilder = (path: string, searchParams: object) => {
  const url = new URL(path);

  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
};
