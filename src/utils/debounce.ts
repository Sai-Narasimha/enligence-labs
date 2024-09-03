

const debounce = (
    func: any,
    delay: number
) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    return (...args: any) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export default debounce;