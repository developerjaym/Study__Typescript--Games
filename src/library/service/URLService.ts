export class URLService {
    getSearchParam(param: string): string | null {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    route(paramName: string, paramValue: string): void {
        const urlParams = new URLSearchParams()
        urlParams.set(paramName, paramValue)
        window.location.search = urlParams.toString()
    }
}