import {Component, OnDestroy, OnInit} from "@angular/core";
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {MatToolbar} from "@angular/material/toolbar";
import {UserService} from "../../core/services/user.service";
import {Subscription} from "rxjs";
import {MatRipple} from "@angular/material/core";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {UserClaim} from "../../core/models/user-claim";
import {HeaderItem, HeaderItemPosition} from "../../core/models/header-item";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatTabNav,
    MatTabLink,
    MatTabNavPanel,
    MatToolbar,
    RouterLink,
    MatRipple,
    RouterLinkActive,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatIconButton,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  readonly headerItems: HeaderItem[]
  claims: UserClaim[]
  userEmail: string
  subscription: Subscription


  constructor(
    private userService: UserService
  ) {
    this.headerItems =
      [
        {route: "groups", title: "Группы курсов", position: HeaderItemPosition.LEFT, claims: [UserClaim.AUTH]},
        {route: "", title: "Мои курсы", position: HeaderItemPosition.LEFT, claims: [UserClaim.STUDENT, UserClaim.AUTH]},
        {route: "", title: "", position: "", claims: []},
        {route: "", title: "", position: "", claims: []},
        {route: "", title: "", position: "", claims: []},
        {route: "", title: "", position: "", claims: []},
      ];
  }

  ngOnInit(): void {
    this.subscription = this.userService.userRoles$.subscribe(
      {
        next: (claims: UserClaim[]) => this.claims = claims,
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
