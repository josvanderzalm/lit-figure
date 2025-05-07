import type * as Highcharts from 'highcharts';
import { html } from 'lit';

import { BaseChart } from '@/components/common/base/base-figure';

export class HighchartsBase extends BaseChart {
    protected baseOptions: Highcharts.Options = {
        title: { text: '' },
        credits: { enabled: false },
    };

    protected getChartOptions(): Highcharts.Options {
        return this.baseOptions;
    }

    render() {
        return html`====${super.render()}`;
    }
}
