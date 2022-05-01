import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { memo } from 'react';
import cn from 'classnames';
import styles from './Error.module.scss';
import { RootState } from '../../redux/store';

type Props = {
  error: RootState['messages']['error'];
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Error: FC<Props> = ({ className, children, error, ...props }) => {
  if (!error) return null;

  return (
    <div className={cn(className, styles.error)} {...props}>
      {error || children}
    </div>
  );
};

export default memo(Error);
