import { createReducer, on } from '@ngrx/store';

import { getTagListSuccess, retrievedMeetingListSuccess } from './actions';
import { initialMeetingState } from './state';

export const meetingReducer = createReducer(
  initialMeetingState,
  on(retrievedMeetingListSuccess, (state, { payload }) => ({ ...state, meetingsByDate: payload })),
  on(getTagListSuccess, (state, { payload }) => ({ ...state, tags: payload })),
)