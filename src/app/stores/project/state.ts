import { Project } from "src/app/project/models";

export interface State {
  projects: Project[];
}

export const initialState: State = {
  projects: [],
};
