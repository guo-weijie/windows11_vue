export interface allAppItem {
  name: string,
  url: string,
  isDesktop: boolean,
  isPinned: boolean
}

export type allAppType = allAppItem[]

export interface timeType {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number|string,
  second: number|string
}