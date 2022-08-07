import { Draggable } from '@/utils/draggable.ts'

export const drag = {
  mounted(el) {
    new Draggable(el)
  }
}