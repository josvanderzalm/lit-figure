import deepmerge from 'deepmerge';
import type * as Highcharts from 'highcharts';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { HighchartsBaseChart } from '@/components/highcharts/highcharts-base-chart';
import type { ActionItem, DataItem, Zone } from '@/types';

@customElement('highcharts-small-multiple')
export class HighchartsSmallMultiple extends HighchartsBaseChart {
    private dateStringToTimestamp = (dateString: string): number | string => {
        const parsedDateString = Date.parse(dateString);

        return isNaN(parsedDateString) ? dateString : parsedDateString;
    };

    // Override to combine base options and additional chart options
    protected override getChartOptions(): Highcharts.Options {
        const options = this.options;
        const data = options.dataSet;
        const chartOptions: Highcharts.Options = {
            chart: {
                type: options.type || 'line',
                width: options.width === '100%' ? null : parseInt(options.width as string, 10),
                height: parseInt(options.height as string, 10) || 400,
            },
            title: {
                text: '',
            },
            subtitle: {
                text: '',
            },
            xAxis: {
                type: (options.xAxis as Highcharts.XAxisOptions)?.type,
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
            series: [
                {
                    type: 'line',
                    name: options.yKey || 'Data',
                    data: data.map((item: DataItem) => {
                        const x =
                            (options.xAxis as Highcharts.XAxisOptions)?.type === 'datetime'
                                ? this.dateStringToTimestamp(item[options.xKey] as string)
                                : item[options.xKey];
                        const y =
                            options['y-axis']?.type === 'datetime'
                                ? this.dateStringToTimestamp(item[options.yKey] as string)
                                : item[options.yKey];

                        return [x, y];
                    }),
                },
            ],
            exporting: {
                enabled: options.exportable !== undefined ? options.exportable : true,
            },
            credits: {
                enabled: true,
                text: options.source || '',
                href: options['source-url'] || '',
            },
        };

        return deepmerge(super.getChartOptions(), chartOptions);
    }

    // Remove buttons that are not compatible with this chart type
    override getButtons(): ActionItem[] {
        return this.unsetButtons(super.getButtons(), [
            'download-png',
            'download-svg',
            'download-pdf',
        ]);
    }

    // Override to import the Highcharts library and render the chart
    protected override async renderChart(container: HTMLElement): Promise<void> {
        const Highcharts = await this.getHighchartsInstance();

        await Promise.all([import('highcharts/modules/drilldown')]);
        Highcharts.chart(container, this.getChartOptions());
    }

    render() {
        return html`${this.getHtmlTitle()}
            <p>small-multiple</p>
            ${super.render()}`;
    }
}
