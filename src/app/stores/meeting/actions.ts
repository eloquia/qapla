import { createAction, props } from '@ngrx/store';
import { DateTime } from 'luxon';
import { Meeting } from 'src/app/meet/models/common';

export const updateDate = createAction(
  '[Meeting] Update Date',
  props<{ date: DateTime }>()
)

export const retrievedMeetingList = createAction(
  '[Meeting API] Retrieved Meetings Success',
  props<{ meetings: Meeting[] }>()
)