import type * as Highcharts from 'highcharts';
import slugify from 'slugify';

import { BaseFigure } from '@/common/base/base-figure';
import lang_nl from '@/highcharts/lang/lang-nl';
import type { ActionItem } from '@/types';

export class HighchartsBase extends BaseFigure {
    highchartsInstance: typeof import('highcharts') | null = null;
    highchartsChart: Highcharts.Chart | null = null;

    protected async getHighchartsInstance(): Promise<typeof import('highcharts')> {
        if (this.highchartsInstance) return this.highchartsInstance;

        const Highcharts = (await import('highcharts')).default;

        this.highchartsInstance = Highcharts;

        return Highcharts;
    }

    // Called after the first render
    protected async firstUpdated() {
        super.firstUpdated();
    }

    // Add generic action buttons
    protected getButtons(): ActionItem[] {
        const baseButtons = super.getButtons(); // Get the base buttons
        const fileName = slugify(this.options.title ?? '');
        const newButtons: ActionItem[] = [
            {
                id: 'download-png',
                type: 'button',
                label: 'Download the chart as PNG',
                action: () =>
                    this.highchartsChart.exportChartLocal({
                        type: 'image/png',
                        filename: fileName,
                    }),
            },
            {
                id: 'download-svg',
                type: 'button',
                label: 'Download the chart as SVG',
                action: () =>
                    this.highchartsChart.exportChartLocal({
                        type: 'image/svg+xml',
                        filename: fileName,
                    }),
            },
            {
                id: 'download-pdf',
                type: 'button',
                label: 'Download the chart as PDF',
                action: () =>
                    this.highchartsChart.exportChartLocal({
                        type: 'application/pdf',
                        filename: fileName,
                    }),
            },
        ];

        return this.addButtons(baseButtons, newButtons, 'export', 'after');
    }

    protected async loadHighchartsModules(Highcharts): Promise<typeof import('highcharts')> {
        await Promise.all([import('highcharts/modules/accessibility')]);

        if (this.options.exportable ?? true) {
            await Promise.all([
                import('highcharts/modules/export-data'),
                import('highcharts/modules/exporting'),
            ]);
            await import('highcharts/modules/offline-exporting');
        }

        return Highcharts;
    }

    protected override async renderChart(container: HTMLElement): Promise<void> {
        // Load Highcharts
        const Highcharts = await this.getHighchartsInstance();

        // Load Highcharts modules
        await this.loadHighchartsModules(Highcharts);

        // Render the chart
        const chartMethod =
            typeof Highcharts.mapChart === 'function' ? Highcharts.mapChart : Highcharts.chart;
        const highchartsOptions = await this.getChartOptions();

        this.highchartsChart = chartMethod(container, highchartsOptions);
    }

