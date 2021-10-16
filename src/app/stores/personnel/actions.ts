import { createAction, props } from '@ngrx/store';
import { CreatePersonnelRequest, Personnel, UpdatePersonnelRequest } from 'src/app/personnel/models';

export const createPersonnel = createAction(
  '[Personnel API] Create Personnel',
  props<{ createPersonnelRequest: CreatePersonnelRequest }>()
)

export const getPersonnelList = createAction(
  '[Personnel API] Get Personnel List',
  props<{ personnelList: Personnel[] }>()
)

export const setPersonnelList = createAction(
  '[Personnel API] Set Personnel List',
  props<{ personnelList: Personnel[] }>()
)

export const getPersonnelListSuccess = createAction(
  '[Personnel API] Personnel Loaded Success',
  props<{ payload: Personnel[] }>()
)

export const getPersonnelDetails = createAction(
  '[Personnel API] Get Personnel Details',
  props<{ id: number }>()
)

export const updatePersonnelDetails = createAction(
  '[Personnel API] Update Personnel',
  props<{ updatePersonnelRequest: UpdatePersonnelRequest }>()
)

export const deletePersonnel = createAction(
  '[Personnel API] Delete Personnel',
  props<{ id: number }>()
)
