import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { memo } from 'react';
import cn from 'classnames';
import styles from './Loader.module.scss';
import { RootState } from '../../redux/store';

type Props = {
  loading: RootState['messages']['loading'];
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Loader: FC<Props> = ({ className, loading, ...props }) => {
  if (!loading) return null;

  return (
    <div className={cn(className, styles.container)} {...props}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default memo(Loader);
