import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export interface IdText {
  id?: number;
  text: string;
  type: string;
}

@Component({
  selector: 'app-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrls: ['./dynamic-list.component.scss']
})
export class DynamicListComponent implements OnInit {

  @Input() topic: string = '';
  @Input() items: IdText[] = [];
  @Output() addItemEvent: EventEmitter<string> = new EventEmitter();
  @Output() removeItemEvent: EventEmitter<number> = new EventEmitter();

  showInput = false

  @HostBinding('attr.tabindex') tabindex = '0';
  @HostListener('blur', ['$event.target'])
  onBlur(): void {
    this.submitItem();
  }

  @HostListener('keyup', ['$event'])
  onEnter(e: any): void {
    if (e.code === 'Enter') {
      this.submitItem();
    }
  }

  dynamicListForm = this.formBuilder.group({
    newItem: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  public toggleInput(): void {
    this.showInput = !this.showInput
  }

  /**
   * Takes the value of the form and emits it to the parent
   */
  private submitItem(): void {
    const thing = this.dynamicListForm.get('newItem')?.value
    if (thing) {
      this.showInput = !this.showInput;
      this.addItemEvent.emit(thing);
      this.dynamicListForm.reset();
    }
  }

  public removeItem(id: number | undefined): void {
    if (id) {
      this.removeItemEvent.emit(id)
    }
  }

}
