export const getPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber.replace(/\D/g, '');
};
