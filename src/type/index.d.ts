import { ComputedRef } from "vue"

interface allAppItem {
  name: string,
  url: string,
  isDesktop: boolean,
  isPinned: boolean
}

interface timeObj {
  year: number | undefined,
  month: number | undefined,
  date: number | undefined
}

type allAppType = allAppItem[]

interface timeType {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number | string,
  second: number | string
}

interface RintegerYear {
  before: number,
  after: number
}

interface fnItemListType {
  name: string,
  icon: string,
  show: boolean,
  select: boolean,
  menu: boolean
}

type fnItemType = fnItemListType[]

type fnItemTypeCom = ComputedRef<fnItemType>

export {
  allAppItem,
  timeObj,
  allAppType,
  timeType,
  RintegerYear,
  fnItemListType,
  fnItemType,
  fnItemTypeCom
}