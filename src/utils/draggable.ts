export class Draggable {
  ele:HTMLElement;
  startLeft: number | undefined;
  startTop: number | undefined;
  startY:number | undefined;
  startX: number | undefined;
  constructor(el:HTMLElement) {
    this.ele = el
    el.onmousedown = this.down.bind(this)
  }
  down(e:MouseEvent) {
    this.ele.style.transition = 'none'
    this.startLeft = this.ele.offsetLeft
    this.startTop = this.ele.offsetTop
    this.startX = e.pageX
    this.startY = e.pageY
    document.onmousemove = this.move.bind(this)
    document.onmouseup = this.up.bind(this)
  }
  move(e:MouseEvent) {
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
