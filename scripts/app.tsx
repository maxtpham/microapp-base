import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container, Menu, Divider, Grid, Form, Table, Checkbox, Button, Icon, Sidebar, Segment, Header, Responsive, MenuItemProps, Popup, Dropdown } from 'semantic-ui-react';
import { config } from './config';

require('../styles/global.css');
import {IAppCss as appcss} from '../../styles/app.css';
const styles: appcss = require('../../styles/app.css');

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import session from './master/reducers';
import Master from "./master";
import { IMasterState } from "./master/types";
import { JwtToken } from '@gtm/lib.client.user';
import { IMasterLayoutProps } from './master/layout';

export interface IState extends IMasterState {
}

export default (props: {jwtToken: JwtToken, masterLayout?: React.ComponentClass<IMasterLayoutProps> | React.FunctionComponent<IMasterLayoutProps>}) => {
    const rootReducers = combineReducers({ session });
    const initialState: IState = { session: { collapsed: false, profile: !props.jwtToken ? undefined : { id: props.jwtToken.session, name: props.jwtToken.name } } };
    const rootStore = createStore(rootReducers, initialState);
    return <Provider store={rootStore}>
        <Router basename={config.home}>
            <Master {...props} />
        </Router>
    </Provider>;
};