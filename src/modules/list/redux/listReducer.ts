import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IListParams } from '../../../models/auth';

export interface ListState {
    list: Array<IListParams>;
}

export const setListAction = createCustomAction('/setListAction', (data: Array<IListParams>) => ({
    data
}));




const actions = {setListAction}

type Action = ActionType<typeof actions>;

export default function reducer(state: ListState = {list: []}, action: Action) {
    switch (action.type) {
      case getType(setListAction):
        return { ...state, list: action.data };
      default:
        return state;
    }
  }