import { DateTime } from 'luxon';
import { Meeting } from 'src/app/meet/models/common';

export interface MeetingState {
  meetings: ReadonlyArray<Meeting[]>;
  date: DateTime;
}

export const initialState: MeetingState = {
  date: DateTime.now(),
  meetings: [],
}
