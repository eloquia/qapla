import { createAction, props } from '@ngrx/store';
import { CreateProjectRequest, Project } from '../../project/models';

export const createProject = createAction(
  '[Project API] Create Project',
  props<{ createProjectRequest: CreateProjectRequest }>()
);

export const getProjectById = createAction(
  '[Project API] Get Project By ID',
  props<{ projectId: number }>(),
);

export const getProjects = createAction(
  '[Project API] Get All Project Details',
  props<{ projects: Project[] }>(),
);

export const getProjectsSuccess = createAction(
  '[Project API] Project Details List Loaded Success',
  props<{ payload: Project[] }>(),
);
