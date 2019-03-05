declare global {
    interface Performance {
        memory: any;
    }
}
export default class GLPerfCore {
    private gl;
    private drawCallHook;
    private textureHook;
    private shaderHook;
    private samplingFrames;
    private samplingIndex;
    private now;
    constructor(canvas: HTMLCanvasElement);
    private hook;
    reset(): void;
    release(): void;
    update(): {
        fps: number;
        memory: number;
        drawCall: number;
        triangles: number;
        lines: number;
        points: number;
        textures: number;
        shaders: number;
    };
}
