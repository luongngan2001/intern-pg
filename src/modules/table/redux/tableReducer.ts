import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ITableDataRoot } from '../../../models/payroll';

export interface TableState {
    table: Array<ITableDataRoot>;
}

export const setTableAction = createCustomAction('/setTabletAction', (table: Array<ITableDataRoot>) => ({
    table
}));





const actions = {setTableAction}

type Action = ActionType<typeof actions>;

export default function reducer(state: TableState = {table: []}, action: Action) {
    switch (action.type) {
      case getType(setTableAction):
        return { ...state, table: action.table };
      default:
        return state;
    }
  }