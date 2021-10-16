import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPersonnelState } from "./state";

export const personnelFeatureKey = 'personnel';

export const selectPersonnelFeature = createFeatureSelector<IPersonnelState>(personnelFeatureKey);

export const selectPersonnelList = createSelector(
  selectPersonnelFeature,
  personnelState => personnelState.personnelList
);
