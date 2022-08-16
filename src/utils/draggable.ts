export class Draggable {
  ele: HTMLElement;
  startLeft: number | undefined;
  startTop: number | undefined;
  startY: number | undefined;
  startX: number | undefined;
  dragStyle: string | undefined;
  constructor(el: HTMLElement) {
    this.ele = (el.parentElement) as HTMLElement
    ((el.parentElement) as HTMLElement).onmousedown = this.down.bind(this)
  }
  down(e: MouseEvent) {
    const target = e.target as Element
    if (target.className !== 'titleBlock') return
    this.dragStyle = this.ele.className
    this.ele.style.transition = 'none'
    this.startLeft = this.ele.offsetLeft
    this.startTop = this.ele.offsetTop
    this.startX = e.pageX
    this.startY = e.pageY
    document.onmousemove = this.move.bind(this)
    document.onmouseup = this.up.bind(this)
  }
  move(e: MouseEvent) {
    if (this.dragStyle === 'appContainer') {
      this.ele.className = 'appContainer dragStyle'
    }
    const curLeft = e.pageX - (this.startX as number) + (this.startLeft as number),
      curTop = e.pageY - (this.startY as number) + (this.startTop as number);
    this.ele.style.left = curLeft + 'px';
    this.ele.style.top = curTop + 'px';
  }
  up() {
    document.onmousemove = null
    document.onmouseup = null
    this.ele.style.transition = 'all 200ms ease-in'
  }
}
