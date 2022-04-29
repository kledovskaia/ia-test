import type { DetailedHTMLProps, FC, LiHTMLAttributes } from 'react';
import { memo } from 'react';
import cn from 'classnames';
import styles from './Message.module.scss';

type Props = {
  message: Message;
} & DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;

const Message: FC<Props> = ({ className, message, ...props }) => {
  return (
    <li className={cn(className, styles.message)} {...props}>
      {message.content}
    </li>
  );
};

export default memo(Message);
