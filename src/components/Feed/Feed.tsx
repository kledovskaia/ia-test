import { scrollBottom, scrollTop } from '../../helpers';
import Button from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../assets/arrow-down.svg';
import cn from 'classnames';
import styles from './Feed.module.scss';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Feed: FC<Props> = ({ className, children, ...props }) => {
  return (
    <div className={cn(className, styles.feed)} {...props}>
      <Button
        className={cn(styles.feed__scrollButton, styles.feed__scrollButton_up)}
        handleClick={scrollTop}
      >
        <ArrowIcon />
      </Button>

      <section className={styles.feed__content}>{children}</section>

      <Button
        className={cn(
          styles.feed__scrollButton,
          styles.feed__scrollButton_down
        )}
        handleClick={scrollBottom}
      >
        <ArrowIcon />
      </Button>
    </div>
  );
};

export default Feed;
