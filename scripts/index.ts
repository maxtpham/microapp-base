import "reflect-metadata";
import * as React from 'react';
import { main } from "./main";
import * as auth from './common/auth';
import { JwtToken } from '@gtm/lib.client.user';
import { IMasterLayoutProps } from './master/layout';

import loadjs from "load-js";
import { config } from "./config";
import { IMeta } from "./common/meta";

// Do not use react rendering code here, this will lead to index.ts will load all the react classes (from import/requires) before this request.post code run
export async function startup(masterLayout?: React.ComponentClass<IMasterLayoutProps> | React.FunctionComponent<IMasterLayoutProps>): Promise<void> {
    try {
        await loadjs([config.services.base + '/meta.js']);

        const modules = ((window as any).META as IMeta).modules;
        try {
            await loadjs(Object.getOwnPropertyNames(modules).map(code => modules[code].url + '/meta.js'));
        } catch (e2) {
            console.error('Load META:MODULE error', e2);
        }
    } catch (e) {
        console.error('Load META:BASE error', e);        
    }

    let jwtToken: JwtToken = await auth.token();
    main(jwtToken, masterLayout);
}