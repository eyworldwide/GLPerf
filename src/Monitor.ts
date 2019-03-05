import Core from './Core'

let tpl = `
  <dl>
    <dt>FPS</dt>
    <dd>0</dd>
    <dt>Memory <span class="unit">(MB)</span></dt>
    <dd>0</dd>
    <dt>DrawCall</dt>
    <dd>0</dd>
    <dt>Triangles</dt>
    <dd>0</dd>
    <dt>Textures</dt>
    <dd>0</dd>
    <dt>Shaders</dt>
    <dd>0</dd>
  </dl>
`
let css = `
  .gl-perf {
    pointer-events: none;
    user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    padding: ${20/7.5}vw ${20/7.5}vw 0 ${20/7.5}vw;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font: ${20/7.5}vw arial;
  }

  .gl-perf dl,
  .gl-perf dt,
  .gl-perf dd {
    padding: 0;
    margin: 0;
  }

  .gl-perf dt {
    color: orange;
  }

  .gl-perf dt .unit{
    font-size: ${15/7.5}vw;
  }

  .gl-perf dd {
    font-size: ${40/7.5}vw;
    padding: ${10/7.5}vw 0 ${20/7.5}vw;
  }
`

export default class Monitor {
  private core: Core
  private doms: HTMLElement[] 
  private items: string[]
  private container: HTMLElement

  constructor (canvas:HTMLCanvasElement) {
    this.core = new Core(canvas)
    this.items = []
    this.items = ['fps', 'memory', 'drawCall', 'triangles', 'textures', 'shaders']
    this.createContainer()
    this.update = this.update.bind(this)
  }
  
  private createContainer() {
    let container = document.createElement('div')
    container.classList.add('gl-perf')
    container.innerHTML = tpl

    container.appendChild(this.createStyle())
  
    document.body.appendChild(container)

    this.doms = Array.prototype.slice.apply(container.querySelectorAll('dd'))
    this.container = container
  }

  private createStyle () {
    let style:HTMLStyleElement = document.createElement('style')

    style.type = 'text/css'

    style.appendChild(document.createTextNode(css));

    return style
  }

  /**
   * Update per frame
   */
  public update () {
    let data = this.core.update()

    if (data) {
      for (let i = 0, l = this.items.length; i < l; i++) {
        let dom = this.doms[i]
        let item = this.items[i]
        let value = data[item] || 0

        // see: http://wilsonpage.co.uk/preventing-layout-thrashing/
        requestAnimationFrame(() => {
          dom.innerText = value
        })
      }
    }
  }
  
  /**
   * reset all hooks
   */
  public reset () {
    this.core.reset()
  }

  /**
   * release all hooks
   */
  public release () {
    this.core.release()
  }

  /**
   * destory the instance
   */
  public destroy () {
    this.release()
    document.body.removeChild(this.container)
  }
}