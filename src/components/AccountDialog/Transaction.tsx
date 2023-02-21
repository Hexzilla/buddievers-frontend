import { CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ExternalLink } from 'components';
import { ChainId } from '../../constants';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useAllTransactions } from 'state/transactions/hooks';
import { getExplorerLink } from 'utils';
import { styles as style } from './Transaction.styles';
import { CheckCircle, Triangle } from 'react-feather';

export const Transaction = ({ hash }: { hash: string }) => {
  const { chainId } = useActiveWeb3React();
  const allTransactions = useAllTransactions();

  const tx = allTransactions?.[hash];
  const summary = tx?.summary;
  const pending = !tx?.receipt;
  const success =
    !pending &&
    tx &&
    (tx.receipt?.status === 1 || typeof tx.receipt?.status === 'undefined');

  const styles = useClasses(style);

  return (
    <div>
      <ExternalLink
        href={getExplorerLink(
          chainId ?? ChainId.MOONRIVER,
          hash,
          'transaction'
        )}
      >
        <Typography>{summary ?? hash} ↗</Typography>
        <div className={styles.iconWrapper}>
          {pending ? (
            <CircularProgress />
          ) : success ? (
            <CheckCircle size="16" />
          ) : (
            <Triangle size="16" />
          )}
        </div>
      </ExternalLink>
    </div>
  );
};
