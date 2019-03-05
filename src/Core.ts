import DrawCallHook from "./hooks/DrawCallHook";
import TextureHook from "./hooks/TextureHook";
import ShaderHook from "./hooks/ShaderHook";
import {log, errorLog, colorLog} from './log'

declare global {
  interface Performance {
    memory: any
  }
}

/**
 * @class Core
 */
export default class Core{
  private gl: WebGLRenderingContext
  private drawCallHook: DrawCallHook
  private textureHook: TextureHook
  private shaderHook: ShaderHook
  private samplingFrames: number = 60
  private samplingIndex: number = 0
  private now: number

  constructor(canvas: HTMLCanvasElement) {
    try {
      this.gl = canvas.getContext('webgl')

      if (this.gl) {
        colorLog('Good Boy Play WebGL')
      }
    } catch (error) {
      errorLog(`Can't get WebGL context.`)
    }

    if (this.gl) {
      this.hook(this.gl)
    }
  }

  private hook (gl: WebGLRenderingContext) {
    this.drawCallHook = new DrawCallHook(gl)
    this.textureHook = new TextureHook(gl)
    this.shaderHook = new ShaderHook(gl)
  }

  public reset () {
    this.drawCallHook && this.drawCallHook.reset()
  }

  public release () {
    this.drawCallHook && this.drawCallHook.release()
    this.textureHook && this.textureHook.release()
    this.shaderHook && this.shaderHook.release()
  }

  public update () {
    let now = performance.now()
    let delta = now - this.now
    this.now = now

    if (this.samplingIndex !== this.samplingFrames) {
      this.reset()
      this.samplingIndex++
      return
    }

    this.samplingIndex = 0

    let data = {
      fps: delta ? Math.min(60, 1000 / delta >> 0) : 0,
      memory: performance.memory && performance.memory.usedJSHeapSize / 1048576 >> 0,
      drawCall: this.drawCallHook.drawCall,
      triangles: this.drawCallHook.triangles,
      lines: this.drawCallHook.lines,
      points: this.drawCallHook.points,
      textures: this.textureHook.textures,
      shaders: this.shaderHook.shaders
    }

    this.reset()

    return data
  }
}