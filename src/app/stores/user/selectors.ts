import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUserState } from "./state";

export const userFeatureKey = 'user';

export const selectUserFeature = createFeatureSelector<IUserState>(userFeatureKey);

export const selectUserSettings = createSelector(
  selectUserFeature,
  userState => userState.settings
);
