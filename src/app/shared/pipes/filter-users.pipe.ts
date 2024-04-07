import { Pipe, PipeTransform } from '@angular/core';
import {UserDto} from "../../core/models/dtos/user-dto";

@Pipe({
  name: 'filterUsers',
  standalone: true
})
export class FilterUsersPipe implements PipeTransform {
  transform(users: UserDto[], search: string): UserDto[] {
    if (users === undefined) return [];
    return users.filter(u => u.fullName.toLowerCase().includes(search.toLowerCase()));
  }
}
