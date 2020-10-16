export interface Event {
  target: {
    value: string
    [targetOtherKeys: string]: any
  }
  [eventOtherKeys: string]: any
}

export type LoginUrl = string

export interface LoginInfo {
  'userName': string
  'password': string
}

export interface LoginReturn {
  data: string,
  openId: number
}