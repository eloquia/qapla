import { Action, createReducer, on } from "@ngrx/store";

import { initialState, State } from "./state";
import * as ProjectActions from './actions';

const projectdReducer = createReducer(
  initialState,
  on(ProjectActions.createProject, state => (state, { project }) => ({ home: game.home, away: game.away })),
);

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
