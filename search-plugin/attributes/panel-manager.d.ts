export declare class PanelManager {
    private mapApi;
    private configLang;
    planPanel: any;
    constructor(mapApi: any, configLang: any);
    createPanel(mapApi: any, configLang: any): void;
    showPanel(): void;
    closePanel(): void;
}
