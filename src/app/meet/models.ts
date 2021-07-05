import { EMPTY_PERSONNEL, Personnel } from "../personnel/models";
import { EMPTY_PROJECT, Project } from "../project/models";

import { Type } from '@angular/core';
import { DateTime } from "luxon";

export class CreateMeetingItem {
  constructor(public component: Type<any>, public data: any) {}
}

export enum MeetingType {
  ProjectMeeting = 'Project Meeting',
  FreeFormMeeting = 'Free Form Meeting',
}

export interface Meeting {
  id?: number;
  name: string;
  year: number;
  month: string;
  day: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  // personnels?: Personnel[];
  // projects?: Project[];
  meetingItems?: MeetingItem[];
}

export interface CreateMeetingRequest {
  name: string;
  year: number;
  month: string;
  day: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

export interface CreateProjectMeetingRequest extends CreateMeetingRequest {
  projectIds: number[];
}

export interface CreateFreeFormMeetingRequest extends CreateMeetingRequest {
  personnelIds: number[];
}

export type AttendanceStatus = 'No Show' | 'Leave Early' | 'Join Late' | 'Not Attending' | 'Attending';

export interface MeetingAttendance {
  id?: number;
  personnel: Personnel;
  project: Project;
  plannedAttendanceStatus: AttendanceStatus;
  actualAttendanceStatus: AttendanceStatus;
  attendanceReason?: string;
}

export interface MeetingNote {
  id?: number;
  text: string;
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
]

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
}

export interface PresentMeetingItem {
  id: number;
  personnel: Personnel;
  project: Project;
  plannedAttendanceStatus: AttendanceStatus;
  actualAttendanceStatus: AttendanceStatus;
  attendanceReason?: string;
  notes?: MeetingNote[];
}

export const EMPTY_PRESENT_MEETING_ITEM: PresentMeetingItem = {
  id: 0,
  personnel: EMPTY_PERSONNEL,
  project: EMPTY_PROJECT,
  plannedAttendanceStatus: 'Attending',
  actualAttendanceStatus: 'Attending',
  attendanceReason: '',
}

export interface BaseMeetingView {
  name: string;
  year: number;
  month: string;
  day: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
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

export const EMPTY_PRESENT_MEETING: PresentMeetingView = {
  name: '',
  year: DateTime.now().year,
  month: DateTime.now().toFormat('MM'),
  day: DateTime.now().toFormat('dd'),
  startHour: DateTime.now().toFormat('hh'),
  startMinute: DateTime.now().toFormat('mm'),
  endHour: DateTime.now().toFormat('hh'),
  endMinute: DateTime.now().toFormat('mm'),
  meetingItems: [
    {
      id: 0,
      personnel: EMPTY_PERSONNEL,
      project: EMPTY_PROJECT,
      plannedAttendanceStatus: 'Attending',
      actualAttendanceStatus: 'Attending',
      attendanceReason: '',
      notes: [
        {
          text: '',
        },
      ]
    }
  ]
}

export interface PastMeetingView extends BaseMeetingView {

}

export interface UpdateMeetingNoteRequest {
  id: number;
  plannedAttendanceStatus: AttendanceStatus;
  actualAttendanceStatus: AttendanceStatus;
  attendanceReason: string;
}

export interface UpdateMeetingNoteResponse {
  id: number;
}
