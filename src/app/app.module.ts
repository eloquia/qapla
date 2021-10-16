import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { meetingReducer } from './stores/meeting/reducers';
import { MockMeetingDataService } from './core/interceptors/mock-meeting-data.service';
import { GraphQLModule } from './graphql.module';
import { projectReducer } from './stores/project/reducer';
import { PersonnelEffects } from './stores/personnel/effects';
import { personnelReducer } from './stores/personnel/reducers';
import { ProjectEffects } from './stores/project/effects';

@NgModule({
  declarations: [AppComponent, LoginComponent, LogoutComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      meetings: meetingReducer,
      project: projectReducer,
      personnel: personnelReducer,
    },
    {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true
      },
    }),
    EffectsModule.forRoot([
      PersonnelEffects,
      ProjectEffects,
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    AppRoutingModule,
    GraphQLModule,
  ],
  exports: [
    CoreModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockMeetingDataService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
