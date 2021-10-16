import { Meeting } from 'src/app/meet/models/common';

export interface IMeetingState {
  meetingsbyDate: Meeting[];
}

export const initialMeetingState: IMeetingState = {
  meetingsbyDate: [],
}
