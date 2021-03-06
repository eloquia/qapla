import { Action, createReducer, on } from "@ngrx/store";

import { initialProjectState, IProjectState } from "./state";
import * as ProjectActions from './actions';

const _projectReducer = createReducer(
  initialProjectState,
  on(ProjectActions.getProjectsSuccess, (state, { payload }) => ({ ...state, projectDetailsList: payload })),
);

export function projectReducer(state: IProjectState | undefined, action: Action) {
  return _projectReducer(state, action);
}
