export const getTimeFromString = (s: string): string => {
  const [hours, minutes] = s.split(' ')[1].split(':');
  return `${hours}:${minutes}`;
};

export const scrollTop = () => {
  window.scroll({ left: 0, top: 0, behavior: 'smooth' });
};
export const scrollBottom = () => {
  window.scroll({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};
