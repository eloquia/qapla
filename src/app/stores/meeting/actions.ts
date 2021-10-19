import { createAction, props } from '@ngrx/store';
import { DateTime } from 'luxon';
import { Meeting } from 'src/app/meet/models/common';
import { CreatePeopleMeetingRequest, CreateProjectMeetingRequest } from 'src/app/meet/models/requests';

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

export const createPersonnelMeeting = createAction(
  '[Meeting API] Create Personnel Meeting',
  props<{ createPeopleMeetingRequest: CreatePeopleMeetingRequest }>()
)

export const createProjectMeeting = createAction(
  '[Meeting API] Create Project Meeting',
  props<{ createProjectMeetingRequest: CreateProjectMeetingRequest }>()
)
