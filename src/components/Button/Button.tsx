import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { memo } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

type Props = {
  handleClick: () => void;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: FC<Props> = ({ handleClick, className, children, ...props }) => (
  <button
    className={cn(styles.button, className)}
    onClick={handleClick}
    {...props}
  >
    {children}
  </button>
);

export default memo(Button);
