// Highcharts Line
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { HighchartsBaseChart } from '@/components/highcharts/hicharts-base-chart';
import type { Options } from '@/types';

@customElement('highcharts-line')
export class HighchartsLine extends HighchartsBaseChart {
    async generateHighchartsOptions(
        options: Options,
    ): Promise<Highcharts.Options | null> {
        try {
            const data = options.dataSet;

            interface Zone {
                from: string;
                to: string;
                label?: string;
            }

            interface DataItem {
                [key: string]: any;
            }

            return {
                chart: {
                    type: options.type || 'line',
                    animation:
                        options.animation !== undefined
                            ? options.animation
                            : false,
                    width:
                        options.width === '100%'
                            ? null
                            : parseInt(options.width as string, 10),
                    height: parseInt(options.height as string, 10) || 400,
                },
                plotOptions: {
                    series: {
                        animation:
                            options.animation !== undefined
                                ? options.animation
                                : false,
                    },
                },
                title: {
                    text: options.title || '',
                },
                subtitle: {
                    text: options.subtitle || '',
                },
                xAxis: {
                    type: options.xAxis?.type || 'datetime',
                    title: {
                        text: options.xAxis?.title || '',
                    },
                    plotBands:
                        options.xAxis?.zones?.map((zone: Zone) => ({
                            from: this.dateStringToTimestamp(zone.from),
                            to: this.dateStringToTimestamp(zone.to),
                            color: 'rgba(200, 200, 200, 0.2)',
                            label: {
                                text: zone.label,
                                style: {
                                    color: '#666',
                                    fontSize: '10px',
                                },
                            },
                        })) || [],
                },
                yAxis: {
                    title: {
                        text: options['y-axis']?.title || '',
                    },
                },
                tooltip: options.tooltip || {},
                legend: options.legend || false,
                series: [
                    {
                        name: options.yKey || 'Data',
                        data: data.map((item: DataItem) => {
                            const x =
                                options.xAxis?.type === 'datetime'
                                    ? dateStringToTimestamp(item[options.xKey])
                                    : item[options.xKey];
                            const y =
                                options['y-axis']?.type === 'datetime'
                                    ? dateStringToTimestamp(item[options.yKey])
                                    : item[options.yKey];
                            return [x, y];
                        }),
                    },
                ],
                exporting: {
                    enabled:
                        options.exportable !== undefined
                            ? options.exportable
                            : true,
                },
                credits: {
                    enabled: true,
                    text: options.source || '',
                    href: options['source-url'] || '',
                },
            };
        } catch (error) {
            console.error('Error fetching or processing data:', error);
            return null;
        }
    }
    dateStringToTimestamp = (dateString: string): number | string => {
        const parsedDateString = Date.parse(dateString);
        return isNaN(parsedDateString) ? dateString : parsedDateString;
    };

    async renderChart(container: HTMLElement) {
        // load Highcharts dynamically
        const Highcharts = (await import('highcharts')).default;

        // Dynamically load and initialize required modules
        await Promise.all([
            import('highcharts/modules/accessibility'),
            import('highcharts/modules/drilldown'),
            import('highcharts/modules/export-data'),
            import('highcharts/modules/exporting'),
            import('highcharts/modules/offline-exporting'),
        ]);

        const hcOptions = await this.generateHighchartsOptions(this.options);

        Highcharts.chart(container, hcOptions);
    }
    render() {
        return html`${this.options.title}yyyyy${super.render()}`;
    }
}
