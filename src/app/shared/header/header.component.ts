import {Component} from "@angular/core";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeLink: String = 'Кампусные курсы';
}
