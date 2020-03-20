import { ChartLoader } from './chart-loader';

const _ = require('lodash');

/**
 * Creates bar and line charts.
 */
export class ChartBar {
    private _data: object[] = [];
    private _range: any = {
        min: -1,
        max: -1
    };

    /**
     * get datasets
     * @property datasets
     * @return {Object} original datasets (not filtered one)
     */
    get datasets(): object[] {
        return this._data;
    }
    /**
     * get range
     * @property range
     * @return {Object} the min and max values for the datasets
     */
    get range(): any {
        return this._range;
    }

    /**
     * Chart bar constructor
     * @constructor
     * @param {Any} config the slider configuration
     * @param {Object} attrs the feature attributes
     */
    constructor(config: any, attrs: object) {
       // set chart options
        this.title = config.title;
        this.type = config.type;
        this.options = {
            scales: {
                xAxes: [],
                yAxes: []
            }
        };

        // set data options
        // TODO: deal with layer id... for now id must be 0. In relality, we will check if the id is the one provided by configuration
        const colors = config.options.colors === '' ? ChartLoader.defaultColors : config.options.colors.split(';');
        const layerData = config.layers.find(i => i.id === '0');
        this.setData(layerData, attrs, colors, config.axis.xAxis.type);

        // set labels options
        this.options.scales.xAxes.push(this.setAxis('xAxes', config.axis.xAxis, attrs));
        this.options.scales.yAxes.push(this.setAxis('yAxes', config.axis.yAxis, attrs));
    }

    /**
     * Set the chart data
     * @function setData
     * @param {Object} layerData the layer data provided by configuration
     * @param {Object} attrs the feature attributes
     * @param {String[]} colors the array of colors to use
     * @param {String} xType the x axis type, date or linear
     */
    setData(layerData: object, attrs: object, colors: string[], xType: string) {
        // get data for the graph and keep a copy for line chart with time
        // we have a slider to refine the graph by years
        this.data = ChartLoader.parse(layerData, attrs, colors, xType);

        // for each dataset, set options
        for (let [i, dataset] of this.data.datasets.entries()) {
            dataset.backgroundColor = `${colors[i]}80`;
            dataset.borderColor = colors[i];
            dataset.borderWidth = 2;

            // keep the original value so we can use a slider to refine
            if (this.type === 'line') {
                // use lodash to deep clone the object so we dont mess the original object
                this._data.push(_.cloneDeep(dataset.data));

                // set ranges for the datasets to use with the slider
                let minVal = _.min(dataset.data.map((rec) => {return rec.x}));
                let maxVal = _.max(dataset.data.map((rec) => {return rec.x}))
                if (this._range.min === -1 || this._range.min >= minVal) {
                    this._range.min = parseInt(minVal, 10);
                }
                if (this._range.max === -1 || this._range.max >= maxVal) {
                    this._range.max = parseInt(maxVal, 10);
                }
            }
        }
    }

    /**
     * Set the chart axis
     * @function setAxis
     * @param {String} axe the axis to set (xAxes or yAxes)
     * @param {Any} config the chart configuration
     * @param {Object} attrs the feature attributes
     * @return {Object} the axis object
     */
    setAxis(axe: string, config: any, attrs: object): { [k: string]: any } {
        let optsAxe: { [k: string]: any } = {};

        if (config.type === 'field' || config.type === 'config') {
            // get values from the configuration or field because it is a category axe
            const ticks = ChartLoader.getLabels(config, attrs);

            optsAxe.type = 'category';
            optsAxe.labels = ticks;
        } else if (config.type === 'linear') {
            optsAxe.type = 'linear';
        } else if (config.type === 'date') {
            optsAxe.type = 'time';
            optsAxe.distribution = 'serie';
        }

        // axe gridlines display
        if (axe === 'xAxes') {
            optsAxe.gridLines = {
                display: true,
                drawTicks: true,
                drawBorder: false,
                drawOnChartArea: false
            }
        }

        // axe ticks
        optsAxe.ticks = {
            autoSkip: true,
            autoSkipPadding: 100
        }

        // axe title
        optsAxe.scaleLabel = {
            display: true,
            labelString: config.title
        }

        return optsAxe;
    }
}

export interface ChartBar {
    options: any;
    type: string;
    data: any;
    title: string;
    ranges: any;
}