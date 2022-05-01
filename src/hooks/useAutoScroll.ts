import { useEffect, useRef, useState } from 'react';

export const useAutoScroll = <T extends HTMLElement, K = unknown>(
  messages: K
) => {
  const [isScrollActive, setIsScrollActive] = useState(false);
  const previousOffsetTop = useRef(0);
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    if (!isScrollActive) return;
    if (!bottomRef.current) return;
    if (!previousOffsetTop.current) {
      previousOffsetTop.current =
        bottomRef.current.offsetTop + bottomRef.current.offsetHeight;
      return;
    }

    const difference = Math.abs(
      previousOffsetTop.current -
        (bottomRef.current.offsetTop + bottomRef.current.offsetHeight)
    );

    const shouldScroll =
      document.body.offsetHeight - window.scrollY - window.innerHeight <=
      difference;

    previousOffsetTop.current =
      bottomRef.current.offsetTop + bottomRef.current.offsetHeight;

    if (shouldScroll) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isScrollActive]);

  return { bottomRef, setIsScrollActive } as const;
};
