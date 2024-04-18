import { Pipe, PipeTransform } from '@angular/core';
import {CourseDto} from "../../core/models/dtos/course-dto";

@Pipe({
  name: 'filterCourses',
  standalone: true
})
export class FilterCoursesPipe implements PipeTransform {

  transform(courses: CourseDto[], search: string): CourseDto[] {
    if (courses === undefined) return [];
    return courses.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
  }
}
