import {Semester} from "../enums/semester";

export interface CreateCourseDto {
  name: string
  startYear: number
  maximumStudentsCount: number
  semester: Semester
  requirements: string
  annotations: string
  mainTeacherId: string
}
