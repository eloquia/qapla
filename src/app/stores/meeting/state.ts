import { Meeting } from 'src/app/meet/models/common';

export interface IMeetingState {
  meetingsByDate: Meeting[];
}

export const initialMeetingState: IMeetingState = {
  meetingsByDate: [],
}
