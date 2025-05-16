export function rgbToHex([r, g, b]: [number, number, number]): string {
    return (
        '#' +
        [r, g, b]
            .map((c) => {
                const hex = Math.round(c).toString(16);

                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
    );
}
