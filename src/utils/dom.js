export const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        (rect.top >= 0 || rect.bottom >= 0) 
        &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}