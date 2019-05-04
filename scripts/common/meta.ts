export interface IMeta {
    url: string;
    name: string;
    modules: { [module: string]: IMetaModule };
}

export interface IMetaModule {
    url: string;
    name: string;
    items: { [module: string]: IMetaModuleItem };
}

export interface IMetaModuleItem {
    path: string;
    name: string;
}