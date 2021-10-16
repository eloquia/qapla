import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProjectState } from "./state";

export const projectFeatureKey = 'project';

export const selectProjectFeature = createFeatureSelector<IProjectState>(projectFeatureKey);

export const selectProjectList = createSelector(
  selectProjectFeature,
  projectState => projectState.projectDetailsList
);
