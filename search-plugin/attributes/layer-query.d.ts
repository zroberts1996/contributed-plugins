import { TableLoader } from './table-loader';
import { TableManager } from './table-manager';
export declare class MakeQuery {
    private _mapApi;
    private _configLang;
    private query;
    private curProv;
    private queryURL;
    private queryTask;
    private whereclause;
    private loadingPanel;
    private baseURL;
    constructor(mapApi: any, configLang: any);
    getProvinceAbrev(): any;
    openLoadingPanel(mapApi: any): void;
    executeQuery(layerNumber: any, inputBoxID: any): void;
    createTable(panel: any): (queryResults: any) => void;
}
export interface MakeQuery {
    feature: string;
    id: string;
    _name: string;
    mapApi: any;
    translations: any;
    legendBlock: any;
    changeBody: TableLoader;
    loadingTimeout: any;
    layerAdded: any;
    tableManager: TableManager;
}
