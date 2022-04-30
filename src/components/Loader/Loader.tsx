import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { memo } from 'react';
import cn from 'classnames';
import styles from './Loader.module.scss';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Loader: FC<Props> = ({ className, ...props }) => {
  return (
    <div className={cn(className, styles.loader)} {...props}>
      Loading...
    </div>
  );
};

export default memo(Loader);
