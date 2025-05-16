export function colorOffset(
    colorScheme: string[],
    offset: number | undefined,
    reverse: boolean = false,
): string[] {
    const colors = reverse ? [...colorScheme].reverse() : colorScheme;
    const len = colors.length;
    const normalizedOffset = ((offset % len) + len) % len; // handles negative offsets

    return [...colors.slice(normalizedOffset), ...colors.slice(0, normalizedOffset)];
}
