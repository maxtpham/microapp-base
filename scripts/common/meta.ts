export interface IMeta {
    url: string;
    name: string;
    /** Current module */
    current: string;
    modules: { [module: string]: IMetaModule };
}

export interface IMetaModule {
    url: string;
    code: string;
    name: string;
    items: { [module: string]: IMetaModuleItem };
}

export interface IMetaModuleItem {
    path: string;
    code: string;
    name: string;
}

export function META(): IMeta {
    return (<any>window).META;
}