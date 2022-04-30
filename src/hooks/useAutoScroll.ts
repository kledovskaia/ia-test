import { useEffect, useRef } from 'react';

export const useAutoScroll = <T extends HTMLElement, K = unknown>(
  messages: K
) => {
  const previousOffsetTop = useRef(0);
  const bottomRef = useRef<T>(null);

  useEffect(() => {
    if (!bottomRef.current) return;
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
  }, [messages]);

  return { bottomRef } as const;
};
