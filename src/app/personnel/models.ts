import { EMPTY_PROJECT, Project } from "../project/models";

export interface PersonnelNote {
  id?: number;
  text: string;
  type: string;
}

export const EMTPY_PERSONNEL_NOTE: PersonnelNote = {
  id: 0,
  text: '',
  type: '',
}

export interface DisplayedPersonnel {
  id: number;
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
  assignedProjects: Project[];
  goals: PersonnelNote[];
  experiences: PersonnelNote[];
  likes: PersonnelNote[];
}

export interface Personnel {
  id: number;
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
  assignedProjects: Project[];
  notes: PersonnelNote[];
}

export const EMPTY_PERSONNEL: DisplayedPersonnel = {
  id: 0,
  firstName: '',
  lastName: '',
  goesBy: '',
  middleName: '',
  email: '',
  gender: '',
  ethnicity: '',
  position: '',
  institution: '',
  isActive: false,
  assignedProjects: [EMPTY_PROJECT],
  goals: [EMTPY_PERSONNEL_NOTE],
  experiences: [EMTPY_PERSONNEL_NOTE],
  likes: [EMTPY_PERSONNEL_NOTE],
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
  id: number;
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
  notes?: PersonnelNote[];
}

/*

*/

export interface PersonnelRecentActivity {
  points: number[];
  values: number[];
}
