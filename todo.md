# TODO

- Make html.lang dynamic
- i18n components
- a11y action menu
- Docs
- Table
- Map
- Simple statistics
- PaletteOffset
- base_url see base-figere.ts
- Error handling
- Series functions
- Pick component implementation method:

```js
<script>
(function (currentScript) {
    const options = {
    dataSrc: './data/_kinkhoestmeldingen.json',
    xKey: 'Datum',
    yKey: 'Meldingen',
    type: 'composite',
    library: 'highcharts',
    sandbox: false,
    title: 'Kinkhoestmeldingen per maand, 2018-2025 (Composite)',
    source: 'Bron: RIVM, Osiris',
    xAxis: {
        zones: [
            {
                from: '2020-03-01',
                to: '2022-03-01',
                label: 'periode met corona maatregelen',
            },
            {
                from: '2024-11-01',
                to: '2025-01-01',
                label: 'Voorlopige cijfers',
            },
        ],
    },
    yAxis: {
        title: 'Aantal',
    },
    };
    currentScript.parentNode.insertBefore(
        Object.assign(document.createElement('rivm-smdv-figure'), {
        options,
    }),
    currentScript.nextSibling,
    );
    })(document.currentScript);
</script>
```

```js
<script type="module">
import { insertFigure } from './smdv-helper.js';

insertFigure(document.currentScript, {
    dataSrc: './data/_kinkhoestmeldingen.json',
    xKey: 'Datum',
    yKey: 'Meldingen',
    type: 'composite',
    library: 'highcharts',
    sandbox: false,
    title: 'Kinkhoestmeldingen per maand, 2018-2025 (Composite)',
    source: 'Bron: RIVM, Osiris',
    xAxis: { /* ... */ },
    yAxis: { /* ... */ }
});
</script>
```

```js
<rivm-smdv-figure
    data-src="./data/\_kinkhoestmeldingen.json"
    chart-type="composite"
    library="highcharts"
    sandbox="false"
    title="Kinkhoestmeldingen per maand, 2018-2025 (Composite)"
    source="Bron: RIVM, Osiris"
    >
    <script type="application/json" slot="config">
        {
            "xKey": "Datum",
            "yKey": "Meldingen",
            "xAxis": {
                "zones": [
                    {
                        "from": "2020-03-01",
                        "to": "2022-03-01",
                        "label": "periode met corona maatregelen"
                    },
                    {
                        "from": "2024-11-01",
                        "to": "2025-01-01",
                        "label": "Voorlopige cijfers"
                    }
                ]
            },
            "yAxis": {
                "title": "Aantal"
            }
        }
    </script>
</rivm-smdv-figure>
```

```js
<rivm-smdv-figure config-src="./chart-configs/kinkhoest.json"></rivm-smdv-figure>
```
