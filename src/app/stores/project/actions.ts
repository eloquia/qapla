import { createAction, props } from '@ngrx/store';
import { CreateProjectRequest, Project } from '../../project/models';

export const createProject = createAction(
  '[Project] Create Project',
  props<{ createProjectRequest: CreateProjectRequest }>()
);

export const getProjectById = createAction(
  '[Project] Get Project By ID',
  props<{ projectId: number }>(),
);

export const getProjects = createAction(
  '[Project] Get All Projects',
  props<{ projects: Project[] }>(),
);
