import { memo, useCallback, useEffect, useState } from 'react';
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import Button from '../Button/Button';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { ReactComponent as OrderIcon } from '../../assets/order.svg';
import cn from 'classnames';
import { AppDispatch } from '../../redux/store';
import { setIsFavorite } from '../../redux/slices/messages';
import { connect } from 'react-redux';
import Message from '../Message/Message';
import FlipMove from 'react-flip-move';
import styles from './Messages.module.scss';

type Props = {
  messages: Message[];
  loadPrevious: () => void;
} & ReturnType<typeof mapDispatchToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Messages: FC<Props> = ({
  className,
  messages,
  loadPrevious,
  setIsFavorite,
  ...props
}) => {
  const { bottomRef, setIsScrollActive } =
    useAutoScroll<HTMLDivElement>(messages);
  const [order, setOrder] = useState<'old' | 'new'>('old');

  useEffect(() => {
    setIsScrollActive(order === 'old');
  }, [order, setIsScrollActive]);

  const handleToggleOrder = useCallback(() => {
    setOrder((state) => (state === 'new' ? 'old' : 'new'));
  }, []);

  const handleSetIsFavorite = useCallback(
    (params: InferArgType<typeof setIsFavorite>) => setIsFavorite(params),
    [setIsFavorite]
  );

  return (
    <section className={cn(className, styles.messages)} {...props}>
      <div className={styles.messages__controls}>
        <Button
          className={styles.messages__controlButton}
          handleClick={handleToggleOrder}
        >
          <OrderIcon />
          <span>
            Показывать: сначала {order === 'new' ? 'новые' : 'старые'}
          </span>
        </Button>

        {order === 'old' && (
          <Button
            className={styles.messages__controlButton}
            handleClick={loadPrevious}
          >
            Загрузить предыдущие сообщения
          </Button>
        )}
      </div>
      {/* Кажется, какая-то проблема с типизацией у FlipMove */}
      {/* @ts-ignore */}
      <FlipMove
        className={styles.messages__container}
        typeName={'ul'}
        staggerDurationBy="30"
        duration={500}
      >
        {(order === 'old' ? messages : [...messages].reverse()).map(
          (message) => (
            <li key={message._id}>
              <Message handleClick={handleSetIsFavorite} message={message} />
            </li>
          )
        )}
      </FlipMove>
      <div ref={bottomRef}></div>
    </section>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setIsFavorite: (id: InferArgType<typeof setIsFavorite>) => {
    dispatch(setIsFavorite(id));
  },
});

export default connect(null, mapDispatchToProps)(memo(Messages));
