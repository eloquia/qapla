import { createSelector, createFeatureSelector } from "@ngrx/store";

import { IMeetingState } from "./state";

export const meetingFeatureKey = 'meeting';

export const selectMeetingFeature = createFeatureSelector<IMeetingState>(meetingFeatureKey);

export const selectMeetings = createSelector(
  selectMeetingFeature,
  meetingState => meetingState.meetingsByDate
);
