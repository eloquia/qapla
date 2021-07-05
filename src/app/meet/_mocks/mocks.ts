import { AttendanceStatus, Meeting } from "../models";

export const MOCK_PROJECT_MEETING_1: Meeting = {
  name: 'Mock Meeting 1',
  year: 2021,
  month: '04',
  day: '29',
  startHour: '15',
  startMinute: '00',
  endHour: '16',
  endMinute: '00',
  // notes: [
  //   {
  //     personnel: {
  //       id: -1,
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       goesBy: '"Always On Time"',
  //       middleName: '',
  //       email: 'john.doe@email.com',
  //       assignedProjects: [
  //         {
  //           id: -1,
  //           name: 'Mock Project',
  //           description: 'Project for testing mock data',
  //         },
  //       ],
  //     }, // end personnel
  //     expectedAttendanceStatus: AttendanceStatus.ATTENDING,
  //     attendanceStatusReason: 'Always shows up',
  //   },
  // ],
}
