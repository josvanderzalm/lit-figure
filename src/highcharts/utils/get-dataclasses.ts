import { hexToRgb, interpolateColor } from '@/color/utils';
import { classifyData, roundTo } from '@/common/utils';

/**
 * Generate Highcharts-compatible dataClasses with names and interpolated colors.
 *
 * @param data - Array of numeric values to classify
 * @param method - Classification method to use (e.g., 'ckmeans', 'equalInterval', etc.)
 * @param numberOfClasses - Number of classes to generate (default: 5)
 * @param minColor - Start color (hex or rgb) (e.g. '#f7fbff')
 * @param maxColor - End color (hex or rgb) (e.g. '#08306b')
 * @param decimals - Number of decimals to round the class bounds
 * @param locale - Optional locale for formatting (default: 'nl-NL')
 */
export function getHighchartsDataClasses(
    data: number[],
    method: 'equalInterval' | 'quantile' | 'jenks' | 'ckmeans' | 'manual' = 'equalInterval',
    numberOfClasses: number = 5,
    minColor: string = '#f7fbff',
    maxColor: string = '#08306b',
    decimals: number = 1,
    locale: string = 'nl-NL',
): Array<{ from?: number; to?: number; name: string; color: string }> {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Data must be a non-empty array of numbers.');
    }

    // Use classifyData to get the breakpoints based on the chosen method
    const breaks = classifyData(data, method, numberOfClasses);

    if (breaks.length < 2) {
        throw new Error('At least two breakpoints are required to create data classes.');
    }

    const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
    const steps = breaks.length - 1;
    const minRGB = hexToRgb(minColor);
    const maxRGB = hexToRgb(maxColor);
    const dataClasses = [];

    for (let i = 0; i < steps; i++) {
        const from = roundTo(breaks[i], decimals);
        const to = roundTo(breaks[i + 1], decimals);
        const name = `${formatter.format(from)} – ${formatter.format(to)}`;
        const color = interpolateColor(minRGB, maxRGB, i / (steps - 1));

        dataClasses.push({ from, to, name, color });
    }

    return dataClasses;
}
