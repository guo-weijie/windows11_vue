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

export {
  allAppItem,
  timeObj,
  allAppType,
  timeType,
  RintegerYear
}