import { createSelector, createFeatureSelector } from "@ngrx/store";
import { DateTime } from "luxon";

import { Meeting } from "src/app/meet/models/common";
import { MeetingState } from "./state";

export const selectMeetings = createSelector(
  (state: MeetingState) => state.meetings,
  (date: DateTime) => date,
);

export const selectMeetingState = createFeatureSelector<
  MeetingState,
  ReadonlyArray<Meeting[]>
>("meetings");
