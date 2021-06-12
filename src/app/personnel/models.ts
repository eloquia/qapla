import { Project } from "../project/models";

export interface Personnel {
  personnelID: number;
  firstName: string;
  lastName: string;
  goesBy: string;
  middleName: string;
  email: string;
  gender?: string;
  ethnicity?: string;
  position?: string;
  institution?: string;
  isActive?: boolean;
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
  isActive?: boolean;
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
  goesBy?: string;
  middleName?: string;
  email: string;
  gender?: string;
  ethnicity?: string;
  position?: string;
  institution?: string;
  isActive?: boolean;
  assignedProjectIDs?: number[];
}

/*

*/

export interface PersonnelRecentActivity {
  points: number[];
  values: number[];
}
