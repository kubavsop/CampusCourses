import { Pipe, PipeTransform } from '@angular/core';
import {GroupDto} from "../../core/models/dtos/group-dto";

@Pipe({
  name: 'filterGroups',
  standalone: true
})
export class FilterGroupsPipe implements PipeTransform {

  transform(groups: GroupDto[], search: string): GroupDto[] {
    if (groups === undefined) return [];
    return groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));
  }
}
