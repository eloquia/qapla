import { createReducer, on } from '@ngrx/store';

import { retrievedMeetingListSuccess } from './actions';
import { initialMeetingState } from './state';

export const meetingReducer = createReducer(
  initialMeetingState,
  on(retrievedMeetingListSuccess, (state, { payload }) => ({ ...state, meetingsByDate: payload }))
)