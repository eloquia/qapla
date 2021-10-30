import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent {

  @Input() displayValue: string = '';
  isEditing = false;

  constructor() { }

  public toggleEditMode(input: boolean): void {
    this.isEditing = input;
  }

  public focusout(): void {
    console.log('focus out!');
  }

}
