import { Type } from '@angular/core';
import { MeetingItem, MeetingNote } from './common';

/* ---------- Create Meeting ---------- */

export class CreateMeetingItem {
  constructor(public component: Type<any>, public data: any) {}
}

export interface CreateMeetingRequest {
  name: string;
  startDate: string;
  endDate?: string;
  createdBy: number;
  durationMinutes: number;
}

export interface CreateProjectMeetingData {
  name: string;
  startDate: string;
  createdBy?: number;
  durationMinutes: number;
  projectIds: string[];
}

export interface CreateProjectMeetingRequest {
  type: string;
  createProjectMeetingRequest: CreateProjectMeetingData;
}

export interface CreatePeopleMeetingData {
  name: string;
  startDate: string;
  createdBy?: number;
  durationMinutes: number;
  personnelIds: string[];
}

export interface CreatePeopleMeetingRequest {
  type: string;
  createPeopleMeetingRequest: CreatePeopleMeetingData
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
