import {CourseDto} from "./course-dto";
import {NotificationDto} from "./notification-dto";
import {TeacherDto} from "./teacher-dto";
import {StudentDto} from "./student-dto";

export interface CourseDetailsDto extends CourseDto {
  studentsEnrolledCount: number
  studentsInQueueCount: number
  requirements: string
  annotations: string
  students: StudentDto[]
  teachers: TeacherDto[]
  notifications: NotificationDto[]
}
