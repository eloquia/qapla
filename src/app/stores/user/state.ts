import { UserSettings } from "src/app/user/models";

export interface IUserState {
  settings: UserSettings;
}

export const initialUserState: IUserState = {
  settings: {}
}