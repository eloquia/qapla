import { createAction, props } from '@ngrx/store';
import { DateTime } from 'luxon';
import { Meeting } from 'src/app/meet/models/common';
import { CreateMeetingRequest } from 'src/app/meet/models/requests';

export const updateDate = createAction(
  '[Meeting] Update Date',
  props<{ date: DateTime }>()
)

export const getMeetingsByDate = createAction(
  '[Meeting API] Get Meetings By Date',
  props<{ payload: string }>()
)

export const retrievedMeetingListSuccess = createAction(
  '[Meeting API] Retrieved Meetings Success',
  props<{ payload: Meeting[] }>()
)

export const createMeeting = createAction(
  '[Meeting API] Create Meeting',
  props<{ createMeetingRequest: CreateMeetingRequest }>()
)
