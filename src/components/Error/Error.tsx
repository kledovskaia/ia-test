import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { memo } from 'react';
import cn from 'classnames';
import styles from './Error.module.scss';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Error: FC<Props> = ({ className, children, ...props }) => {
  return (
    <div className={cn(className, styles.error)} {...props}>
      {children}
    </div>
  );
};

export default memo(Error);
