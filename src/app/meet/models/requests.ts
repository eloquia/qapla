import { Type } from '@angular/core';
import { AttendanceStatus, MeetingItem, MeetingNote } from './common';

/* ---------- Create Meeting ---------- */

export class CreateMeetingItem {
  constructor(public component: Type<any>, public data: any) {}
}

export interface CreateMeetingRequest {
  name: string;
  startDate: string;
  endDate: string;
  createdBy: number;
}

export interface CreateProjectMeetingRequest extends CreateMeetingRequest {
  projectIds: number[];
}

export interface CreateFreeFormMeetingRequest extends CreateMeetingRequest {
  personnelIds: number[];
}

/* ---------- Update Meeting ---------- */

export interface UpdateMeetingRequest {
  id: number;
  meetingItems?: MeetingItem[];
}

export interface UpdateMeetingNoteRequest {
  id: number;
  plannedAttendanceStatus: string;
  actualAttendanceStatus: string;
  attendanceReason: string;
  notes?: MeetingNote[];
}
