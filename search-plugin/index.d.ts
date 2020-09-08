import { PanelManager } from './attributes/panel-manager';
import { DrawManager } from './spatial/draw-manager';
export default class ClssPlugin {
    /**
    * Plugin init
    * @function init
    * @param {Object} mapApi the viewer api
    */
    init(mapApi: any): void;
    /**
     * Event to fire on side menu item click
     * @function onMenuItemClick
     * @return {function} the function to run
     */
    onMenuItemClick(): () => void;
}
export default interface ClssPlugin {
    mapApi: any;
    _RV: any;
    config: any;
    translations: any;
    panelManager: PanelManager;
    drawManager: DrawManager;
    button: any;
}
