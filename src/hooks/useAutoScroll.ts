import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useAutoScroll = <T extends HTMLElement, K = unknown>(
  messages: K
) => {
  const [isScrollActive, setIsScrollActive] = useState(false);
  const previousOffsetTop = useRef(0);
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    if (!bottomRef.current) return;
    if (previousOffsetTop.current <= window.innerHeight) {
      previousOffsetTop.current =
        bottomRef.current.offsetTop + bottomRef.current.offsetHeight;
      return;
    }

    const difference = Math.abs(
      previousOffsetTop.current -
        (bottomRef.current.offsetTop + bottomRef.current.offsetHeight)
    );

    previousOffsetTop.current =
      bottomRef.current.offsetTop + bottomRef.current.offsetHeight;

    if (!isScrollActive && window.scrollY) {
      window.scroll({
        top: window.scrollY + difference,
      });
      return;
    }
    const shouldScroll =
      document.body.offsetHeight - window.scrollY - window.innerHeight <=
      difference;

    if (shouldScroll) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isScrollActive]);

  return {
    bottomRef,
    setIsScrollActive,
  } as const;
};
