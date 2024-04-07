import {StudentMarks} from "../enums/student-marks";
import {MarkType} from "../enums/mark-type";

export interface EditCourseStudentMarkDto {
  mark: StudentMarks
  markType: MarkType
}
