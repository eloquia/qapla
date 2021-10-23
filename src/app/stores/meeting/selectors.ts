import { createSelector, createFeatureSelector } from "@ngrx/store";

import { IMeetingState } from "./state";

export const meetingFeatureKey = 'meeting';

export const selectMeetingFeature = createFeatureSelector<IMeetingState>(meetingFeatureKey);

export const selectMeetings = createSelector(
  selectMeetingFeature,
  meetingState => meetingState.meetingsByDate
);

export const selectTags = createSelector(
  selectMeetingFeature,
  meetingState => meetingState.tags
);

export const selectDateString = createSelector(
  selectMeetingFeature,
  meetingState => meetingState.selectedDateString
);
