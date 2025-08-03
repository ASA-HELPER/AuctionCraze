import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { TABLE_ACTIONS_KEYS } from '../../constants/table-constants';
import { IconButton } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ActionClickType,type IRow } from '../../types/table-types';
import './customTable-styles.scss';

export interface TableAction {
    Icon: React.JSX.Element;
    key: TABLE_ACTIONS_KEYS;
    label: string;
    showInMenu: boolean;
}

export const TABLE_ACTIONS: TableAction[] = [
    {
      Icon: <RemoveRedEyeOutlinedIcon />,
      key: TABLE_ACTIONS_KEYS.VIEW,
      label: 'View',
      showInMenu: false,
    },
    {
      Icon: <EditOutlinedIcon />,
      key: TABLE_ACTIONS_KEYS.EDIT,
      label: 'Edit',
      showInMenu: false,
    },
    {
      Icon: <DeleteIcon />,
      key: TABLE_ACTIONS_KEYS.DELETE,
      label: 'Delete',
      showInMenu: false,
    },
  ];

const getActions = (actions: TableAction[], handleActionClick: ActionClickType) => (row: IRow) => {
  return actions
    .map(action => {
      const { Icon, key, label, showInMenu } = action;

      const handleAction = (row: IRow, key: string) => () => handleActionClick(row, key);
      return (
        <GridActionsCellItem
          key={key}
          icon={
            <IconButton>{Icon}</IconButton>
          }
          label={label}
          disableRipple
          onClick={handleAction(row, key)}
          showInMenu={showInMenu}
          className={`customTable__actionButton ${
            key === TABLE_ACTIONS_KEYS.DELETE ? 'customTable__actionButtonDelete' : ''
          }`}
        />
      );
    })
    .filter(action => action !== null);
};

export default getActions;
