import { Personnel } from "../personnel/models";

export interface CreateProjectRequest {
  name: string;
  description: string;
}

export interface CreateProjectResponse {

}

export interface Project {
  id: number;
  name: string;
  description: string;
  slug?: string;
  assignedPersonnel?: Personnel[];
  assignedPersonnelIDs?: number[];
}

export const EMPTY_PROJECT: Project = {
  id: 0,
  name: '',
  description: '',
}

export interface ProjectNote {
  description: string;
  isHighPriority: boolean;
  assignees: string[];
}

export interface ProjectDetailView {
  name: string;
  description: string;
  objectives?: ProjectNote[];
  assignedPersonnel: Personnel[];
}
