import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { useEffect } from 'react';
import { useMessages } from './hooks/useMessages';
import cn from 'classnames';
import styles from './App.module.scss';
import Message from './components/Message/Message';
import MessagesFeed from './components/MessagesFeed/MessagesFeed';
import { ReactComponent as ArrowIcon } from './assets/arrow-down.svg';
import { connect } from 'react-redux';
import { setIsFavorite } from './redux/slices/messages';
import { AppDispatch } from './redux/store';
import Error from './components/Error/Error';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import { useAutoScroll } from './hooks/useAutoScroll';
import { ReactComponent as OrderIcon } from './assets/order.svg';

const handleScrollTop = () => {
  window.scroll({ left: 0, top: 0, behavior: 'smooth' });
};
const handleScrollBottom = () => {
  window.scroll({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

type Props = ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const App: FC<Props> = ({ setIsFavorite, className, ...props }) => {
  const { data: messages, loading, error } = useMessages();
  const { bottomRef, setIsScrollActive } =
    useAutoScroll<HTMLLIElement>(messages);
  const [order, setOrder] = useState<'old' | 'new'>('old');

  useEffect(() => {
    setIsScrollActive(order === 'old');
  }, [order]);

  const handleSetIsFavorite = useCallback(
    (params: InferArgType<typeof setIsFavorite>) => setIsFavorite(params),
    [setIsFavorite]
  );

  const handleToggleOrder = useCallback(() => {
    setOrder((state) => (state === 'new' ? 'old' : 'new'));
  }, []);

  return (
    <>
      <div className={cn(className, styles.app)} {...props}>
        {!!messages.length && (
          <Button
            className={cn(
              styles.app__scrollButton,
              styles.app__scrollButton_up
            )}
            handleClick={handleScrollTop}
          >
            <ArrowIcon />
          </Button>
        )}

        <div className={styles.app__content}>
          {!!messages.length && (
            <Button
              className={styles.app__orderButton}
              handleClick={handleToggleOrder}
            >
              <OrderIcon />
              <span>
                Показывать: сначала {order === 'new' ? 'новые' : 'старые'}
              </span>
            </Button>
          )}
          <Error />
          <Loader />

          <MessagesFeed>
            {(order === 'old' ? messages : [...messages].reverse()).map(
              (message, index) => (
                <li
                  key={message._id}
                  ref={index === messages.length - 1 ? bottomRef : null}
                >
                  <Message
                    handleClick={handleSetIsFavorite}
                    message={message}
                  />
                </li>
              )
            )}
          </MessagesFeed>
        </div>
        {!!messages.length && (
          <Button
            className={cn(
              styles.app__scrollButton,
              styles.app__scrollButton_down
            )}
            handleClick={handleScrollBottom}
          >
            <ArrowIcon />
          </Button>
        )}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setIsFavorite: (id: InferArgType<typeof setIsFavorite>) => {
    dispatch(setIsFavorite(id));
  },
});

export default connect(null, mapDispatchToProps)(App);
