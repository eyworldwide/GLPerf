export default class TextureHook {
    textures: number;
    private realCreateTexture;
    private realDeleteTexture;
    private hooked;
    private gl;
    constructor(gl: WebGLRenderingContext);
    private hookedCreateTexture;
    private hookedDeleteTexture;
    reset(): void;
    release(): void;
}
