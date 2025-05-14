import type * as Highcharts from 'highcharts';

import { HighchartsBase } from '@/components/highcharts/highcharts-base';

export class HighchartsBaseMap extends HighchartsBase {
    protected override async loadHighchartsModules(
        Highcharts,
    ): Promise<typeof import('highcharts')> {
        await super.loadHighchartsModules(Highcharts);
        await import('highcharts/modules/map');

        return Highcharts;
    }

    protected override getChartOptions(): Highcharts.Options {
        return this.deepmerge(super.getChartOptions(), this.highchartsBaseMapOptions);
    }

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
        title: {
            align: 'left',
            style: {
                fontSize: '17px',
                fontWeight: 'bold',
                color: '#154273',
            },
            margin: 30,
        },
        subtitle: {
            align: 'left',
            style: {
                fontSize: '14px',
                fontWeight: 'normal',
                color: '#154273',
                transform: 'translate(0, -7px)', //Prevent subtitle to be overwritten by multiple-line title
            },
        },
        credits: {
            enabled: true,
            text: '',
            href: '',
            style: {
                fontSize: '12px',
                fontStyle: 'italic',
                color: '#505050',
                cursor: 'default',
            },
            position: {
                verticalAlign: 'bottom',
                align: 'left',
                x: 0,
            },
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
                animation: {
                    duration: 800,
                },
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
                        halo: {
                            size: 0,
                        },
                        animation: {
                            duration: 0,
                        },
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
                    text: '\u002B',
                    y: -38,
                },
                // @ts-expect-error: zoomReset is a valid runtime option even though it's not in the TS type
                zoomReset: {
                    text: '\u2609',
                    y: -15,
                    onclick: function () {
                        this.zoomOut();
                    },
                },
                zoomOut: {
                    text: '\u2013',
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
        responsive: {
            rules: [
                {
                    condition: {
                        // callback: function () {
                        //     //console.log(this.index, this.options.chart.type, this.title.textStr);
                        //     var type = this.options.chart.type;
                        //     //console.log(this.options.chart.type);
                        //     return type === 'map' && this.chartWidth < 501;
                        // },
                    },
                    chartOptions: {
                        credits: {
                            enabled: false,
                        },
                    },
                },
            ],
        },
    };
}
