import {Semester} from "../enums/semester";

export interface ActionCourseDto {
  name: string
  startYear: number
  maximumStudentsCount: number
  semester: Semester
  requirements: string
  annotations: string
  mainTeacherId: string
}
