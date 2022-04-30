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
    <div className={cn(className, styles.container)} {...props}>
      <div className={styles.loader}></div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  loading: state.messages.loading && !state.messages.data.length,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Loader));
