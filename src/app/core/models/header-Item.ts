import {UserClaim} from "./user-claim";

export interface HeaderItem {
  title: string
  route: string
  position: HeaderItemPosition
  roles: UserClaim[]
}

export enum HeaderItemPosition {
  LEFT,
  RIGHT
}
