import { Personnel } from "src/app/personnel/models";

export interface IPersonnelState {
  personnelList: Personnel[];
}

export const initialPersonnelState: IPersonnelState = {
  personnelList: [],
};
