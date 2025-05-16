import type * as Highcharts from 'highcharts';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { HighchartsBaseChart } from '@/highcharts/base/base-chart';
import type { DataItem, Zone } from '@/types';

@customElement('highcharts-line')
export class HighchartsLine extends HighchartsBaseChart {
    private dateStringToTimestamp = (dateString: string): number | string => {
        const parsedDateString = Date.parse(dateString);

        return isNaN(parsedDateString) ? dateString : parsedDateString;
    };

    // Override to combine base options and additional chart options
    protected async getChartOptions(): Promise<Highcharts.Options> {
        const options = this.options;
        const data = this.getFigureData();
        const chartOptions: Highcharts.Options = {
            chart: {
                type: 'line',
                width: options.width === '100%' ? null : parseInt(options.width as string, 10),
                height: parseInt(options.height as string, 10) || 400,
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
                    data: data?.map((item: DataItem) => {
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
        };

        return this.deepmerge(await super.getChartOptions(), chartOptions);
    }

    // protected override async loadHighchartsModules(
    //     Highcharts,
    // ): Promise<typeof import('highcharts')> {
    //     await super.loadHighchartsModules(Highcharts);

    //     return Highcharts;
    // }

    render() {
        return html`<p>highcharts-line</p>
            ${super.render()}`;
    }
}
