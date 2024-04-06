import {StudentDto} from "./dtos/student-dto";
import {MarkType} from "./enums/mark-type";

export interface EditMarkModel {
  studentDto: StudentDto
  markType: MarkType
}
