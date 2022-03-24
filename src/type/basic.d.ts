import { Ref } from "vue";

type Rstring = Ref<string>
type Rnumber = Ref<number>
type Rboolean = Ref<boolean>
type REle = Ref<HTMLElement | null>
type ele = HTMLElement

export {
  Rstring,
  Rnumber,
  Rboolean,
  REle,
  ele
}