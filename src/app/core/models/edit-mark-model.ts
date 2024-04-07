import {StudentDto} from "./dtos/student-dto";
import {MarkType} from "./enums/mark-type";
import {StudentMarks} from "./enums/student-marks";

export interface EditMarkModel {
  studentName: string
  markType: MarkType
  mark: StudentMarks
}
