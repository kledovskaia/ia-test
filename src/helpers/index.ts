export const getTimeFromString = (s: string): string => {
  const [hours, minutes] = s.split(' ')[1].split(':');
  return `${hours}:${minutes}`;
};
