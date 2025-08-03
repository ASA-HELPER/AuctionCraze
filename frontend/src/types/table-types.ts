import { ReactNode } from 'react';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';

export type ActionClickType = (row: IRow, actionKey: string) => void;

export type IAction = {
  edit?: boolean;
  view?: boolean;
  delete?: boolean;
  toggle?: boolean;
  instance?: boolean;
};

export interface IRow {
  [key: string]: any;
}

export interface IColumn {
  field: string;
  headerName?: string;
  renderCell?: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => ReactNode;
  onHeaderClick?: () => void;
  sort?: boolean;
}

export type ExtendedColumn = IColumn & GridColDef<any>;