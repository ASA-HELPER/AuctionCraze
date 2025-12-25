import { ReactNode } from "react";
import {
  GridActionsColDef,
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";

export type ActionClickType = (row: IRow, actionKey: string) => void;

export type IAction = {
  edit?: boolean;
  view?: boolean;
  delete?: boolean;
  toggle?: boolean;
  instance?: boolean;
  add?: boolean;
};

export interface IRow {
  [key: string]: any;
}

export interface IColumn {
  field: string;
  headerName?: string;
  renderCell?: (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => ReactNode;
  onHeaderClick?: () => void;
  sort?: boolean;
}

type BaseExtendedColumn = Omit<GridColDef, "renderCell" | "sortable"> & {
  sort?: boolean;
  onHeaderClick?: () => void;
};

type ActionsExtendedColumn = Omit<GridActionsColDef, "sortable"> & {
  sort?: never;
  onHeaderClick?: () => void;
};

export type ExtendedColumn = BaseExtendedColumn | ActionsExtendedColumn;
