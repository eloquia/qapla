import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { getPersonnelListSuccess } from './actions';
import { initialPersonnelState, IPersonnelState } from './state';

/*
  Reducers provide a way to resolve state
*/

const _personnelReducer: ActionReducer<IPersonnelState, Action> = createReducer(
  initialPersonnelState,
  on(getPersonnelListSuccess, (state, { payload }) => ({ ...state, personnelList: payload })),
);

export function personnelReducer(state: IPersonnelState | undefined, action: Action) {
  return _personnelReducer(state, action);
}
