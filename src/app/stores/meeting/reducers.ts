import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { getTagListSuccess, retrievedMeetingListSuccess, setDate } from './actions';
import { IMeetingState, initialMeetingState } from './state';

const _meetingReducer: ActionReducer<IMeetingState, Action> = createReducer(
  initialMeetingState,
  on(getTagListSuccess, (state, { payload }) => ({ ...state, tags: payload })),
  on(retrievedMeetingListSuccess, (state, { payload }) => ({ ...state, meetingsByDate: payload })),
  on(setDate, (state, { payload }) => ({...state, selectedDateString: payload }))
)

export function meetingReducer(state: IMeetingState | undefined, action: Action) {
  return _meetingReducer(state, action)
}