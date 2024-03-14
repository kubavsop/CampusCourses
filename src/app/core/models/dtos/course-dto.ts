import {CourseStatus} from "../enums/course-statuses";
import {Semester} from "../enums/semester";

export interface CourseDto {
  id: string
  name: string
  startYear: number
  maximumStudentsCount: number
  remainingSlotsCount?: number
  status: CourseStatus
  semester: Semester
}
