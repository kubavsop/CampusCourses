import {Component, OnDestroy, OnInit} from "@angular/core";
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
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    MatRipple,
    RouterLinkActive,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatProgressBar,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  readonly headerItems: HeaderItem[]
  leftItems: HeaderItem[]
  rightItems: HeaderItem[]
  menuItems: HeaderItem[]
  subscriptions: Subscription[] = []
  showMenu: boolean = false
  loading: boolean


  constructor(
    private userService: UserService,
    private breakPointObserver: BreakpointObserver
  ) {
    this.headerItems =
      [
        {id: 1, route: "groups", title: "Группы курсов", position: HeaderItemPosition.LEFT, claims: [UserClaim.AUTH]},
        {
          id: 2,
          route: "courses/my",
          title: "Мои курсы",
          position: HeaderItemPosition.LEFT,
          claims: [UserClaim.STUDENT, UserClaim.AUTH]
        },
        {
          id: 3,
          route: "courses/teaching",
          title: "Преподаваемые курсы",
          position: HeaderItemPosition.LEFT,
          claims: [UserClaim.TEACHER, UserClaim.AUTH]
        },
        {id: 4, route: "profile", position: HeaderItemPosition.RIGHT, claims: [UserClaim.AUTH]},
        {id: 5, title: "Выход", action: this.logout, position: HeaderItemPosition.RIGHT, claims: [UserClaim.AUTH]},
        {
          id: 6,
          route: "registration",
          title: "Регистрация",
          position: HeaderItemPosition.RIGHT,
          claims: [UserClaim.NOT_AUTH]
        },
        {id: 7, route: "login", title: "Вход", position: HeaderItemPosition.RIGHT, claims: [UserClaim.NOT_AUTH]}
      ];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.loading$.subscribe(
        (loading: boolean) => this.loading = loading
      )
    );

    this.subscriptions.push(
      this.userService.userClaim$.subscribe(
        (claims: UserClaim[]) => {
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
      ));

    this.subscriptions.push(
      this.breakPointObserver.observe(
        [Breakpoints.Large, Breakpoints.XLarge]
      ).subscribe((state => {
        this.showMenu = !state.matches;
      }))
    )
  }

  private logout() {

  }

  private checkUserClaims(requiredClaims: UserClaim[], userClaims: UserClaim[]): boolean {
    return requiredClaims.every(claim => userClaims.includes(claim));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe())
  }
}
