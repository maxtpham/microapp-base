import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from "./app";
import { JwtToken } from "@gtm/lib.client.user";
import { IMasterLayoutProps } from './master/layout';

export function main(jwtToken: JwtToken, masterLayout?: React.ComponentClass<IMasterLayoutProps> | React.FunctionComponent<IMasterLayoutProps>) {
    ReactDOM.render(<App jwtToken={jwtToken} masterLayout={masterLayout} />, document.getElementById('content'));
}