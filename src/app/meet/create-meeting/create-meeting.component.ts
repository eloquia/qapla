import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnel } from 'src/app/personnel/models';

import { PersonnelService } from 'src/app/personnel/personnel.service';
import { Project } from 'src/app/project/models';
import { ProjectService } from 'src/app/project/project.service';

import { MeetingType } from '../models';
import { CreateFreeFormMeetingComponent } from './create-free-form-meeting/create-free-form-meeting.component';
import { CreateMeetingDirective } from './create-meeting.directive';
import { CreateProjectMeetingComponent } from './create-project-meeting/create-project-meeting.component';

/**
 * https://github.com/danmt/dynamic-component-loader
 */
@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.scss']
})
export class CreateMeetingComponent implements OnInit {

  displayedCreateMeeting: MeetingType = MeetingType.ProjectMeeting;

  @ViewChild(CreateMeetingDirective, {static: true})
  createMeetingHost!: CreateMeetingDirective;

  showForm: boolean = false;

  projects: Observable<Project[]> = this.projectService.projects$;
  personnels: Observable<Personnel[]> = this.personnelService.personnel$;

  constructor(
    private personnelService: PersonnelService,
    private projectService: ProjectService,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    this.toggleProjectMeeting();
  }

  public toggleFreeFormMeeting(): void {
    this.displayedCreateMeeting = MeetingType.FreeFormMeeting;
    this.projectService.getAllProjects();
    this.personnelService.getAllPersonnel();
    this.createMeetingHost.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CreateFreeFormMeetingComponent)
    this.createMeetingHost.viewContainerRef.createComponent(componentFactory);
  }

  public toggleProjectMeeting(): void {
    this.displayedCreateMeeting = MeetingType.ProjectMeeting;
    this.projectService.getAllProjects();
    this.createMeetingHost.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CreateProjectMeetingComponent)
    this.createMeetingHost.viewContainerRef.createComponent(componentFactory);
  }

}
