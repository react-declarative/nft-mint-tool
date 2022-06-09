export const waitForEvent = (event = 'load') => new Promise<void>((res) => {
    window.addEventListener(event, () => res(), {
        once: true,
    });
});

export default waitForEvent;
