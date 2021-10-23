import { DateTime } from 'luxon';
import { Meeting, MeetingNoteTag } from 'src/app/meet/models/common';

export interface IMeetingState {
  meetingsByDate: Meeting[];
  tags: MeetingNoteTag[];
  selectedDateString: string;
}

export const initialMeetingState: IMeetingState = {
  meetingsByDate: [],
  tags: [],
  selectedDateString: DateTime.now().toISO(),
}
