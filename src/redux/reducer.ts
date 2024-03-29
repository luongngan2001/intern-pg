import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import listReducer, { ListState } from '../modules/list/redux/listReducer';
import tableReducer, { TableState } from '../modules/table/redux/tableReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  listitem: ListState;
  tableitem: TableState
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    listitem: listReducer,
    tableitem: tableReducer,
  });
}
