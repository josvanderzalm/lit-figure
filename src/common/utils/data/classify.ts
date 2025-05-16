import { ckmeans, equalIntervalBreaks, jenks } from 'simple-statistics';

/**
 * Classifies numeric data into breakpoints based on the given method.
 *
 * @param data - Array of numeric values
 * @param method - Classification method
 * @param numberOfClasses - Number of classes to create
 * @param manualBreaks - Optional manual breakpoints (only used if method is 'manual')
 * @returns Array of class breakpoints
 */
export function classifyData(
    data: number[],
    method: 'equalInterval' | 'quantile' | 'jenks' | 'ckmeans' | 'manual',
    numberOfClasses: number = 5,
    manualBreaks: number[] = [],
): number[] {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Data must be a non-empty array of numbers.');
    }

    const sortedData = [...data].sort((a, b) => a - b);

    switch (method) {
        case 'equalInterval':
            return equalIntervalBreaks(sortedData, numberOfClasses);

        case 'quantile': {
            const breaks: number[] = [sortedData[0]];

            for (let i = 1; i < numberOfClasses; i++) {
                const qIndex = Math.floor(i * (sortedData.length / numberOfClasses));

                breaks.push(sortedData[qIndex]);
            }
            breaks.push(sortedData[sortedData.length - 1]);

            return Array.from(new Set(breaks)).sort((a, b) => a - b);
        }

        case 'jenks':
            return jenks(sortedData, numberOfClasses);

        case 'ckmeans': {
            const clusters: number[][] = ckmeans(sortedData, numberOfClasses);
            const breaks: number[] = clusters.map((c) => c[0]);
            const lastValue: number = clusters[clusters.length - 1].slice(-1)[0];

            return [...breaks, lastValue];
        }

        case 'manual':
            if (!manualBreaks || manualBreaks.length < 2) {
                throw new Error('Manual breaks must be an array with at least two values.');
            }

            return manualBreaks.slice().sort((a, b) => a - b);

        default:
            throw new Error(`Unknown method: ${method}`);
    }
}
