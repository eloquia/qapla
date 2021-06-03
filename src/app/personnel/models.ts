import { Project } from "../project/models";

export interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
  goesBy: string;
  middleName: string;
  email: string;
  projects: Project[];
}

export interface CreatePersonnelRequest {
  firstName: string;
  lastName: string;
  goesBy?: string;
  middleName?: string;
  email: string;
  gender?: string;
  ethnicity?: string;
  position?: string;
  institution?: string;
  assignedProjectIDs?: number[];
}

export interface CreatePersonnelResponse {

}

export interface DeletePersonnelRequest {
  id: number;
}

export interface UpdatePersonnelRequest {
  firstName: string;
  lastName: string;
  goesBy: string;
  middleName: string;
  email: string;
}

/*

*/

export interface PersonnelRecentActivity {
  points: number[];
  values: number[];
}
