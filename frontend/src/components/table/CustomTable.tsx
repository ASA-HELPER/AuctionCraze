import { FC, SyntheticEvent, useState } from 'react';
import { DEFAULT_LIMIT, DEFAULT_PAGE, DEFAULT_TOTAL_RECORDS } from '../../constants/table-constants';
import KeyboardArrowDownIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowUpIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { ExtendedColumn, IRow, IAction } from '../../types/table-types';

import getActions, { TABLE_ACTIONS } from './CustomTableActions';
import AMTableFooter from './CustomTableFooter';
import './customTable-styles.scss';
import CustomSpinner from './../spinner/CustomSpinner';

interface ICustomTableProps extends Omit<DataGridProps, 'pagination' | 'columns'> {
  /* actions: actions is an optional object with delete, edit, and view keys */
  actions?: IAction;
  /** columns: is an required boolean prop that defines columns of the table. */
  columns: ExtendedColumn[];
  /** pagination: is an optional boolean prop that dictates whether pagination is needed or not. */
  pagination?: boolean;
  /* handleActionClick: handleActionClick is a function that takes row and actionKey as arguments */
  handleActionClick?: (row: any, actionKey: string) => void;
  /** rows: is a required prop which is an array of objects for displaying rows. */
  rows: IRow[];
  /** onPageChange: is an optional prop which handles the current page change. */
  onPageChange?: (__: any, newPage: number) => void;
  /** onLimitChange: is an optional prop which handles the number of rows to display. */
  onLimitChange?: (event: SyntheticEvent) => void;
  /** page: is an optional prop which dictates the current page number. */
  page?: number;
  /** limit: is a required prop which dictates the number of rows to display. */
  limit?: number;
  /** totalRecords: is an optional prop for getting total number of pages. */
  totalRecords?: number;
  /** loading: is a required prop which dictates whether the table is loading or not. */
  loading: boolean;
}

interface SortingState {
  field: string;
  direction: 'asc' | 'desc';
}

const commonColumnProps: Partial<ExtendedColumn> = {
  flex: 1,
  minWidth: 150,
};

const CustomTable: FC<ICustomTableProps> = props => {
  const {
    columns,
    page = DEFAULT_PAGE,
    onLimitChange = () => {},
    onPageChange = () => {},
    pagination = false,
    rows,
    limit = DEFAULT_LIMIT,
    totalRecords = DEFAULT_TOTAL_RECORDS,
    loading,
    actions,
    handleActionClick = () => {},
    ...rest
  } = props;

  const [sortingState, setSortingState] = useState<SortingState[]>([]);

  const handleHeaderClick = (field: string, onHeaderClick?: () => void) => {
    setSortingState(prevState => {
      const existingState = prevState.find(state => state.field === field);
      if (existingState) {
        return prevState.map(state =>
          state.field === field
            ? { ...state, direction: state.direction === 'asc' ? 'desc' : 'asc' }
            : state,
        );
      } else {
        return [...prevState, { field, direction: 'asc' }];
      }
    });

    if (onHeaderClick) {
      onHeaderClick();
    }
  };

  const sortedColumn = columns?.map(column => {
    if (column.sort) {
      const currentSortState = sortingState.find(state => state.field === column.field);
      return {
        ...column,
        renderHeader: () => (
          <span
            className="sortable-header"
            onClick={() => handleHeaderClick(column.field, column.onHeaderClick)}>
            {column.headerName}
            <span className="customTable__sortIcon">
              {currentSortState?.direction === 'asc' ? (
                <KeyboardArrowUpIcon fontSize="small" />
              ) : (
                <KeyboardArrowDownIcon fontSize="small" />
              )}
            </span>
          </span>
        ),
      };
    }
    return column;
  });

  const filteredActions = actions && TABLE_ACTIONS.filter(action => actions[action.key]);
  const isActionActive = filteredActions && filteredActions.length > 0;

  let updatedColumns = sortedColumn?.map(column => {
    const headerAlign = column.type === 'number' ? 'right' : 'left';
    return {
      ...commonColumnProps,
      ...column,
      headerAlign,
    };
  });

  if (isActionActive) {
    updatedColumns = [
      ...updatedColumns,
      {
        ...commonColumnProps,
        headerAlign: 'center',
        field: 'actions',
        headerName: 'Actions',
        flex: 0.5,
        type: 'actions',
        getActions: getActions(filteredActions, handleActionClick),
      },
    ];
  }

  return (
    <Box className="customTable__tableContainer">
      <DataGrid
        classes={{
          cell: 'customTable__rowCell',
          columnHeader: 'customTable__headers',
          root: 'customTable__container',
          row: 'customTable__row',
        }}
        columns={updatedColumns}
        disableColumnFilter
        disableColumnMenu
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        disableColumnSorting
        rows={rows}
        showColumnVerticalBorder
        hideFooter={!pagination}
        slots={{
          footer: () => (
            <AMTableFooter
              onPageChange={onPageChange}
              onLimitChange={onLimitChange}
              page={page}
              limit={limit}
              totalRecords={totalRecords}
            />
          ),
          noRowsOverlay: () => <div>No Data Available</div>,
          loadingOverlay: () => <CustomSpinner spinnerSize={40} />,
        }}
        loading={loading}
        {...rest}
      />
    </Box>
  );
};

export default CustomTable;
