/// <reference types="jquery" />
import { PanelRowsManager } from './panel-rows-manager';
import { PanelStatusManager } from './panel-status-manager';
import { PanelStateManager } from './panel-state-manager';
import { DrawToolbar } from './toolbar';
export declare class PanelManager {
    private _mousemoveHandler;
    private _mouseclickHandler;
    private _controls;
    /**
     * Panel constructor
     * @constructor
     * @param {Any} mapApi the viewer api
     * @param {Object} config the viewer configuration
     */
    constructor(mapApi: any, config: object);
    /**
     * Set the tools inactive
     * @function setInactive
     * @param {Object} mapApi the viewer api
     * @param {Object} config the viewer configuration
     */
    setInactive(): void;
    /**
     * Create controls
     * @function makeControls
     * @param {Object} config the viewer configuration
     */
    makeControls(config: any): void;
    /**
     * Create Angular controls (buttons and controllers)
     * @function makeControls
     * @param {String[]} tools array of tools to create
     */
    angularControls(tools: string[]): void;
    /**
     * Create button icon
     * @function createIcon
     * @param {Control} control control to create icon for
     */
    createIcon(control: control, icon?: string): void;
    /**
     * Set controls sate
     * @function setActive
     * @param {Controls[]} controls controls array to mange state
     * @param {String} name control name to activate or deactivate
     * @param {Boolean} [forceDisable] do we force disable all controls
     */
    setActive(controls: control[], name: string, forceDisable?: boolean): void;
    /**
     * Manage keyDown jQuery event to let keyboard user use the plugins (WCAG)
     * @function keyDownHandler
     * @param {Any} event jQuery event on key down
     */
    keyDownHandler(event: any): void;
    /**
     * Manage mouse mouve event add measure on move and add point on click
     * @function mouseHandler
     * @param {Any} event jQuery event on mouse move
     * @param {DrawToolbar} drawToolbar esri draw toolbar
     */
    mouseHandler(event: any, drawToolbar: DrawToolbar): void;
    /**
     * Manage the show/hide measure click
     * @function measure
     * @param {Control} measure measure control
     * @param {PanelManager} that the class
     */
    measure(measure: control, that: PanelManager): void;
    /**
     * Compile template to link controller and html
     * @function compileTemplate
     * @param {String} template measure control
     * @return {JQuery<HTMLElement>} temp compile template
     */
    compileTemplate(template: string): JQuery<HTMLElement>;
}
export declare class PanelManager2 {
    constructor(mapApi: any);
    panelStateManager: PanelStateManager;
    setLegendBlock(block: any): void;
    /**
     * Keeps the scrollbar locked on certain keyboard and mouse movements.
     * This is to prevent key events like tabbing moving the table's contents.
     */
    setListeners(): void;
    /**
     * Add the rv-focus-item and rv-focus-list classes when focus manager reaches the table.
     */
    prepListNavigation(): void;
    open(tableOptions: any, layer: any, tableBuilder: any): void;
    /**
     * Cleans up the table when the panel is being closed.
     */
    cleanUp(): void;
    onBtnExport(): void;
    onBtnPrint(): void;
    createHTMLTable(): string;
    setSize(): void;
    isMobile(): boolean;
    /**
     * Auto size all columns but check the max width
     * Note: Need a custom function here since setting maxWidth prevents
     *       `sizeColumnsToFit()` from filling the entire panel width
     */
    autoSizeToMaxWidth(columns?: Array<any>): void;
    /**
     * Check if columns don't take up entire grid width. If not size the columns to fit.
     */
    sizeColumnsToFitIfNeeded(): void;
    /**
     * Updates the column visibility list used for the columnVisibility control
     */
    updateColumnVisibility(): void;
    readonly id: string;
    makeHeader(): void;
    /**
     * Forces tooltips to hide.
     * Apply to map and clear filter tooltips are shown on click and mouseleave on IE/edge.
     */
    hideToolTips(): void;
    angularHeader(): void;
    compileTemplate(template: any): JQuery<HTMLElement>;
}
export interface control {
    name: string;
    icon: string;
    active: boolean;
}
export interface PanelManager {
    panel: any;
    mapApi: any;
    active: object;
    drawToolbar: DrawToolbar;
}
export interface PanelManager2 {
    panel: any;
    mapApi: any;
    _id: string;
    currentTableLayer: any;
    maximized: boolean;
    tableOptions: any;
    legendBlock: any;
    panelRowsManager: PanelRowsManager;
    panelStatusManager: PanelStatusManager;
    lastFilter: HTMLElement;
    gridBody: HTMLElement;
    configManager: any;
    mobileMenuScope: MobileMenuScope;
    recordCountScope: RecordCountScope;
    _panelStateManager: PanelStateManager;
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
interface MobileMenuScope {
    visible: boolean;
    searchEnabled: boolean;
    sizeDisabled: boolean;
}
interface RecordCountScope {
    scrollRecords: string;
    filterRecords: string;
}
export {};
