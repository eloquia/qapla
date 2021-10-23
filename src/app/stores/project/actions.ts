import { createAction, props } from '@ngrx/store';
import { CreateProjectRequest, Project } from '../../project/models';

export const enum ProjectActionTypes {
  CREATE_PROJECT = '[Project API] Create Project',
  GET_PROJECT_BY_ID = '[Project API] Get Project By ID',
  GET_ALL_PROJECT_DETAILS = '[Project API] Get All Project Details',
  GET_ALL_PROJECT_DETAILS_SUCCESS = '[Project API] Project Details List Loaded Success',
}

export const createProject = createAction(
  ProjectActionTypes.CREATE_PROJECT,
  props<{ createProjectRequest: CreateProjectRequest }>()
);

export const getProjectById = createAction(
  ProjectActionTypes.GET_PROJECT_BY_ID,
  props<{ projectId: number }>(),
);

export const getProjects = createAction(
  ProjectActionTypes.GET_ALL_PROJECT_DETAILS,
  props<{ projects: Project[] }>(),
);

export const getProjectsSuccess = createAction(
  ProjectActionTypes.GET_ALL_PROJECT_DETAILS_SUCCESS,
  props<{ payload: Project[] }>(),
);
