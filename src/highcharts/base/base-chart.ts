import type * as Highcharts from 'highcharts';

import { HighchartsBase } from '@/highcharts/base/base';

export class HighchartsBaseChart extends HighchartsBase {
    private highchartsBaseChartOptions: Highcharts.Options = {
        chart: {
            type: 'line',
        },
    };

    protected async getChartOptions(): Promise<Highcharts.Options> {
        return this.mergeOptions(await super.getChartOptions(), this.highchartsBaseChartOptions);
    }
}
