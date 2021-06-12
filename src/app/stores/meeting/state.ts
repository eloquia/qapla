import { DateTime } from "luxon";

export interface State {
  year: number;
  month: number;
  day: number;
}

export const initialState: State = {
  year: DateTime.now().year,
  month: DateTime.now().month,
  day: DateTime.now().day,
}