    protected async getChartOptions(): Promise<Highcharts.Options> {
        const Highcharts = this.highchartsInstance;
        const colors = await this.getColors(
            this.options?.colorScheme ?? 'Standard',
            this.options?.colorSchemeOffset ?? 0,
            this.options?.reverseColorScheme ?? false,
            this.options?.mapDataClassesCount ?? undefined,
        );

        return {
            lang: lang_nl,
            exporting: {
                fallbackToExportServer: false,
                enabled: false,
            },
            credits: {
                enabled: true,
                text: this.options.source || '',
                href: this.options['source-url'] || '',
            },
            chart: {
                style: {
                    fontFamily: 'RO Sans, Arial, sans-serif',
                },
                backgroundColor: '#ffffff',
                spacingTop: 5,
                spacingBottom: 35,
                resetZoomButton: {
                    position: {
                        x: 0,
                        y: -35,
                    },
                    theme: {
                        fill: 'rgba(255,255,255,0.85)',
                        stroke: '#000000',
                        strokeWidth: '1px',
                        r: 0,
                        states: {
                            hover: {
                                stroke: '#1a77a5',
                                fill: '#1a77a5',
                                style: {
                                    color: 'white',
                                },
                            },
                        },
                    },
                },
            },
            colors: colors,
            title: {
                text: this.options.title || '',
                align: 'left',
                style: {
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#154273',
                },
                margin: 30,
            },
            subtitle: {
                text: this.options.subtitle || '',

                align: 'left',
                style: {
                    fontSize: '14px',
                    fontWeight: 'normal',
                    color: '#154273',
                    transform: 'translate(0, -7px)', //Prevent subtitle to be overwritten by multiple-line title
                },
            },
            caption: {
                useHTML: true,
                style: {
                    color: '#444444',
                    fontSize: '0.8em',
                },
            },
            xAxis: {
                lineWidth: 1.5,
                lineColor: '#535353',
                tickLength: 4,
                tickWidth: 1,
                tickColor: '#535353',
                title: {
                    text: '',
                    align: 'high',
                    style: {
                        fontSize: '13px',
                        color: '#154273',
                    },
                    y: -5,
                },
                labels: {
                    //optional automatically calculate step: https://stackoverflow.com/questions/44934154/xaxis-auto-label-dropping-has-stopped-working-after-upgrading-to-highcharts-5-0
                    autoRotation: [0, -30, -60],
                    overflow: 'allow',
                    padding: 1,
                    distance: 5,
                    style: {
                        fontSize: '12px',
                        color: '#535353',
                    },
                },
                crosshair: {
                    width: 1,
                    color: '#535353',
                    dashStyle: 'Dash',
                },
            },
            yAxis: {
                title: {
                    text: '',
                    align: 'high',
                    style: {
                        fontWeight: 'normal',
                        fontSize: '13px',
                        color: '#154273',
                        whiteSpace: 'nowrap',
                    },
                    rotation: 0,
                    y: -9,
                },
                labels: {
                    distance: 5,
                    style: {
                        fontSize: '13px',
                        color: '#535353',
                    },
                    formatter: function () {
                        return Highcharts.numberFormat(this.value as number, 0, ',', '.');
                    },
                },
                stackLabels: {
                    style: {
                        color: '#535353',
                        fontSize: '11px',
                        fontWeight: 'normal',
                        textOutline: '1px contrast',
                    },
                },
                lineWidth: 0,
                gridLineColor: '#3c3c3c',
                gridLineWidth: 0.25,
            },
            legend: {
                useHTML: true,
                alignColumns: false,
                margin: 0,
                squareSymbol: false,
                symbolWidth: 24,
                symbolHeight: 12,
                symbolRadius: 0,
                y: 12,
                itemStyle: {
                    fontWeight: 'normal',
                    fontSize: '13px',
                    color: '#535353',
                },
                itemHoverStyle: {
                    fontWeight: 'bold',
                    color: '#007bc7',
                },
                itemHiddenStyle: {
                    color: '#c8c8c8',
                    textDecoration: 'none', //to prevent the strikeThrough when the legenditem is disabled
                },
                align: 'left',
                x: 0,
                layout: 'horizontal',
                verticalAlign: 'bottom',
            },
            tooltip: {
                headerFormat: '<strong><large>{point.key}</large></strong><br>',
                style: {
                    fontSize: '13px',
                    color: '#000000',
                },
                pointFormat:
                    '<span style="color:{point.color}">\u25A0</span> {series.name}: <strong>{point.y}</strong><br/>',
                valueDecimals: 1,
                hideDelay: 0,
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderRadius: 0,
                borderColor: '#000000',
                shadow: false,
                shared: true,
            },
            plotOptions: {
                series: {
                    animation: {
                        duration: 800,
                    },
                    states: {
                        normal: {
                            animation: false,
                        },
                        hover: {
                            lineWidthPlus: 1,
                            halo: {
                                size: 0,
                            },
                            animation: {
                                duration: 0,
                            },
                        },
                        inactive: {
                            opacity: 0.3,
                            animation: {
                                duration: 0,
                            },
                        },
                    },
                    marker: {
                        lineColor: null,
                        states: {
                            hover: {
                                fillColor: '#ffffff',
                                lineWidth: 3,
                                radius: 5,
                            },
                        },
                    },
                    dataLabels: {
                        style: {
                            fontSize: '12px',
                            fontWeight: 'normal',
                            color: '#535353',
                        },
                    },
                },
                line: {
                    lineWidth: 1.5,
                    marker: {
                        symbol: 'circle',
                        enabled: false,
                        radius: 0,
                    },
                },
                spline: {
                    lineWidth: 1.5,
                    marker: {
                        symbol: 'circle',
                        enabled: false,
                        radius: 0,
                    },
                },
                area: {
                    lineWidth: 0.5,
                    marker: {
                        symbol: 'circle',
                        enabled: false,
                        radius: 0,
                    },
                },
                arearange: {
                    lineWidth: 0.5,
                    marker: {
                        symbol: 'circle',
                        enabled: false,
                        radius: 0,
                    },
                },
                scatter: {
                    marker: {
                        symbol: 'circle',
                    },
                },
                column: {
                    pointPadding: 0,
                    groupPadding: 0.1,
                    borderWidth: 0,
                    crisp: false,
                },
                bar: {
                    pointPadding: 0,
                    groupPadding: 0.1,
                    borderWidth: 0,
                    crisp: false,
                },
                heatmap: {
                    marker: {
                        lineColor: null,
                        states: {
                            hover: {
                                enabled: false,
                            },
                        },
                    },
                },
                errorbar: {
                    whiskerLength: 10,
                },
            },
        };
    }
}
