export const shortAddress = (address: string) => {
  if (!address || address.length < 10) {
    return address;
  }
  return (
    address.substring(0, 6) +
    '...' +
    address.substring(address.length - 4, address.length)
  );
};
