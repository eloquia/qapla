import { createAction, props } from '@ngrx/store';
import { CreatePersonnelRequest, Personnel, UpdatePersonnelRequest } from 'src/app/personnel/models';

export const enum PersonnelActionTypes {
  CREATE_PERSONNEL = '[Personnel API] Create Personnel',
  CREATE_PERSONNEL_SUCCESS = '[Personnel API] Create Personnel Success',

  GET_PERSONNEL_LIST = '[Personnel API] Get Personnel List',
  SET_PERSONNEL_LIST = '[Personnel API] Set Personnel List',
  GET_PERSONNEL_LIST_SUCCESS = '[Personnel API] Personnel Loaded Success',
  GET_PERSONNEL_DETAILS = '[Personnel API] Get Personnel Details',

  UPDATE_PERSONNEL = '[Personnel API] Update Personnel',
  DELETE_PERSONNEL = '[Personnel API] Delete Personnel',
}

export const createPersonnel = createAction(
  PersonnelActionTypes.CREATE_PERSONNEL,
  props<{ createPersonnelRequest: CreatePersonnelRequest }>()
)

export const createPersonnelSuccess = createAction(
  PersonnelActionTypes.CREATE_PERSONNEL_SUCCESS,
  props<{ payload: string }>()
)

export const getPersonnelList = createAction(
  PersonnelActionTypes.GET_PERSONNEL_LIST,
  props<{ personnelList: Personnel[] }>()
)

export const setPersonnelList = createAction(
  PersonnelActionTypes.SET_PERSONNEL_LIST,
  props<{ personnelList: Personnel[] }>()
)

export const getPersonnelListSuccess = createAction(
  PersonnelActionTypes.GET_PERSONNEL_LIST_SUCCESS,
  props<{ payload: Personnel[] }>()
)

export const getPersonnelDetails = createAction(
  PersonnelActionTypes.GET_PERSONNEL_DETAILS,
  props<{ id: number }>()
)

export const updatePersonnelDetails = createAction(
  PersonnelActionTypes.UPDATE_PERSONNEL,
  props<{ updatePersonnelRequest: UpdatePersonnelRequest }>()
)

export const deletePersonnel = createAction(
  PersonnelActionTypes.DELETE_PERSONNEL,
  props<{ id: number }>()
)
