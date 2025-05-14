import type * as Highcharts from 'highcharts';
import { customElement } from 'lit/decorators.js';

import { HighchartsBaseMap } from '@/components/highcharts/highcharts-base-map';

@customElement('highcharts-map')
export class HighchartsMap extends HighchartsBaseMap {
    private geojson: Highcharts.GeoJSON = null;

    override async connectedCallback(): Promise<void> {
        super.connectedCallback();
        await this.loadGeojson();
        this.requestUpdate(); // re-render once map is loaded
    }

    private async loadGeojson(): Promise<void> {
        const response = await fetch('http://localhost:5173/assets/shapes/gm_2025.geojson');

        if (!response.ok) {
            console.error('Failed to load map data');

            return;
        }
        this.geojson = await response.json();
    }

    protected override getChartOptions(): Highcharts.Options {
        //const options = this.options;
        //const data = this.getFigureData();
        const data: [string, number][] = [
            ['GM1680', 728],
            ['GM0363', 710],
            ['GM0503', 963],
            ['GM0738', 541],
            ['GM1700', 622],
            ['GM0200', 866],
            ['GM0384', 398],
            // Add more data that matches actual gm_code values in your GeoJSON
        ];
        const chartOptions: Highcharts.Options = {
            chart: {
                map: this.geojson,
            },

            title: {
                text: 'GeoJSON in Highmaps',
            },

            accessibility: {
                typeDescription: 'Map of the Netherlands',
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom',
                },
            },

            colorAxis: {
                tickPixelInterval: 100,
            },

            series: [
                {
                    type: 'map',
                    data: data,
                    keys: ['gm_code', 'value'],
                    joinBy: 'gm_code',
                    name: 'Random data',
                },
            ],
        };

        return this.deepmerge(super.getChartOptions(), chartOptions);
    }

    // render() {
    //     return html`
    //         ${!this.geojson ? html`<p>Bezig met laden van kaartgegevens...</p>` : super.render()}
    //     `;
    // }
}
