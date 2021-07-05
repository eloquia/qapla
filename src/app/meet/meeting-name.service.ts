import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { Personnel } from '../personnel/models';
import { Project } from '../project/models';

export interface MeetingNameParams {
  selectedPersonnel?: Personnel[];
  allPersonnel?: Personnel[];
  selectedProjects?: Project[];
  allProjects?: Project[];
  customName?: string;
}

/**
 * Service for handling meeting names
 */
@Injectable({
  providedIn: 'root'
})
export class MeetingNameService {

  constructor() { }

  /**
   * There are a few types of meeting names:
   * * Lab Meeting (all projects)
   * * Lab Meeting (all personnel)
   * * Project Meeting (one project)
   * * One-on-one Meeting (one person)
   * * Custom (user-defined)
   */
  public createName(meetingNameParams: MeetingNameParams): string {
    // custom name always overrides
    if (meetingNameParams.customName) {
      return meetingNameParams.customName;
    }

    // Check most restrictive cases first
    if (meetingNameParams.allProjects
          && meetingNameParams.selectedProjects
          && meetingNameParams.allProjects.length === meetingNameParams.selectedProjects.length) {
      return 'Lab Meeting';
    }

    if (meetingNameParams.allPersonnel
          && meetingNameParams.selectedPersonnel
          && meetingNameParams.allPersonnel.length === meetingNameParams.selectedPersonnel.length) {
      return 'Lab Meeting';
    }

    if (meetingNameParams.selectedProjects && meetingNameParams.selectedProjects.length === 1) {
      return `${meetingNameParams.selectedProjects[0].name} Meeting`;
    }

    if (meetingNameParams.selectedPersonnel && meetingNameParams.selectedPersonnel.length === 1) {
      return `One-on-one with ${meetingNameParams.selectedPersonnel[0].firstName}`;
    }

    return `Meeting at ${DateTime.now().toFormat('MMM dd, yyyy hh:mm')}`;
  }
}
