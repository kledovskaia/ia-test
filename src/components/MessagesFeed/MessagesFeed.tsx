import { memo } from 'react';
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './MessagesFeed.module.scss';

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

const MessagesFeed: FC<Props> = ({ className, children, ...props }) => {
  return (
    <ul className={cn(className, styles.messagesFeed)} {...props}>
      {children}
    </ul>
  );
};

export default memo(MessagesFeed);
