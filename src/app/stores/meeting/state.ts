import { Meeting, MeetingNoteTag } from 'src/app/meet/models/common';

export interface IMeetingState {
  meetingsByDate: Meeting[];
  tags: MeetingNoteTag[];
}

export const initialMeetingState: IMeetingState = {
  meetingsByDate: [],
  tags: [],
}
