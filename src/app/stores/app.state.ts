import { IPersonnelState } from "./personnel/state";
import { IProjectState } from "./project/state";

export interface AppState {
  personnel: IPersonnelState;
  project: IProjectState;
}
