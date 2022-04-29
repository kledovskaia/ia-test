import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchMessages } from '../redux/thunks/messages';

const INTERVAL_SEC = 5;

export const useMessages = () => {
  const { data, loading, error } = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMessages());

    // const interval = setInterval(
    //   () => dispatch(fetchMessages()),
    //   INTERVAL_SEC * 1000
    // );

    // return () => clearInterval(interval);
  }, [dispatch]);

  return { data, loading, error } as const;
};
