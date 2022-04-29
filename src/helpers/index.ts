type Debounce = <T>(timeout: number, fn: (args: T) => void) => typeof fn;

export const debounce: Debounce = (timeout, fn) => {
  let timer: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), timeout);
  };
};
