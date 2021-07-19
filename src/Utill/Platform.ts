export function isMobilePlatform() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /Macintosh/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
export function isIOS(){
    const toMatch = [
        /Macintosh/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
    ];
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}