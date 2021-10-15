import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateProjectRequest, CreateProjectResponse } from '../models';

@Injectable()
export class CreateProjectService {
  constructor(
    private apollo: Apollo,
  ) {}

  public createProject(createProjectRequest: CreateProjectRequest) {
    console.log('createProjectRequest', createProjectRequest)
    return this.apollo.mutate<CreateProjectResponse>({
      mutation: gql`
        mutation createProject {
          createProject(input: {
            name: "${createProjectRequest.name}",
            description: "${createProjectRequest.description}"
          }) {
            id
          }
        }
      `
    }).pipe(
      map(a => {
        return a.data;
      })
    );
  }
}
