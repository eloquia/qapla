import { Injectable } from '@angular/core';
import { MeetingNote, MeetingNoteInput } from './models/common';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor() { }

  public toInput(meetingNote: MeetingNote): MeetingNoteInput {
    return {
      id: meetingNote.id,
      text: meetingNote.text,
      author: `${meetingNote.authorId}`,
      about: `${meetingNote.aboutId}`,
      tags: meetingNote.tags,
    }
  }
}
