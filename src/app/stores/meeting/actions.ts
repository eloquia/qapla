import { createAction, props } from '@ngrx/store';
import { Meeting, MeetingNoteTag } from 'src/app/meet/models/common';
import { CreateMeetingRequest, CreatePeopleMeetingRequest, CreateProjectMeetingRequest } from 'src/app/meet/models/requests';

export const enum MeetingActionTypes {
  GET_MEETINGS_BY_DATE = '[Meeting API] Get Meetings By Date',
  RETRIEVED_MEETINGS_SUCCESS = '[Meeting API] Retrieved Meetings Success',
  CREATE_PERSONNEL_MEETING = '[Meeting API] Create Personnel Meeting',
  CREATE_PROJECT_MEETING = '[Meeting API] Create Project Meeting',
  CREATE_MEETING = '[Meeting API] Create Meeting',
}

export const getMeetingsByDate = createAction(
  MeetingActionTypes.GET_MEETINGS_BY_DATE,
  props<{ payload: string }>()
)

export const retrievedMeetingListSuccess = createAction(
  MeetingActionTypes.RETRIEVED_MEETINGS_SUCCESS,
  props<{ payload: Meeting[] }>()
)

export const createPersonnelMeeting = createAction(
  MeetingActionTypes.CREATE_PERSONNEL_MEETING,
  props<{ createPeopleMeetingRequest: CreatePeopleMeetingRequest }>()
)

export const createProjectMeeting = createAction(
  MeetingActionTypes.CREATE_PROJECT_MEETING,
  props<{ createProjectMeetingRequest: CreateProjectMeetingRequest }>()
)

export const createMeeting = createAction(
  MeetingActionTypes.CREATE_MEETING,
  props<{ meetingData: CreateMeetingRequest }>()
)

/* - - - - - - - - - - - - - -
              Tags
- - - - - - - - - - - - - - */
export const enum TagActionTypes {
  GET_TAG_LIST = '[Meeting API] Get Tag List',
  GET_TAG_LIST_SUCCESS = '[Meeting API] Get Tag List Success',
  CREATE_TAG = '[Meeting API] Create Tag',
}

export const getTagList = createAction(
  TagActionTypes.GET_TAG_LIST,
  props<{ payload: string }>()
)

export const getTagListSuccess = createAction(
  TagActionTypes.GET_TAG_LIST_SUCCESS,
  props<{ payload: MeetingNoteTag[] }>()
)

export const createTag = createAction(
  TagActionTypes.CREATE_TAG,
  props<{ payload: string }>()
)

/* - - - - - - - - - - - - - -
              Date
- - - - - - - - - - - - - - */
export const enum DateActionTypes {
  SET_DATE = '[Meeting API] Set Selected Date',
}

export const setDate = createAction(
  DateActionTypes.SET_DATE,
  props<{ payload: string }>(),
)

/* - - - - - - - - - - - - - -
        Create Meeting
- - - - - - - - - - - - - - */
export const enum CreateMeetingActionTypes {
  SET_MEETING_TYPE = '[Meeting API] Set Meeting Type',
}

export const setMeetingType = createAction(
  CreateMeetingActionTypes.SET_MEETING_TYPE,
  props<{ payload: 'Project' | 'Personnel' }>()
)
