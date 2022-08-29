import { Draggable } from '@/utils/draggable'

export const drag = {
  mounted(el: HTMLElement) {
    new Draggable(el)
  }
}