import { TABLE_LOADING_TEMPLATE2 } from './table-template';
import { GRID_TEMPLATE, MENU_BUTTON_RESULT } from '../templates/template';
import { Grid } from 'ag-grid-community';
import { PanelStateManager } from './panel-state-manager'
import { ZoomToElement } from './button-test'
import { param } from 'jquery';

const Draggabilly = require('draggabilly');

export class TableLoader {
    private panelId: string;

    constructor(mapApi: any, legendBlock) {
        this.mapApi = mapApi;
        this.legendBlock = legendBlock;   
        this.resetPanel();
        this.createPanel('resultsPanel')
        //this.hidden = true;
        //this.panelManager = new PanelStateManager('tableLoaderId', this.legendBlock);  
    }

    set panelStateManager(newPanelStateManager: PanelStateManager) {
        this._panelStateManager = newPanelStateManager;
    }

    get panelStateManager() {
        return this._panelStateManager;
    }

    onHideResultPanel(e) {
        const { panel, code } = e;
        panel.element.addClass('hidden');
        panel.destroy();
    }

    createPanel(panelID) {
        this.panelId = panelID;
        this.panel = this.mapApi.panels.create(panelID);
        this.panel.element.css({top: '50%', left: '20%', right: '52px', bottom: '30px'});
        this.panel.element.addClass('ag-theme-material mobile-fullscreen tablet-fullscreen');
        this.panel.allowUnderlay = true;
        this.panel.closing.subscribe(this.onHideResultPanel.bind(this));
        
        this.prepareHeader(this.mapApi);
        this.prepareBody();
        //this.hidden = true;
        this.open()
    }

    setSize(maximized) {
        if (maximized) {
            this.panel.element.css({ bottom: '0' });;
        } else {
            this.panel.element.css({ bottom: '50%' });;
        }
    }

