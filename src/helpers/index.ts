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

export const debounce = <T, K extends (...args: T[]) => void>(
  fn: K,
  ms = 300
) => {
  let isCooldown = false;

  return function (...args: T[]) {
    if (isCooldown) return;
    fn(...args);
    isCooldown = true;
    setTimeout(() => (isCooldown = false), ms);
  };
};
