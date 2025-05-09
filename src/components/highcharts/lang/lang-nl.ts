const lang_nl = {
    viewFullscreen: 'Bekijk op volledig scherm',
    exitFullscreen: 'Verlaat volledig scherm',
    printChart: 'Grafiek afdrukken',
    downloadPNG: 'Download PNG-afbeelding',
    downloadJPEG: 'Download JPEG-afbeelding',
    downloadPDF: 'Download PDF-document',
    downloadSVG: 'Download SVG-vectorafbeelding',
    contextButtonTitle: 'Contextmenu van de grafiek',
    loading: 'Laden...',
    numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
    resetZoom: 'Zoom resetten',
    resetZoomTitle: 'Zoomniveau resetten 1:1',
    accessibility: {
        defaultChartTitle: 'Grafiek',
        chartContainerLabel: '{title}. Highcharts interactieve grafiek.',
        svgContainerLabel: 'Interactieve grafiek',
        drillUpButton: '{buttonText}',
        credits: 'Grafiekcredits: {creditsStr}',
        thousandsSep: '.',
        svgContainerTitle: '',
        graphicContainerLabel: '',
        screenReaderSection: {
            beforeRegionLabel: '',
            afterRegionLabel: '',
            annotations: {
                heading: 'Samenvatting van grafiekaantekeningen',
                descriptionSinglePoint: '{annotationText}. Gerelateerd aan {annotationPoint}',
                descriptionMultiplePoints:
                    '{annotationText}. Gerelateerd aan {annotationPoint}{#each additionalAnnotationPoints}, ook gerelateerd aan {this}{/each}',
                descriptionNoPoints: '{annotationText}',
            },
            endOfChartMarker: 'Einde van interactieve grafiek.',
        },
        sonification: {
            playAsSoundButtonText: 'Speel af als geluid, {chartTitle}',
            playAsSoundClickAnnouncement: 'Afspelen',
        },
        legend: {
            legendLabelNoTitle: 'Wissel zichtbaarheid van reeks, {chartTitle}',
            legendLabel: 'Legenda van de grafiek: {legendTitle}',
            legendItem: '{itemName} weergeven',
        },
        zoom: {
            mapZoomIn: 'Inzoomen op grafiek',
            mapZoomOut: 'Uitzoomen op grafiek',
            resetZoomButton: 'Zoom resetten',
        },
        rangeSelector: {
            dropdownLabel: '{rangeTitle}',
            minInputLabel: 'Selecteer startdatum.',
            maxInputLabel: 'Selecteer einddatum.',
            clickButtonAnnouncement: 'Bekijk {axisRangeDescription}',
        },
        navigator: {
            handleLabel: '{#eq handleIx 0}Start, procent{else}Einde, procent{/eq}',
            groupLabel: 'Aszoom',
            changeAnnouncement: '{axisRangeDescription}',
        },
        table: {
            viewAsDataTableButtonText: 'Bekijk als datatabel, {chartTitle}',
            tableSummary: 'Tabelweergave van de grafiek.',
        },
        announceNewData: {
            newDataAnnounce: 'Bijgewerkte gegevens voor grafiek {chartTitle}',
            newSeriesAnnounceSingle: 'Nieuwe gegevensreeks: {seriesDesc}',
            newPointAnnounceSingle: 'Nieuw datapunt: {pointDesc}',
            newSeriesAnnounceMultiple:
                'Nieuwe gegevensreeksen in grafiek {chartTitle}: {seriesDesc}',
            newPointAnnounceMultiple: 'Nieuwe datapunten in grafiek {chartTitle}: {pointDesc}',
        },
        seriesTypeDescriptions: {
            boxplot:
                'Boxplotgrafieken worden meestal gebruikt om groepen statistische gegevens weer te geven. Elk datapunt in de grafiek kan maximaal 5 waarden hebben: minimum, onderste kwartiel, mediaan, bovenste kwartiel en maximum.',
            arearange:
                'Arearange-grafieken zijn lijngrafieken die een bereik tonen tussen een minimale en maximale waarde per punt.',
            areasplinerange:
                'Deze grafieken zijn vloeiende lijngrafieken die een bereik tonen tussen een minimale en maximale waarde per punt.',
            bubble: 'Bubbeldiagrammen zijn spreidingsdiagrammen waarbij elk datapunt ook een groottewaarde heeft.',
            columnrange:
                'Columnrange-grafieken zijn kolomgrafieken die een bereik tonen tussen een minimale en maximale waarde per punt.',
            errorbar:
                'Foutbalkreeksen worden gebruikt om de variabiliteit in de gegevens weer te geven.',
            funnel: 'Trechtergrafieken worden gebruikt om de afname van gegevens in fasen weer te geven.',
            pyramid:
                'Piramidegrafieken bestaan uit een enkele piramide waarbij de hoogte van elk onderdeel overeenkomt met de waarde van het punt.',
            waterfall:
                'Watervaldiagrammen zijn kolomgrafieken waarbij elke kolom bijdraagt aan een totale eindwaarde.',
        },
        chartTypes: {
            emptyChart: 'Lege grafiek',
            mapTypeDescription: 'Kaart van {mapTitle} met {numSeries} gegevensreeksen.',
            unknownMap: 'Kaart van een niet-gespecificeerd gebied met {numSeries} gegevensreeksen.',
            combinationChart: 'Combinatiegrafiek met {numSeries} gegevensreeksen.',
            defaultSingle:
                'Grafiek met {numPoints} {#eq numPoints 1}datapunt{else}datapunten{/eq}.',
            defaultMultiple: 'Grafiek met {numSeries} gegevensreeksen.',
            splineSingle:
                'Lijngrafiek met {numPoints} {#eq numPoints 1}datapunt{else}datapunten{/eq}.',
            splineMultiple: 'Lijngrafiek met {numSeries} lijnen.',
            lineSingle:
                'Lijngrafiek met {numPoints} {#eq numPoints 1}datapunt{else}datapunten{/eq}.',
            lineMultiple: 'Lijngrafiek met {numSeries} lijnen.',
            columnSingle: 'Kolomgrafiek met {numPoints} {#eq numPoints 1}kolom{else}kolommen{/eq}.',
            columnMultiple: 'Kolomgrafiek met {numSeries} gegevensreeksen.',
            barSingle: 'Staafgrafiek met {numPoints} {#eq numPoints 1}staaf{else}staven{/eq}.',
            barMultiple: 'Staafgrafiek met {numSeries} gegevensreeksen.',
            pieSingle:
                'Cirkeldiagram met {numPoints} {#eq numPoints 1}segment{else}segmenten{/eq}.',
            pieMultiple: 'Cirkeldiagram met {numSeries} cirkeldiagrammen.',
            scatterSingle:
                'Spreidingsdiagram met {numPoints} {#eq numPoints 1}punt{else}punten{/eq}.',
            scatterMultiple: 'Spreidingsdiagram met {numSeries} gegevensreeksen.',
            boxplotSingle: 'Boxplot met {numPoints} {#eq numPoints 1}box{else}boxen{/eq}.',
            boxplotMultiple: 'Boxplot met {numSeries} gegevensreeksen.',
            bubbleSingle:
                'Bubbeldiagram met {numPoints} {#eq numPoints 1}bubbel{else}bubbels{/eq}.',
            bubbleMultiple: 'Bubbeldiagram met {numSeries} gegevensreeksen.',
        },
        axis: {
            xAxisDescriptionSingular:
                'De grafiek heeft 1 X-as die {names[0]} weergeeft. {ranges[0]}',
            xAxisDescriptionPlural:
                'De grafiek heeft {numAxes} X-assen die {#each names}{#unless @first},{/unless}{#if @last} en{/if} {this}{/each} weergeven.',
            yAxisDescriptionSingular:
                'De grafiek heeft 1 Y-as die {names[0]} weergeeft. {ranges[0]}',
            yAxisDescriptionPlural:
                'De grafiek heeft {numAxes} Y-assen die {#each names}{#unless @first},{/unless}{#if @last} en{/if} {this}{/each} weergeven.',
            timeRangeDays: 'Gegevensbereik: {range} dagen.',
            timeRangeHours: 'Gegevensbereik: {range} uur.',
            timeRangeMinutes: 'Gegevensbereik: {range} minuten.',
            timeRangeSeconds: 'Gegevensbereik: {range} seconden.',
            rangeFromTo: 'Gegevens lopen van {rangeFrom} tot {rangeTo}.',
            rangeCategories: 'Gegevensbereik: {numCategories} categorieën.',
        },
        exporting: {
            chartMenuLabel: 'Grafiekmenu',
            menuButtonLabel: 'Bekijk grafiekmenu, {chartTitle}',
        },
        series: {
            summary: {
                default:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}gegeven{else}gegevens{/eq}.',
                defaultCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}gegeven{else}gegevens{/eq}.',
                line: '{series.name}, lijn {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}gegeven{else}gegevens{/eq}.',
                lineCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Lijn met {series.points.length} {#eq series.points.length 1}gegeven{else}gegevens{/eq}.',
                spline: '{series.name}, lijn {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}gegeven{else}gegevens{/eq}.',
                splineCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Lijn met {series.points.length} {#eq series.points.length 1}gegeven{else}gegevens{/eq}.',
                column: '{series.name}, kolommenreeks {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}kolom{else}kolommen{/eq}.',
                columnCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Kolommenreeks met {series.points.length} {#eq series.points.length 1}kolom{else}kolommen{/eq}.',
                bar: '{series.name}, staafreeks {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}staaf{else}staven{/eq}.',
                barCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Staafreeks met {series.points.length} {#eq series.points.length 1}staaf{else}staven{/eq}.',
                pie: '{series.name}, taartdiagram {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}schijf{else}schijven{/eq}.',
                pieCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Taartdiagram met {series.points.length} {#eq series.points.length 1}schijf{else}schijven{/eq}.',
                scatter:
                    '{series.name}, spreidingsdiagram {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}punt{else}punten{/eq}.',
                scatterCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}, spreidingsdiagram met {series.points.length} {#eq series.points.length 1}punt{else}punten{/eq}.',
                boxplot:
                    '{series.name}, boxplot {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}box{else}boxen{/eq}.',
                boxplotCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Boxplot met {series.points.length} {#eq series.points.length 1}box{else}boxen{/eq}.',
                bubble: '{series.name}, bubbeldiagram {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}bubbel{else}bubbels{/eq}.',
                bubbleCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Bubbeldiagram met {series.points.length} {#eq series.points.length 1}bubbel{else}bubbels{/eq}.',
                map: '{series.name}, kaart {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}gebied{else}gebieden{/eq}.',
                mapCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Kaart met {series.points.length} {#eq series.points.length 1}gebied{else}gebieden{/eq}.',
                mapline:
                    '{series.name}, lijn {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}gegeven{else}gegevens{/eq}.',
                maplineCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Lijn met {series.points.length} {#eq series.points.length 1}gegeven{else}gegevens{/eq}.',
                mapbubble:
                    '{series.name}, bubbeldiagram {seriesNumber} van {chart.series.length} met {series.points.length} {#eq series.points.length 1}bubbel{else}bubbels{/eq}.',
                mapbubbleCombination:
                    '{series.name}, reeks {seriesNumber} van {chart.series.length}. Bubbeldiagram met {series.points.length} {#eq series.points.length 1}bubbel{else}bubbels{/eq}.',
            },
            description: '{description}',
            xAxisDescription: 'X-as, {name}',
            yAxisDescription: 'Y-as, {name}',
            nullPointValue: 'Geen waarde',
            pointAnnotationsDescription: '{#each annotations}Annotatie: {this}{/each}',
        },
    },
    mainBreadcrumb: 'Hoofd',
    downloadCSV: 'Download CSV',
    downloadXLS: 'Download XLS',
    exportData: {
        annotationHeader: 'Annotaties',
        categoryHeader: 'Categorie',
        categoryDatetimeHeader: 'Datum/tijd',
    },
    viewData: 'Toon datatabel',
    hideData: 'Verberg datatabel',
    exportInProgress: 'Bezig met exporteren...',
};

export default lang_nl;
