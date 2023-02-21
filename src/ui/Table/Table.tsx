import { ReactNode, useState, createContext, useContext } from 'react';
import MaterialTable, { TableProps } from '@mui/material/Table';
import MaterialTableBody, { TableBodyProps } from '@mui/material/TableBody';
import MaterialTableCell, { TableCellProps } from '@mui/material/TableCell';
import MaterialTableSortLabel, { TableSortLabelProps } from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead, { TableHeadProps } from '@mui/material/TableHead';
import MaterialTableRow, { TableRowProps } from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Paper from '@mui/material/Paper';
import { tableStyles } from './Table.styles';
import { useClasses } from 'hooks';

const TableContext = createContext<{ isExpandable?: boolean }>({});

export const TableCell = ({ children, ...props }: TableCellProps) => {
  return <MaterialTableCell {...props}>{children}</MaterialTableCell>;
};
export const TableSortLabel = ({ children, ...props }: TableSortLabelProps) => {
  return <MaterialTableSortLabel {...props}>{children}</MaterialTableSortLabel>;
};

export const TableRow = ({
  children,
  renderExpand,
  ...props
}: TableRowProps & { renderExpand?: () => ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { isExpandable } = useContext(TableContext);

  const { rowInfo } = useClasses(tableStyles);

  return (
    <>
      <MaterialTableRow {...props}>
        {isExpandable && (
          <TableCell>
            {renderExpand && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? (
                  <KeyboardArrowUpIcon style={{ fill: '#d2023e' }} />
                ) : (
                  <KeyboardArrowDownIcon style={{ fill: '#d2023e' }} />
                )}
              </IconButton>
            )}
          </TableCell>
        )}
        {children}
      </MaterialTableRow>
      {isExpandable && renderExpand && (
        <MaterialTableRow className={rowInfo}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell>
          <TableCell
            style={
              !open ? { paddingBottom: 0, paddingTop: 0 } : { padding: '2rem' }
            }
            colSpan={7}
          >
            {/* borderBottom: 'unset' */}
            <Collapse in={open} timeout="auto" unmountOnExit>
              {renderExpand()}
            </Collapse>
          </TableCell>
        </MaterialTableRow>
      )}
    </>
  );
};

export const TableHeader = ({ children, ...props }: TableHeadProps) => {
  return <TableHead {...props}>{children}</TableHead>;
};

export const TableBody = ({
  children,
  ...props
}: TableBodyProps & { isExpandable?: boolean }) => {
  return <MaterialTableBody {...props}>{children}</MaterialTableBody>;
};

export const Table = ({
  children,
  isExpandable,
  ...props
}: TableProps & { isExpandable?: boolean }) => {
  return (
    <TableContainer
      component={Paper}
      style={{
        borderRadius: 0,
      }}
    >
      <MaterialTable {...props} size="medium">
        <TableContext.Provider value={{ isExpandable }}>
          {children}
        </TableContext.Provider>
      </MaterialTable>
    </TableContainer>
  );
};
