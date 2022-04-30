import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { memo } from 'react';
import cn from 'classnames';
import styles from './Loader.module.scss';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';

type Props = ReturnType<typeof mapStateToProps> &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Loader: FC<Props> = ({ className, loading, ...props }) => {
  if (!loading) return null;

  return (
    <div className={cn(className, styles.loader)} {...props}>
      Loading...
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: state.messages.loading,
});

export default connect(mapStateToProps)(memo(Loader));
