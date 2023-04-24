import { useMemo } from 'react';
import styled from '@emotion/styled';
import MatPagination from '@mui/material/Pagination';

import { useClasses } from 'hooks';
import { styles } from './styles';

const PagenationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}`;

type Props = {
  totalCount: number;
  pageSize: number;
  onChange: (pageNumber: number) => void;
};

const Pagination = ({ totalCount, pageSize, onChange }: Props) => {
  const { paginationStyle } = useClasses(styles);

  const pageCount = useMemo(() => {
    return 1 + Math.floor((totalCount - 1) / pageSize);
  }, [totalCount, pageSize]);

  return (
    <PagenationContainer>
      <MatPagination
        count={pageCount}
        onChange={(e: any, pageNumber: number) => onChange(pageNumber)}
        size="large"
        shape="circular"
        showFirstButton
        showLastButton
        className={paginationStyle}
      />
    </PagenationContainer>
  );
};

export default Pagination;