    prepareHeader(mapApi) {
        const headerClass =  this.panel.header._header
        const titleElem = headerClass.find('header').first()
        const titleText = `<h3 class="custom-title" style="display:none;">{{ 'plugins.clssPlugin.buttonName' | translate }}</h3>`
        const panelElem = document.getElementById(this.panelId)
        const newID = 'panel-header-custom'
        panelElem.getElementsByClassName('rv-header')[0].setAttribute("id", newID)

        const headerElem =  document.getElementById(newID)
        //headerElem.getElementsByClassName("tagline")[0].remove()
        //headerElem.getElementsByClassName("md-title")[0].remove()

        //const close = this.panel.header.closeButton;
        //close.removeClass('primary');
        //close.addClass('black md-ink-ripple');

        //panel.element.addClass('draggable');
        //const draggable = new Draggabilly(panel.element.get(0), {handle: '.rv-header'});

        //this.setAngular(this.mapApi, panel);
        this.mapApi.agControllerRegister('MenuPanel2', ['$scope','$mdSidenav', function($scope ,$mdSidenav) {
            
            $scope.openSideMenu = buildToggler('sideMenu');

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                }
            }
        }])
        titleElem.append(this.compileTemplate(MENU_BUTTON_RESULT));

        const test1 = `<md-button name="test1" style="padding:0px; margin:0px;">Parcel</md-button>`
        const test2 = `<md-button name="test2" style="padding:0px; margin:0px;">Survey</md-button>`
        const test3 = `<md-button name="test3" style="padding:0px; margin:0px;">Plan</md-button>`;
        const test4 = `<md-button name="test3" style="padding:0px; margin:0px;">Township</md-button>`;
        const test5 = `<md-button name="test3" style="padding:0px 6px 0px 20px; margin:0px;">Administrative</md-button>`;
        const test6 = `<md-button name="test3" style="padding:0px; margin:0px;">Info</md-button>`;

        titleElem.append(this.compileTemplate(test1));
        titleElem.append(this.compileTemplate(test2));
        titleElem.append(this.compileTemplate(test3));
        titleElem.append(this.compileTemplate(test4));
        titleElem.append(this.compileTemplate(test5));
        titleElem.append(this.compileTemplate(test6));

        //titleElem.append(this.compileTemplate(titleText));
        //this.panel.header.toggleButton
        //this.panel.header.title = this.legendBlock.name;
        this.panel.element.addClass('draggable');
        const draggable = new Draggabilly(this.panel.element.get(0), {handle: '.rv-header'});
        
        const close = this.panel.header.closeButton;
        close.removeClass('primary');
        close.addClass('black md-ink-ripple');
    }

    open() {
        this.panel.open();
        this.hidden = false;
    }

    resetPanel() {
        let panelID = 'resultsPanel';
        let resultsGrid = <HTMLElement>document.getElementById(panelID);

        if (resultsGrid) {
            resultsGrid.remove()
        }
    }; 

    prepareBody() {
        let template = TABLE_LOADING_TEMPLATE2(this.legendBlock);
        this.panel.body = template;
    }

    setSpatialGrid(results) {
        let mapApi = this.mapApi;
        this.panel.body = this.compileTemplate(GRID_TEMPLATE);
        let gridDiv = <HTMLElement>document.querySelector('#plan')

        let gridOptions = {
            columnDefs: [
                {headerName: 'Plan Designator', field:'parcelDesignator', headerTooltip: 'Plan Designator', cellRenderer: function(cell){return cell.value}},
                {headerName: 'Plan Number', field:'planNumber', headerTooltip: 'Plan Number'},
                {headerName: 'Plan Detail', field:'planDetail', headerTooltip: 'Plan Detail'},
                {headerName: 'Remainder', field:'remainder', headerTooltip: 'Remainder'},
            ],

            rowData: [],

            //onGridReady: function(params) {
            //    params.api.sizeColumnsToFit();
            //},

            rowStyle: {
                background: 'white'
            },

            //pagination: true,
            enableColResize: true,
            enableSorting: true,
        };
        
        results.forEach(function(result) {
            gridOptions.rowData.push({
                parcelDesignator: result.attributes['PARCELDESIGNATOR'], 
                planNumber: result.attributes['PLANNO'],
                planDetail: result.attributes['PARCELFC_ENG'],
                remainder: result.attributes['REMAINDERIND_ENG'],
                globalid: result.attributes['GlobalID'],

           })
        })

        gridOptions.columnDefs[0].cellRenderer = function(params) {
            
            var eDiv = document.createElement('div');
            /*
            eDiv.onmouseover=function() {
                let delay = setTimeout(function() {
                    new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'mouseover');
                }, 500);
                eDiv.onmouseout = function() {clearTimeout(delay);};
            };
            eDiv.addEventListener('click', function() {
                new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'click')
            });
            eDiv.addEventListener('mouseout', function() {
                mapApi.esriMap.graphics.clear();
            });
            */
            eDiv.innerHTML = '<span class="my-css-class" style="cursor:pointer"><a href="#">' + params.value + '</a></span>';
            
            return eDiv;
        }

        new Grid(gridDiv, gridOptions);
    }

    setSpatialGridSIP(results) {
        let mapApi = this.mapApi;
        this.panel.body = this.compileTemplate(GRID_TEMPLATE);
        let gridDiv = <HTMLElement>document.querySelector('#plan')

        let gridOptions = {
            columnDefs: [
                {headerName: 'Project Number', field:'projectNumber', headerTooltip: 'Project Number', cellRenderer: function(cell){return cell.value}},
                {headerName: 'Description', field:'description', headerTooltip: 'Description'},
                {headerName: 'Global ID', field:'globalID', headerTooltip: 'Global ID'},
                {headerName: 'Url', field:'url', headerTooltip: 'Url'},
                {headerName: 'Province', field:'province', headerTooltip: 'Province'},
            ],

            rowData: [],

            //onGridReady: function(params) {
            //    params.api.sizeColumnsToFit();
            //},

            rowStyle: {
                background: 'white'
            },

            //pagination: true,
            enableColResize: true,
            enableSorting: true,
        };
        
        results.forEach(function(result) {
            gridOptions.rowData.push({
                projectNumber: result.attributes['PROJECTNUMBER'], 
                description: result.attributes['DESCRIPTION'],
                globalID: result.attributes['GlobalID'],
                url: result.attributes['URL'],
                province: result.attributes['PROVINCE'],

           })
        })

        gridOptions.columnDefs[0].cellRenderer = function(params) {
            
            var eDiv = document.createElement('div');
            /*
            eDiv.onmouseover=function() {
                let delay = setTimeout(function() {
                    new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'mouseover');
                }, 500);
                eDiv.onmouseout = function() {clearTimeout(delay);};
            };
            eDiv.addEventListener('click', function() {
                new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'click')
            });
            eDiv.addEventListener('mouseout', function() {
                mapApi.esriMap.graphics.clear();
            });
            */
            eDiv.innerHTML = '<span class="my-css-class" style="cursor:pointer"><a href="#">' + params.value + '</a></span>';
            
            return eDiv;
        }

        new Grid(gridDiv, gridOptions);
    }

    setSpatialGridPlan(results) {
        let mapApi = this.mapApi;
        this.panel.body = this.compileTemplate(GRID_TEMPLATE);
        let gridDiv = <HTMLElement>document.querySelector('#plan')
        let gridOptions = {
            columnDefs: [
                {headerName: 'Planno', field:'planno', headerTooltip: 'Planno', cellRenderer: function(cell){return cell.value}},
                {headerName: 'P2_Description', field:'P2_description', headerTooltip: 'P2_Description'},
                {headerName: 'P3_Date Surveyed', field:'P3_dateSurveyed', headerTooltip: 'P3_Date Surveyed'},
                {headerName: 'Global ID', field:'globalID', headerTooltip: 'Global ID'},
                {headerName: 'Province', field:'province', headerTooltip: 'Province'},
                {headerName: 'Surveyor', field:'surveyor', headerTooltip: 'Surveyor'},
                {headerName: 'Alternate Planno', field:'alternatePlanno', headerTooltip: 'Alternate Planno'},
            ],

            rowData: [],

            //onGridReady: function(params) {
            //    params.api.sizeColumnsToFit();
            //},

            rowStyle: {
                background: 'white'
            },

            //pagination: true,
            enableColResize: true,
            enableSorting: true,
        };
        
        results.forEach(function(result) {
            gridOptions.rowData.push({
                planno: result.attributes['PLANNO'], 
                P2_description: result.attributes['P2_DESCRIPTION'],
                P3_dateSurveyed: result.attributes['P3_DATESURVEYED'],
                globalID: result.attributes['GlobalID'],
                province: result.attributes['PROVINCE'],
                surveyor: result.attributes['SURVEYOR'],
                alternatePlanno: result.attributes['ALTERNATEPLANNO'],

           })
        })

        gridOptions.columnDefs[0].cellRenderer = function(params) {
            
            var eDiv = document.createElement('div');
            /*
            eDiv.onmouseover=function() {
                let delay = setTimeout(function() {
                    new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'mouseover');
                }, 500);
                eDiv.onmouseout = function() {clearTimeout(delay);};
            };
            eDiv.addEventListener('click', function() {
                new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'click')
            });
            eDiv.addEventListener('mouseout', function() {
                mapApi.esriMap.graphics.clear();
            });
            */
            eDiv.innerHTML = '<span class="my-css-class" style="cursor:pointer"><a href="#">' + params.value + '</a></span>';
            
            return eDiv;
        }

        new Grid(gridDiv, gridOptions);
    }

    setSpatialGridTown(results) {
        let mapApi = this.mapApi;
        this.panel.body = this.compileTemplate(GRID_TEMPLATE);
        let gridDiv = <HTMLElement>document.querySelector('#plan')
        let gridOptions = {
            columnDefs: [
                {headerName: 'Township Section', field:'townshipSection', headerTooltip: 'Township Section', cellRenderer: function(cell){return cell.value}},
                {headerName: 'TP', field:'tP', headerTooltip: 'TP'},
                {headerName: 'Range', field:'range', headerTooltip: 'Range'},
                {headerName: 'Direction', field:'direction', headerTooltip: 'Direction'},
                {headerName: 'Meridian', field:'meridian', headerTooltip: 'Meridian'},
                {headerName: 'Township', field:'township', headerTooltip: 'Township'},
                {headerName: 'Global ID', field:'globalID', headerTooltip: 'Global ID'},
                {headerName: 'Province', field:'province', headerTooltip: 'Province'},
            ],

            rowData: [],

            //onGridReady: function(params) {
            //    params.api.sizeColumnsToFit();
            //},

            rowStyle: {
                background: 'white'
            },

            //pagination: true,
            enableColResize: true,
            enableSorting: true,
        };
        results.forEach(function(result) {
            gridOptions.rowData.push({
                townshipSection: result.attributes['TOWNSHIPSECTION'], 
                tP: result.attributes['TP'],
                range: result.attributes['RANGE'],
                direction: result.attributes['DIRECTION'],
                meridian: result.attributes['MERIDIAN'],
                township: result.attributes['TOWNSHIP'],
                globalID: result.attributes['GlobalID'],
                province: result.attributes['PROVINCE'],

           })
        })

        gridOptions.columnDefs[0].cellRenderer = function(params) {
            
            var eDiv = document.createElement('div');
            /*
            eDiv.onmouseover=function() {
                let delay = setTimeout(function() {
                    new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'mouseover');
                }, 500);
                eDiv.onmouseout = function() {clearTimeout(delay);};
            };
            eDiv.addEventListener('click', function() {
                new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'click')
            });
            eDiv.addEventListener('mouseout', function() {
                mapApi.esriMap.graphics.clear();
            });
            */
            eDiv.innerHTML = '<span class="my-css-class" style="cursor:pointer"><a href="#">' + params.value + '</a></span>';
            
            return eDiv;
        }

        new Grid(gridDiv, gridOptions);
    }

    setSpatialGridAdminArea(results) {
        let mapApi = this.mapApi;
        this.panel.body = this.compileTemplate(GRID_TEMPLATE);
        let gridDiv = <HTMLElement>document.querySelector('#plan')
        let gridOptions = {
            columnDefs: [
                {headerName: 'English Name', field:'englishName', headerTooltip: 'English Name', cellRenderer: function(cell){return cell.value}},
                {headerName: 'Province', field:'province', headerTooltip: 'Province'},
                {headerName: 'Global ID', field:'globalID', headerTooltip: 'Global ID'},
            ],

            rowData: [],

            //onGridReady: function(params) {
            //    params.api.sizeColumnsToFit();
            //},

            rowStyle: {
                background: 'white'
            },

            //pagination: true,
            enableColResize: true,
            enableSorting: true,
        };
        results.forEach(function(result) {
            gridOptions.rowData.push({
                englishName: result.attributes['ENGLISHNAME'], 
                province: result.attributes['PROVINCE'],
                globalID: result.attributes['GlobalID'],
           })
        })

        gridOptions.columnDefs[0].cellRenderer = function(params) {
            
            var eDiv = document.createElement('div');
            /*
            eDiv.onmouseover=function() {
                let delay = setTimeout(function() {
                    new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'mouseover');
                }, 500);
                eDiv.onmouseout = function() {clearTimeout(delay);};
            };
            eDiv.addEventListener('click', function() {
                new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'click')
            });
            eDiv.addEventListener('mouseout', function() {
                mapApi.esriMap.graphics.clear();
            });
            */
            eDiv.innerHTML = '<span class="my-css-class" style="cursor:pointer"><a href="#">' + params.value + '</a></span>';
            
            return eDiv;
        }

        new Grid(gridDiv, gridOptions);
    }

    setResultsGrid(results, mapApi) {
        //const self = this;
        this.panel.body = this.compileTemplate(GRID_TEMPLATE);
        
        /*let tabElement = document.getElementsByName('plan')[0]

        if (results.length >= 1000) {
            tabElement.innerHTML = tabElement.innerText + ' (1000+) '
        } else {
            tabElement.innerHTML = tabElement.innerText + ' (' + results.length + ')';
        }*/
        
        let gridOptions = {
            columnDefs: [
                {
                    headerName: 'Plan Number', 
                    field:'planNumber',
                    headerTooltip: 'Plan Number', 
                    cellEditor: 'agRichSelectCellEditor',
                    unSortIcon: true,
                    width: 160,
                    cellRenderer: function (cell) {
                        return cell.value
                    },
                },
                {headerName: 'Description', field:'description', headerTooltip: 'Description', width: 300, },
                {headerName: 'Date of Survey', field:'dateSurvey', headerTooltip: 'Date of Survey',  width: 150},
                {headerName: 'Detail', field:'planDetail', headerTooltip: 'Detail', width: 100},
                {headerName: 'LTO', field:'lto', headerTooltip: 'List of survey document (plan) results from the attributes and map searches'},
            ],

            rowSelection: 'multiple',

            rowData:[],

            onGridReady: function(params) {
                //params.api.sizeColumnsToFit();
                params.api.refreshCells(params);
                
            },

            rowStyle: {
                background: 'white'
            },

            //pagination: true,
            
            enableColResize: true,
            enableSorting: true,

            //allowContextMenuWithControlKey: true,
        }

        
        results.forEach(function(result) {
            let date = result.attributes['P3_DATESURVEYED'];
            let newDate = date.substr(0,4) + '-' + date.substr(4,2) + '-' + date.substr(6,2);

            gridOptions.rowData.push({
                planNumber: result.attributes['PLANNO'],
                description: result.attributes['P2_DESCRIPTION'],
                dateSurvey: newDate,
                planDetail: 'View',
                lto: result.attributes['ALTERNATEPLANNO'],
                globalid: result.attributes['GlobalID'],
                province:result.attributes['PROVINCE']
            })
        })

        gridOptions.columnDefs[0].cellRenderer = function(params) {
            var eDiv = document.createElement('div');
            eDiv.onmouseover=function() {
                let delay = setTimeout(function() {
                    new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'mouseover');
                    console.log('a')
                }, 500);
                eDiv.onmouseout = function() {clearTimeout(delay);
                };
            };
            
            eDiv.innerHTML = '<span class="my-css-class" style="cursor:pointer"><a href="#">' + params.value + '</a></span>';
            //eDiv.innerHTML = '<span class="my-css-class"><button class="btn-simple">Push Me</button></span>';
            //var eButton = eDiv.querySelectorAll('.btn-simple')[0];
            eDiv.addEventListener('click', function() {
                new ZoomToElement(mapApi, params.data.globalid, params.data.province, 'click')
            });
            eDiv.addEventListener('mouseout', function() {
                mapApi.esriMap.graphics.clear();
            });
            return eDiv;
        }

        gridOptions.columnDefs[3].cellRenderer = function(params) {
            let eDiv = document.createElement('div');
            eDiv.innerHTML= '<span class="my-css-class"><a href="' + 'https://clss.nrcan-rncan.gc.ca/plan-fra.php?id=' + params.data.planNumber.replace(/\s/g, '%20') + '"target=_blank>' + params.value + '</a></span>';
            return eDiv
        }

        let gridDiv = <HTMLElement>document.querySelector('#plan')
        //let gridDiv1 = <HTMLElement>document.querySelector('#admin')

        new Grid(gridDiv, gridOptions);
        //new Grid(gridDiv1, gridOptions);

    }

    compileTemplate(template): JQuery<HTMLElement> {
        let temp = $(template);
        this.mapApi.$compile(temp);
        return temp;
    }

    close() {
        this.panel.close();
    }
    
}

export interface TableLoader {
    mapApi: any;
    panel: any;
    hidden: boolean;
    legendBlock: any;
    _panelStateManager: PanelStateManager;
    panelManager: any;
}
