export const config: IAppConfig = (<any>window).config;

export interface IAppConfig {
    /** Root URL for the web */
    url: string;

    /** Home path (without RootUrl) */
    home?: string;

    /** Map all the service Url, if null the rootUrl will be used instead */
    services?: {
        base: string;
    };

    /** Internal calculated: home + url */
    homeUrl: string;
}

// Internal calculated configurations
if (!config.home) config.home = '/';
if (!config.homeUrl) config.homeUrl = !config.home ? config.url : (config.url + config.home);
if (!config.services) config.services = {} as any;
if (!config.services.base) config.services.base = config.url;