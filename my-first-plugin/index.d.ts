/// <reference types="jquery" />
export default class MyFirstPlugin {
    private _panelForm;
    private _button;
    private _panelOptionsForm;
    /**
    * Plugin init
    * @function init
    * @param {Object} mapApi the viewer api
    */
    init(mapApi: any): void;
    onMenuItemClick(): () => void;
    setAngular(): void;
    compileTemplate(template: string): JQuery<HTMLElement>;
}
export default interface MyFirstPlugin {
    mapApi: any;
    _RV: any;
    config: any;
    translations: any;
}
