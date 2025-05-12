import type { DataArray } from '@/types';

export function convertToSeries(data: DataArray[], xKey: string, yKey: string, seriesKey: string) {
    const categories = [...new Set(data.map((item) => item[xKey]))];
    const grouped: Record<string, Record<string, unknown>> = {};

    data.forEach((item) => {
        if (!grouped[item[seriesKey]]) {
            grouped[item[seriesKey]] = {};
        }
        grouped[item[seriesKey]][item[xKey]] = item[yKey];
    });

    const series = Object.entries(grouped).map(([category, values]) => {
        return {
            name: category,
            data: categories.map((mvalue) => values[mvalue] ?? null),
        };
    });

    return {
        categories,
        series,
    };
}
