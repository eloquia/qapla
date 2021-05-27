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
}
