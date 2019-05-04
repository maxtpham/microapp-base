import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from 'react-router-dom'

require('../../styles/global.css');
import {IAppCss as appcss} from '../../../styles/app.css';

import { connect } from 'react-redux';
const styles: appcss = require('../../../styles/app.css');

import { IMasterState, IMasterStateSession } from './types';
import * as actions from "./actions";
import Layout, { IMasterLayoutProps } from "./layout";

interface StateFromProps {
    session: IMasterStateSession;
    masterLayout?: React.ComponentClass<IMasterLayoutProps> | React.FunctionComponent<IMasterLayoutProps>;
}

interface DispatchFromProps {
    toggle;
}

export default withRouter(connect<StateFromProps, DispatchFromProps, void>(
    (state: IMasterState) => ({
        session: state.session
    }),
    {
        toggle: actions.toggle
    }
)((props: StateFromProps & DispatchFromProps) => {
    if (!!props.masterLayout) {
        return (props.masterLayout as any)({collapsed: props.session.collapsed, toggle:props.toggle, username:!props.session.profile ? undefined : props.session.profile.name});
    } else {
        return <Layout collapsed={props.session.collapsed} toggle={props.toggle} username={!props.session.profile ? undefined : props.session.profile.name} />;
    }
}) as any);