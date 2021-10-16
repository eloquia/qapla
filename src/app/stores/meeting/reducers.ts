import { createReducer, on, Action, StoreModule } from '@ngrx/store';

import { DateTime } from 'luxon';

import { Meeting } from 'src/app/meet/models/common';
import { retrievedMeetingList, updateDate } from './actions';

// export const initialState: DateTime = DateTime.now();

// export const dateReducer = createReducer(
//   initialState,
//   on(updateDate, (state, { date }) => date)
// )

export const initialState: ReadonlyArray<Meeting> = [];

export const meetingReducer = createReducer(
  initialState,
  // on(retrievedMeetingList, (state, { meetings }) => [...meetings])
  on(retrievedMeetingList, (state, { meetings }) => ({ ...meetings }))
)