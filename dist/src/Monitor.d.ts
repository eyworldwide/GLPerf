export default class Monitor {
    private core;
    private doms;
    private items;
    private container;
    constructor(canvas: HTMLCanvasElement);
    private createContainer;
    private createStyle;
    update(): void;
    reset(): void;
    release(): void;
    destroy(): void;
}
