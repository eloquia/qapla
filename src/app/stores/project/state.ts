import { Project } from "src/app/project/models";

export interface IProjectState {
  projectDetailsList: Project[];
}

export const initialProjectState: IProjectState = {
  projectDetailsList: [],
};
