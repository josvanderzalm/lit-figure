export const dateStringToTimestamp = (dateString: string): number | string => {
    const parsedDateString = Date.parse(dateString);

    return isNaN(parsedDateString) ? dateString : parsedDateString;
};
