export interface Personnel {
  id: number;
  firstName: string;
  lastName: string;
  goesBy: string;
  middleName: string;
  email: string;
}

export interface CreatePersonnelRequest {
  firstName: string;
  lastName: string;
  goesBy?: string;
  middleName?: string;
  email: string;
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
