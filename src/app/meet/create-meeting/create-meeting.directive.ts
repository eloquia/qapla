import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCreateMeeting]'
})
export class CreateMeetingDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
