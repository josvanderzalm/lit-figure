import * as Highcharts from 'highcharts';

import { HighchartsBase } from '@/components/highcharts/highcharts-base';
import { getHighchartsDataClasses } from '@/utils';

export class HighchartsBaseMap extends HighchartsBase {
    private highchartsBaseMapOptions: Highcharts.Options = {
        chart: {
            style: {
                fontFamily: 'RO Sans, Arial, sans-serif',
            },
            backgroundColor: '#ffffff',
            spacing: [5, 20, 35, 0],
            margin: [50, 5, 5, 0],
            height: 531,
        },
        colors: ['#f2e0ff', '#ceb2e0', '#ab89c2', '#8b65a4', '#6d4786', '#512e68'],
        colorAxis: {
            maxColor: '#007bc7',
            minColor: '#dbebf5',
        },
        legend: {
            title: {
                style: {
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#154273',
                },
            },
            layout: 'vertical',
            verticalAlign: 'top',
            align: 'left',
            y: 60,
            backgroundColor: '#ffffff',
            padding: 2,
            squareSymbol: false,
            symbolWidth: 24,
            symbolHeight: 12,
            symbolRadius: 0,
            itemStyle: {
                fontWeight: 'normal',
                fontSize: '12px',
                color: '#333333',
            },
            itemHoverStyle: {
                color: '#333333',
            },
            itemHiddenStyle: {
                color: '#c8c8c8',
                textDecoration: 'none',
            },
        },
        plotOptions: {
            series: {
                allowPointSelect: false,
                animation: { duration: 800 },
                states: {
                    select: {
                        enabled: false,
                        lineWidth: null,
                    },
                    normal: {
                        animation: false,
                    },
                    hover: {
                        lineWidthPlus: 1.5,
                        borderColor: '#ffffff',
                        halo: { size: 0 },
                        animation: { duration: 0 },
                    },
                    inactive: {
                        enabled: false,
                    },
                },
            },
        },
        mapNavigation: {
            enabled: true,
            buttons: {
                zoomIn: {
                    text: '+',
                    y: -38,
                },
                // @ts-expect-error: zoomReset is valid at runtime
                zoomReset: {
                    text: '☉',
                    y: -15,
                    onclick: function () {
                        this.zoomOut();
                    },
                },
                zoomOut: {
                    text: '–',
                    y: 8,
                },
            },
            buttonOptions: {
                align: 'left',
                verticalAlign: 'bottom',
                width: 12,
                height: 14,
                style: {
                    fontSize: '16px',
                    color: 'white',
                },
                theme: {
                    fill: '#01689b',
                    'stroke-width': 0,
                    r: 0,
                    states: {
                        hover: {
                            fill: '#b2d7ee',
                            style: {
                                color: '#e17000',
                            },
                        },
                    },
                },
            },
        },
        navigation: {
            menuStyle: {
                border: '0px',
                background: '#d4e8fb',
                padding: '3px',
                shadow: 0,
            },
            menuItemStyle: {
                padding: '0 10px',
                color: '#000000',
                fontSize: '13px',
            },
            menuItemHoverStyle: {
                background: '#01689b',
                color: '#ffffff',
            },
            buttonOptions: {
                symbolStroke: '#154273',
                height: 22,
                width: 12,
            },
        },
    };

    protected override async loadHighchartsModules(
        Highcharts: typeof import('highcharts'),
    ): Promise<typeof import('highcharts')> {
        await super.loadHighchartsModules(Highcharts);
        await import('highcharts/modules/map');

        return Highcharts;
    }

    protected override getChartOptions(): Highcharts.Options {
        const dataClasses = this.getDataClasses();

        (this.highchartsBaseMapOptions.colorAxis as Highcharts.ColorAxisOptions).dataClasses =
            dataClasses;

        return this.deepmerge(super.getChartOptions(), this.highchartsBaseMapOptions);
    }

    private getDataClasses(): Highcharts.ColorAxisDataClassesOptions[] {
        const { dataSet, mapKey } = this.options;
        const seriesData = dataSet.map((item) => Number(item[mapKey]));

        return getHighchartsDataClasses(
            seriesData,
            'equalInterval',
            9,
            '#f7fcfd',
            '#00441b',
            1,
            'nl-NL',
        );
    }
}
