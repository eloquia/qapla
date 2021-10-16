import { DateTime } from 'luxon';
import { EMPTY_PERSONNEL, Personnel } from 'src/app/personnel/models';
import { EMPTY_PROJECT, Project } from 'src/app/project/models';

export type MeetingType = 'Project Meeting' | 'Free Form Meeting';

// "Mon Jan 02 2006 15:04:05 GMT-0700"
// 'ccc MMM dd yyyy HH:mm:ss'
export const GOLANG_MEETING_FORMAT = 'ccc MMM dd yyyy HH:mm:ss';

export interface Meeting {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  // personnels?: Personnel[];
  // projects?: Project[];
  meetingItems?: MeetingItem[];
}

export interface DisplayedMeeting {
  id: number;
  name: string;
  startDate: number;
  endDate: string;
  // personnels?: Personnel[];
  // projects?: Project[];
  meetingItems?: MeetingItem[];
}

export interface MeetingAttendance {
  id?: number;
  personnel: Personnel;
  project: Project;
  plannedAttendanceStatus: AttendanceStatus;
  actualAttendanceStatus: AttendanceStatus;
  attendanceReason?: string;
}

/* ---------- Date Picker Models ---------- */
export interface DatePickerDay {
  displayValue: string;
  isToday: boolean;
  isSelectedDay: boolean;
}

export interface Month {
  displayValue: string;
  value: number;
}

export const months: Month[] = [
  {
    displayValue: 'Jan',
    value: 1,
  },
  {
    displayValue: 'Feb',
    value: 2,
  },
  {
    displayValue: 'Mar',
    value: 3,
  },
  {
    displayValue: 'Apr',
    value: 4,
  },
  {
    displayValue: 'May',
    value: 5,
  },
  {
    displayValue: 'Jun',
    value: 6,
  },
  {
    displayValue: 'Jul',
    value: 7,
  },
  {
    displayValue: 'Aug',
    value: 8,
  },
  {
    displayValue: 'Sep',
    value: 9,
  },
  {
    displayValue: 'Oct',
    value: 10,
  },
  {
    displayValue: 'Nov',
    value: 11,
  },
  {
    displayValue: 'Dec',
    value: 12,
  },
];

export type AttendanceStatus =
  | 'No Show'
  | 'Leave Early'
  | 'Join Late'
  | 'Not Attending'
  | 'Attending';

export interface Author {
  id: number;
  firstName: string;
}

export interface MeetingNoteTag {
  id?: number;
  text: string;
}

export const EMPTY_MEETING_NOTE_TAG: MeetingNoteTag = {
  text: '',
}

export interface MeetingNote {
  id?: number;
  text: string;
  authorId: number;
  authorName?: string;
  aboutId: number;
  meetingNoteTag: MeetingNoteTag;
  tags?: MeetingNoteTag[];
}

export const EMPTY_MEETING_NOTE: MeetingNote = {
  text: '',
  authorId: 0,
  aboutId: 0,
  meetingNoteTag: EMPTY_MEETING_NOTE_TAG,
}

/* ---------- Meeting View Models ---------- */
export enum MeetingViewType {
  PAST = 'Past',
  PRESENT = 'Present',
  FUTURE = 'Future',
}

/**
 * Describes everything that
 */
export interface MeetingItem {
  id: number;
  personnel: Personnel;
  project: Project;
  plannedAttendanceStatus: AttendanceStatus;
  actualAttendanceStatus: AttendanceStatus;
  attendanceReason?: string;
  notes?: MeetingNote[];
  othersNotes?: MeetingNote[];
}

export interface PresentMeetingItem extends MeetingItem {
  id: number;
  personnel: Personnel;
  project: Project;
  plannedAttendanceStatus: AttendanceStatus;
  actualAttendanceStatus: AttendanceStatus;
  attendanceReason?: string;
  notes?: MeetingNote[];
}

export interface BaseMeetingView {
  name: string;
  startDate: string;
  endDate: string;
}

/**
 * For meetings that happen in the future,
 */
export interface FutureMeetingView extends BaseMeetingView {
  items: MeetingItem[];
}

export interface PresentMeetingView extends BaseMeetingView {
  meetingItems?: PresentMeetingItem[];
}

export interface PastMeetingView extends BaseMeetingView {}

/* ---------- Note Models ---------- */

export interface OtherMeetingNote {
  id: number;
  text: string;
  tag: string;
  author: string;
}

const MOCK_MEETING_NOTE_1: OtherMeetingNote = {
  id: 1,
  text: 'Good job today, great findings.',
  tag: 'Positive',
  author: 'Mara',
};

const MOCK_MEETING_NOTE_2: OtherMeetingNote = {
  id: 2,
  text: 'Lol what am I doing here?',
  tag: 'Misc',
  author: 'Dale',
};

const MOCK_MEETING_NOTE_3: OtherMeetingNote = {
  id: 3,
  text: "Look at me, I'm the Gordon Ramsay of reviewing students. Needs more improvement.",
  tag: 'Not so good',
  author: 'Faizan',
};

export const MOCK_MEETING_NOTE_COLLECTION_1: OtherMeetingNote[] = [
  MOCK_MEETING_NOTE_1,
];

export const MOCK_MEETING_NOTE_COLLECTION_2: OtherMeetingNote[] = [
  MOCK_MEETING_NOTE_1,
  MOCK_MEETING_NOTE_2,
];

export const MOCK_MEETING_NOTE_COLLECTION_3: OtherMeetingNote[] = [
  MOCK_MEETING_NOTE_1,
  MOCK_MEETING_NOTE_2,
  MOCK_MEETING_NOTE_3,
];

export const MOCK_PERSONNEL_1: Personnel = {
  id: 999,
  firstName: 'John',
  lastName: 'Doe',
  name: 'John Doe',
  goesBy: 'John',
  middleName: '',
  email: 'john.doe@gmail.com',
  gender: 'M',
  assignedProjects: []
}

export const MOCK_PROJECT_1: Project = {
  id: 999,
  name: 'Mock Interceptor Project',
  description: 'A project mocked for test purposes',
  slug: 'mock-project',
  personnel: [
    MOCK_PERSONNEL_1,
  ],
}

export const EMPTY_MEETING: Meeting = {
  id: 0,
  name: 'Test Meeting',
  startDate: '',
  endDate: '',
  meetingItems: [],
};

export const MOCK_MEETING_1: Meeting = {
  id: -999,
  name: 'Mock Meeting',
  startDate: DateTime.now().toISO(),
  endDate: DateTime.now().toISO(),
  meetingItems: [
    {
      id: -998,
      personnel: MOCK_PERSONNEL_1,
      project: MOCK_PROJECT_1,
      plannedAttendanceStatus: 'Attending',
      actualAttendanceStatus: 'Attending',
      attendanceReason: 'Made up reason',
    }
  ],
}

/*

*/
export interface SearchResult {
  id: number;
  text: string;
}
