import { Type } from '@angular/core';
import { MeetingItem, MeetingNote, MeetingNoteInput } from './common';

/* ---------- Create Meeting ---------- */

export class CreateMeetingItem {
  constructor(public component: Type<any>, public data: any) {}
}

export interface CreateMeetingRequest {
  type: string;
  meetingData: {
    name: string;
    startDate: string;
    endDate?: string;
    createdBy: number;
    durationMinutes: number;
    projectIds?: string[];
    personnelIds?: string[];
  }
}

export interface CreateProjectMeetingData {
  name: string;
  startDate: string;
  createdBy?: number;
  durationMinutes: number;
  projectIds?: string[];
  personnelIds?: string[];
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
  name?: string;
  people?: string[];
  startTime: string;
  durationMinutes: number;
  meetingItems?: MeetingItem[];
}

export interface UpdateMeetingItemRequest {
  id: string;
  personnelID: string;
  plannedAttendanceStatus: string;
  actualAttendanceStatus: string;
  attendanceReason: string;
  notes: MeetingNoteInput[];
}

export interface UpdateMeetingItemRequestWrapper {
  type: string;
  payload: UpdateMeetingItemRequest;
}

export interface UpdateMeetingItemResponse {
  id: string;
}

export interface UpdateMeetingNoteRequest {
  id: number;
  plannedAttendanceStatus: string;
  actualAttendanceStatus: string;
  attendanceReason: string;
  notes?: MeetingNote[];
}
