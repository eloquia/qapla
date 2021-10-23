import { createAction, props } from '@ngrx/store';
import { DateTime } from 'luxon';
import { Meeting, MeetingNoteTag } from 'src/app/meet/models/common';
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

/* - - - - - - - - - - - - - -
              Tags
- - - - - - - - - - - - - - */
export const getTagList = createAction(
  '[Meeting API] Get Tag List',
  props<{ payload: string }>()
)

export const getTagListSuccess = createAction(
  '[Meeting API] Get Tag List Success',
  props<{ payload: MeetingNoteTag[] }>()
)

export const createTag = createAction(
  '[Meeting API] Create Tag',
  props<{ payload: string }>()
)

/* - - - - - - - - - - - - - -
              Tags
- - - - - - - - - - - - - - */
export const setDate = createAction(
  '[Meeting API] Set Selected Date',
  props<{ payload: string }>(),
)
