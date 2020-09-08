export declare class TableManager {
    constructor(mapApi: any);
    setSize(): void;
    cleanUp(): void;
    createHTMLTable(): string;
}
export interface TableManager {
    panel: any;
    mapApi: any;
    _id: string;
    currentTableLayer: any;
    maximized: boolean;
    tableOptions: any;
    legendBlock: any;
    lastFilter: HTMLElement;
    gridBody: HTMLElement;
    configManager: any;
    searchText: string;
    filterByExtent: boolean;
    filtersChanged: boolean;
    hiddenColumns: any;
    columnMenuCtrl: any;
    clearGlobalSearch: Function;
    reload: Function;
    toastInterval: any;
    showToast: Function;
}
