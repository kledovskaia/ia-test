import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { memo } from 'react';
import cn from 'classnames';
import styles from './Controls.module.scss';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Controls: FC<Props> = ({ className, ...props }) => (
  <div className={cn(className, styles.controls)} {...props} />
);

export default memo(Controls);
