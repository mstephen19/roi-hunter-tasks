import { useCallback, useEffect, useState } from 'react';

export const useManagedClock = (
    initialDate: Date = new Date(),
    initialTimezoneOffset: number = new Date().getTimezoneOffset() / 60
): {
    date: Date;
    timezoneOffset: number;
    shiftForward: () => void;
    shiftBackward: () => void;
} => {
    const [date, setDate] = useState(initialDate);
    const [timezoneOffset, setTimezoneOffset] = useState(initialTimezoneOffset);

    // Grab the current UTC+0 time ms
    const getUTCMs = useCallback(() => Date.now() + initialTimezoneOffset * 60 * 6e4, [initialTimezoneOffset]);

    // Return a new date object based on UTC+0 time minus the offset
    const getDate = useCallback((offset: number) => new Date(getUTCMs() - offset * 60 * 6e4), [getUTCMs]);

    useEffect(() => {
        // Run interval every second setting the state
        const interval = setInterval(() => setDate(getDate(timezoneOffset)), 1e3);

        // Clear interval once component unmounts
        return () => clearInterval(interval);
    });

    return {
        date,
        // If the timezone offset is 0, just return 0. Otherwise, flip the offset
        timezoneOffset: timezoneOffset === 0 ? timezoneOffset : -timezoneOffset,
        shiftForward: () => setTimezoneOffset((prev) => prev - 1),
        shiftBackward: () => setTimezoneOffset((prev) => prev + 1),
    };
};
