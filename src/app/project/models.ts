import { Personnel } from "../personnel/models";

export enum ProjectPriorityLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface CreateProjectRequest {
  name: string;
  description: string;
}

export interface CreateProjectResponse {
  id: number;
}

export interface ProjectNote {
  description: string;
  priority: ProjectPriorityLevel;
  assignees?: string[];
}

export const EMPTY_PROJECT_NOTE: ProjectNote = {
  description: '',
  priority: ProjectPriorityLevel.LOW,
  assignees: []
}

export interface Project {
  id: number;
  name: string;
  description: string;
  slug?: string;
  personnel?: Personnel[];
  assignedPersonnelIDs?: number[];
  // objectives: ProjectNote[];
}

export interface ProjectDetails {
  id: number;
  name: string;
  description: string;
  slug?: string;
  assignedPersonnel?: Personnel[];
  assignedPersonnelIDs?: number[];
  // objectives: ProjectNote[];
}

export interface ProjectListItem {
  id: number;
  name: string;
  slug: string;
  // personnel: {
  //   id: number;
  //   firstName: string;
  //   lastName: string;
  // }[];
  numPersonnel: number;
}

export const EMPTY_PROJECT: Project = {
  id: 0,
  name: '',
  description: '',
  // objectives: [EMPTY_PROJECT_NOTE],
}

export interface ProjectDetailView {
  name: string;
  description: string;
  objectives?: ProjectNote[];
  assignedPersonnel: Personnel[];
}
