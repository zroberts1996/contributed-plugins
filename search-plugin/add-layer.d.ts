export declare class AddLayer {
    translations: any;
    private mapApi;
    private config;
    private esriBundle;
    private _bundle;
    private layer;
    private testLayer;
    constructor(mapApi: any, config: any);
    addLegendPanel(mapApi: any): void;
    addBusinessMap(esriBundle: any): void;
    addLayer(esriBundle: any, mapApi: any, config: any): void;
}
