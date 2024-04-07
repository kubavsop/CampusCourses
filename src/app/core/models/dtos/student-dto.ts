import {StudentStatuses} from "../enums/student-statuses";
import {StudentMarks} from "../enums/student-marks";

export interface StudentDto {
  id: string
  name: string
  email: string
  status: StudentStatuses
  midtermResult: StudentMarks
  finalResult: StudentMarks
}
