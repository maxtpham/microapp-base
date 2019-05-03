import "reflect-metadata";
import * as React from 'react';
import { main } from "./main";
import * as auth from './common/auth';
import { JwtToken } from '@gtm/lib.client.user';
import { IMasterLayoutProps } from './app/.master/layout';

// Do not use react rendering code here, this will lead to index.ts will load all the react classes (from import/requires) before this request.post code run
export async function startup(masterLayout?: React.ComponentClass<IMasterLayoutProps> | React.FunctionComponent<IMasterLayoutProps>): Promise<void> {
    let jwtToken: JwtToken = await auth.token();
    main(jwtToken, masterLayout);
}