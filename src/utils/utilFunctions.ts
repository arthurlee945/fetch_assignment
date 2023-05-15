export function debounce(callback: (...args: any[]) => void, delay = 500) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

export function throttle<T>(callback: (...args: T[]) => void, delay = 500) {
    let waiting = false;
    let waitingArgs: T[] | null;

    const timeoutFunc = () => {
        if (waitingArgs == null) {
            waiting = false;
        } else {
            callback(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    };

    return (...args: T[]) => {
        if (waiting) {
            waitingArgs = args;
            return;
        }

        callback(...args);
        waiting = true;

        setTimeout(timeoutFunc, delay);
    };
}

export function basicThrottle(callback: (...args: unknown[]) => void, delay = 500) {
    let waiting = false;

    return (...args: unknown[]) => {
        if (waiting) return;

        callback(...args);
        waiting = true;

        setTimeout(() => {
            waiting = false;
        }, delay);
    };
}
