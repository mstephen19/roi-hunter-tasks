import { useManagedClock } from '../hooks';

const Clock = () => {
    const { date, timezoneOffset, shiftForward, shiftBackward } = useManagedClock();

    return (
        <div className='container text-center p-3'>
            <h3>
                Current date is {date.toLocaleString('cs-CZ')} UTC
                {timezoneOffset >= 0 ? '+' : ''}
                {timezoneOffset.toLocaleString('cs-CZ', {
                    minimumIntegerDigits: 2,
                })}
                :00
            </h3>
            <button className='btn btn-primary mr-2' onClick={shiftBackward}>
                Timezone--
            </button>
            <button className='btn btn-primary' onClick={shiftForward}>
                Timezone++
            </button>
        </div>
    );
};

export default Clock;
