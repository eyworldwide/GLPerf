export default class DrawCallHook {
    drawCall: number;
    triangles: number;
    lines: number;
    points: number;
    private hooked;
    private realDrawElements;
    private realDrawArrays;
    private gl;
    constructor(gl: WebGLRenderingContext);
    private hookedDrawElements;
    private hookedDrawArrays;
    private update;
    reset(): void;
    release(): void;
}
