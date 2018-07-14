import humanFormat from 'human-format';

export default function(seconds) {
    if (typeof seconds !== 'number') {
        return seconds;
    }

    const timeScale = new humanFormat.Scale({
        sec: 1,
        min: 60,
        h: 3600,
        d: 86400,
        mo: 2592000
    });
    return humanFormat(seconds, {scale: timeScale});
}
