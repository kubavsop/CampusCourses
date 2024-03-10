import {UserClaim} from "./user-claim";

export interface HeaderItem {
  id: number
  route?: string,
  title?: string,
  position: HeaderItemPosition
  claims: UserClaim[]
  action?: () => void
}

export enum HeaderItemPosition {
  LEFT,
  RIGHT
}
