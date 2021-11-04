import { createAction, props } from '@ngrx/store';
import { Meeting, MeetingNoteTag } from 'src/app/meet/models/common';
import { CreateMeetingRequest, CreatePeopleMeetingRequest, CreateProjectMeetingRequest, UpdateMeetingItemRequest, UpdateMeetingRequest } from 'src/app/meet/models/requests';

export const enum MeetingActionTypes {
  GET_MEETINGS_BY_DATE = '[Meeting API] Get Meetings By Date',
  RETRIEVED_MEETINGS_SUCCESS = '[Meeting API] Retrieved Meetings Success',
  CREATE_PERSONNEL_MEETING = '[Meeting API] Create Personnel Meeting',
  CREATE_PROJECT_MEETING = '[Meeting API] Create Project Meeting',
  CREATE_MEETING = '[Meeting API] Create Meeting',

  // Update Meeting
  UPDATE_MEETING = '[Meeting API] Update Meeting',
  UPDATE_MEETING_ERROR = '[Meeting API] Update Meeting Error',
  UPDATE_MEETING_SUCCESS = '[Meeting API] Update Meeting Success',

  // Update Meeting Item
  UPDATE_MEETING_ITEM = '[Meeting API] Update Meeting Note',
  UPDATE_MEETING_ITEM_SUCCESS = '[Meeting API] Update Meeting Note Success',
  UPDATE_MEETING_ITEM_ERROR = '[Meeting API] Update Meeting Note Error',
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

export const updateMeeting = createAction(
  MeetingActionTypes.UPDATE_MEETING,
  props<{ meetingData: UpdateMeetingRequest }>()
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

/* - - - - - - - - - - - - - -
        Update Meeting
- - - - - - - - - - - - - - */

export const updateMeetingSuccess = createAction(
  MeetingActionTypes.UPDATE_MEETING_SUCCESS,
  props<{ payload: string }>()
)

export const updateMeetingError = createAction(
  MeetingActionTypes.UPDATE_MEETING_ERROR,
  props<{ payload: string }>()
)

export const updateMeetingItem = createAction(
  MeetingActionTypes.UPDATE_MEETING_ITEM,
  props<{ payload: UpdateMeetingItemRequest }>()
)

export const updateMeetingItemSuccess = createAction(
  MeetingActionTypes.UPDATE_MEETING_ITEM_SUCCESS,
  props<{ payload: string }>()
)

export const updateMeetingItemError = createAction(
  MeetingActionTypes.UPDATE_MEETING_ITEM_ERROR,
  props<{ payload: string }>()
)
