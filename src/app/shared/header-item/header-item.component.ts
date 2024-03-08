import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatRipple} from "@angular/material/core";

@Component({
  selector: 'app-header-item',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    MatRipple
  ],
  templateUrl: './header-item.component.html',
  styleUrl: './header-item.component.css'
})
export class HeaderItemComponent {
  @Input({required: true}) title: string
  @Input({required: true}) route: string
}
