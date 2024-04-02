import {CourseStatus} from "../../core/models/enums/course-statuses";
import {Semester} from "../../core/models/enums/semester";

export function getCourseStatusName(courseStatus: CourseStatus): string {
  switch (courseStatus) {
    case CourseStatus.Created:
      return "Создан";
    case CourseStatus.OpenForAssigning:
      return "Открыт для записи";
    case CourseStatus.Started:
      return "В процессе обучения";
    case CourseStatus.Finished:
      return "Закрыт";
    default:
      return "Неизвестный";
  }
}

export function getCourseStatusColor(courseStatus: CourseStatus): string {
  switch (courseStatus) {
    case CourseStatus.Created:
      return "#ff4081"
    case CourseStatus.OpenForAssigning:
      return "#8BC34A";
    case CourseStatus.Started:
      return "#3f51b5";
    case CourseStatus.Finished:
      return "#f44336";
  }
}

export function getSemesterName(semester: Semester): string {
  switch (semester) {
    case Semester.Autumn:
      return "Осенний";
    case Semester.Spring:
      return "Весенний";
    default:
      return "Неизвестный";
  }
}
