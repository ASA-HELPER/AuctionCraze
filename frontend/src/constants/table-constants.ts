export const DEFAULT_LIMIT = 10;
export const DEFAULT_OFFSET = 0;
export const DEFAULT_TOTAL_RECORDS = 0;
export const DEFAULT_PAGE = 1;
export const PAGE_LIMIT_OPTIONS = [5, 10, 25, 50];

export enum PaginationItemShape {
    Circular = 'circular',
    Rounded = 'rounded',
    Left = 'LEFT',
    Right = 'RIGHT',
}

export enum TABLE_ACTIONS_KEYS {
    TOGGLE = 'toggle',
    VIEW = 'view',
    EDIT = 'edit',
    DELETE = 'delete',
    ADD = 'add',
}