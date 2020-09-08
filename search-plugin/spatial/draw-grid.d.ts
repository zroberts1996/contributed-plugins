/// <reference types="jquery" />
export declare class TableLoader {
    private _panelOptionsForm;
    constructor(mapApi: any);
    compileTemplate(template: any): JQuery<HTMLElement>;
}
export interface TableLoader {
    mapApi: any;
    panel: any;
    hidden: boolean;
    legendBlock: any;
}
