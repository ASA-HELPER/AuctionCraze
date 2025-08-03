import { SyntheticEvent } from 'react';

import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_TOTAL_RECORDS,
  PAGE_LIMIT_OPTIONS,
  PaginationItemShape,
} from '../../constants/table-constants';
import { Pagination, TablePagination } from '@mui/material';

import './customTable-styles.scss';

interface TableFooterProps {
  /** onPageChange: is an required prop which handles the current page change. */
  onPageChange: (__: any, newPage: number) => void;
  /** onLimitChange: is an required prop which handles the number of rows to display. */
  onLimitChange: (event: SyntheticEvent) => void;
  /** page: is an required prop which dictates the current page number. */
  page: number;
  /** limit: is a required prop which dictates the number of rows to display. */
  limit: number;
  /** totalRecords: is an required prop for getting total number of pages. */
  totalRecords: number;
}

const CustomTableFooter = (props: TableFooterProps) => {
  const {
    page = DEFAULT_PAGE,
    totalRecords = DEFAULT_TOTAL_RECORDS,
    limit = DEFAULT_LIMIT,
    onLimitChange = () => {},
    onPageChange = () => {},
  } = props;

  const numberOfPages = Math.ceil(totalRecords / limit);
  return (
    <div className="customTable__paginationContainer">
      <TablePagination
        className="customTable__rowsPerPageContainer"
        count={totalRecords}
        page={page - 1}
        onPageChange={onPageChange}
        rowsPerPage={limit}
        onRowsPerPageChange={onLimitChange}
        rowsPerPageOptions={PAGE_LIMIT_OPTIONS}
        labelRowsPerPage='Rows Per Page'
        // TODO: Will Update this later
        labelDisplayedRows={() => ''}
        ActionsComponent={() => <></>}
      />
      <Pagination
        className="customTable__paginationControls"
        count={numberOfPages ? numberOfPages : 1}
        onChange={onPageChange}
        page={page}
        shape={PaginationItemShape.Rounded}
        showFirstButton
        showLastButton
      />
    </div>
  );
};

export default CustomTableFooter;
