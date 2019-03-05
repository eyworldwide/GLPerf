export default class GLPerfDashboard {
    private core;
    private doms;
    private items;
    private container;
    constructor(canvas: HTMLCanvasElement);
    createContainer(): void;
    createStyle(): HTMLStyleElement;
    update(): void;
    release(): void;
    destroy(): void;
}
