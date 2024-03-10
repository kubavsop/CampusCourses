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
  leftItems: HeaderItem[]
  rightItems: HeaderItem[]
  menuItems: HeaderItem[]
  subscription: Subscription


  constructor(
    private userService: UserService
  ) {
    this.headerItems =
      [
        {id: 1, route: "groups", title: "Группы курсов", position: HeaderItemPosition.LEFT, claims: [UserClaim.AUTH]},
        {id: 2, route: "courses/my", title: "Мои курсы", position: HeaderItemPosition.LEFT, claims: [UserClaim.STUDENT, UserClaim.AUTH]},
        {id: 3, route: "courses/teaching", title: "Преподаваемые курсы", position: HeaderItemPosition.LEFT, claims: [UserClaim.STUDENT, UserClaim.AUTH]},
        {id: 4, route: "profile", position: HeaderItemPosition.RIGHT, claims: [UserClaim.AUTH]},
        {id: 5, title: "Выход", action: this.logout, position: HeaderItemPosition.RIGHT, claims: [UserClaim.AUTH]},
        {id: 6, route: "registration", title: "Регистрация", position: HeaderItemPosition.RIGHT, claims: [UserClaim.NOT_AUTH]},
        {id: 7, route: "login", title: "Вход", position: HeaderItemPosition.RIGHT, claims: [UserClaim.NOT_AUTH]}
      ];
  }

  ngOnInit(): void {
    this.subscription = this.userService.userRoles$.subscribe({
        next: (claims: UserClaim[]) => {
          this.menuItems = this.headerItems.filter(item => {
            return this.checkUserClaims(item.claims, claims);
          })

          this.leftItems = this.menuItems.filter(item => {
            return item.position == HeaderItemPosition.LEFT;
          })

          this.rightItems = this.menuItems.filter(item => {
            return item.position == HeaderItemPosition.RIGHT;
          })
        },
      });
  }

  private logout(){

  }

  private checkUserClaims(requiredClaims: UserClaim[], userClaims: UserClaim[]): boolean {
    return requiredClaims.every(claim => userClaims.includes(claim));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
