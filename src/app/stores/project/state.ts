import { Project } from "src/app/project/models";

export interface IProjectState {
  projects: Project[];
}

export const initialProjectState: IProjectState = {
  projects: [],
};
