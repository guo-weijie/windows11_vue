import { ComputedRef, Ref } from "vue"

type Rstring = Ref<string>
type Rnumber = Ref<number>
type Rboolean = Ref<boolean>
type REle = Ref<HTMLElement | null>

interface appItem {
  name: string,
  url: string,
  isDesktop: boolean,
  isPinned: boolean,
  isTaskBar: boolean,
  open: boolean,
  mini: boolean
}

type app = appItem[]

interface timeObj {
  year: number | undefined,
  month: number | undefined,
  date: number | undefined
}

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

interface dealAppList {
  id: string,
  list: app
}

type fnItemType = fnItemListType[]

type fnItemTypeCom = ComputedRef<fnItemType>

type allAppListBySort = dealAppList[]

export {
  Rstring,
  Rnumber,
  Rboolean,
  REle,
  app,
  timeObj,
  timeType,
  RintegerYear,
  fnItemListType,
  fnItemType,
  fnItemTypeCom,
  dealAppList,
  allAppListBySort
}