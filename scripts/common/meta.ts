export const META: IMeta = (<any>window).META;

export interface IMeta {
    url: string;
    name: string;
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