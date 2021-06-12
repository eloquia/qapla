import { Personnel } from "../personnel/models";
import { Project } from "../project/models";

export interface Meeting {
  id?: number;
  name: string;
  description: string;
  scheduledYear: number;
  scheduledMonth: number;
  scheduledDay: number;
  scheduledHour: number;
  scheduledMinute: number;
  plannedDurationMinutes: number;
  personnels?: Personnel[];
  projects?: Project[];
}

export enum AttendanceStatus {
  NO_SHOW = 'No Show',
  LEAVE_EARLY = 'Leave Early',
  JOIN_LATE = 'Join Late',
  NOT_ATTENDING = 'Not Attending',
  ATTENDING = 'Attending',
}

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
  meeting: Meeting;
  personnel: Personnel;
  project: Project;
  text: string;
}

/* ---------- Date Picker Models ---------- */
export interface DatePickerDay {
  displayValue: string;
  isToday: boolean;
  isSelectedDay: boolean;
}

// export const days: Day[] = [
//   {
//     displayValue: '',
//     value: 1,
//     fullName
//   }
// ]

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
