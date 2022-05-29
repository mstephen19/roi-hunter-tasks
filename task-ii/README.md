# Task

Implement a custom hook

## Notes

- I decided to create a function which calculates the current milliseconds of UTC+0 time and basing all new calculations off of that rather than off the local time.
- Both the `getUTCMs` and `getDate` functions have been placed into `useCallback` functions in order to optimize since this hook changes its state every second
- Didn't forget the cleanup in the useEffect :D
