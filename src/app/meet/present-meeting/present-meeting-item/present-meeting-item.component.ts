import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MeetService } from '../../meet.service';
import { EMPTY_PRESENT_MEETING_ITEM, MeetingNote, PresentMeetingItem, UpdateMeetingNoteRequest } from '../../models';

@Component({
  selector: 'app-present-meeting-item',
  templateUrl: './present-meeting-item.component.html',
  styleUrls: ['./present-meeting-item.component.scss']
})
export class PresentMeetingItemComponent implements OnInit, OnDestroy {

  itemForm = this.formBuilder.group({
    plannedAttendance: [''],
    actualAttendance: [''],
    attendanceReason: [''],
    notes: this.formBuilder.array([]),
  });

  isInputOpen: boolean = false;

  reason: string | undefined = ''

  @Input()
  showProjectName: boolean = false;

  @Input()
  meetingItem: PresentMeetingItem = EMPTY_PRESENT_MEETING_ITEM;

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetService,
  ) { }

  ngOnInit(): void {
    this.reason = this.meetingItem.attendanceReason;
    this.itemForm.setControl('attendanceReason', new FormControl(this.meetingItem.attendanceReason));
    this.itemForm.setControl('plannedAttendance', new FormControl(this.meetingItem.plannedAttendanceStatus));
    this.itemForm.setControl('actualAttendance', new FormControl(this.meetingItem.actualAttendanceStatus));
    if (this.meetingItem.notes) {
      this.itemForm.setControl('notes', this.formBuilder.array(this.meetingItem.notes.map(note => new FormControl(note))));
    } else {
      this.itemForm.setControl('notes', this.formBuilder.array([
        this.formBuilder.control(''),
      ]));
    }
  }

  ngOnDestroy(): void {
    this.updateMeetingNote();
  }

  public get notes() {
    return this.itemForm.get('notes') as FormArray;
  }

  public handlePlannedAttendanceStatusChange(input: string): void {
    this.itemForm.controls.plannedAttendance.patchValue(input);
  }

  public handleActualAttendanceStatusChange(input: string): void {
    this.itemForm.controls.actualAttendance.patchValue(input);
  }

  public handleReasonChange($event: any): void {
    this.itemForm.get('attendanceReason')?.setValue($event.target.value);
  }

  public removeNoteByIndex(note: any): void {
    console.log('removeNoteByIndex', note);
    const originalNotes: MeetingNote[] = JSON.parse(JSON.stringify(this.notes));
    const notInPlace = originalNotes.splice(note, 1);
    console.log('notInPlace', notInPlace);
    // this.notes = originalNotes.filter(originalNote => originalNote !== note);
  }

  public addNoteFormControl(): void {
    const last = this.notes.get(`${this.notes.length - 1}`);
    // only add another note if the previous one is not full
    if (last && last.value) {
      this.notes.push(this.formBuilder.control(''));
    }
  }

  public finish(): void {
    const things = this.itemForm.get('notes')?.value;
    console.log('things', things);
  }

  private updateMeetingNote(): void {
    const updateRequest: UpdateMeetingNoteRequest = {
      id: this.meetingItem.id,
      plannedAttendanceStatus: this.itemForm.get('plannedAttendance')?.value,
      actualAttendanceStatus: this.itemForm.get('actualAttendance')?.value,
      attendanceReason: this.itemForm.get('attendanceReason')?.value,
    };
    this.meetingService.updateMeetingNote(updateRequest);
  }

}
