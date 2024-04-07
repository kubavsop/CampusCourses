import {CourseStatus} from "../../core/models/enums/course-statuses";
import {Semester} from "../../core/models/enums/semester";
import {StudentStatuses} from "../../core/models/enums/student-statuses";
import {StudentMarks} from "../../core/models/enums/student-marks";

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
      return "var(--created-color)"
    case CourseStatus.OpenForAssigning:
      return "var(--open-color)";
    case CourseStatus.Started:
      return "var(--started-color)";
    case CourseStatus.Finished:
      return "var(--finished-color)";
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

export function getStudentStatusColor(status: StudentStatuses): string {
  switch (status) {
    case StudentStatuses.InQueue:
      return "var(--in-queue-color)"
    case StudentStatuses.Accepted:
      return "var(--accepted-color)"
    case StudentStatuses.Declined:
      return "var(--declined-color)"
  }
}

export function getStudentMarkName(studentMark: StudentMarks): string {
  switch (studentMark) {
    case StudentMarks.NotDefined:
      return "отметки нет";
    case StudentMarks.Passed:
      return "пройдена";
    case StudentMarks.Failed:
      return "зафейлена";
  }
}

export function getStudentMarkColor(studentMark: StudentMarks): string {
  switch (studentMark) {
    case StudentMarks.NotDefined:
      return "var(--not-defined-color)";
    case StudentMarks.Passed:
      return "var(--passed-color)";
    case StudentMarks.Failed:
      return "var(--failed-color)";
  }
}

export function getStudentStatusName(status: StudentStatuses): string {
  switch (status) {
    case StudentStatuses.InQueue:
      return "в очереди"
    case StudentStatuses.Accepted:
      return "принят в группу"
    case StudentStatuses.Declined:
      return "отклонен"
  }
}
