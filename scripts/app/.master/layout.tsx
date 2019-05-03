import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from 'react-router-dom'
import { Image, Container, Menu, Divider, Grid, Form, Table, Checkbox, Button, Icon, Sidebar, Segment, Header, Responsive, MenuItemProps, Popup, Dropdown } from 'semantic-ui-react';

import * as auth from '../../common/auth';

import Home from "../other/home";
import HomeHeader from "../other/home/header";
import Profile from "../other/profile";
import ProfileHeader from "../other/profile/header";

import Document from "../help/document";
import DocumentHeader from "../help/document/header";
import About from "../help/about";
import AboutHeader from "../help/about/header";

export interface IMasterLayoutProps {
    collapsed?: boolean;
    toggle: () => void;
    username?: string;
}

export default (props: IMasterLayoutProps) => (
    <div className={(typeof(props.collapsed) === 'undefined' || props.collapsed === null || !props.collapsed) ? 'mbb-menu-expand' : 'mbb-menu-collapse'}>
        <header className='mbb-table mbb-header'>
            {!!props.username && <div className='mbb-cell mbb-brand'>
                <div className='mbb-table'>
                    <div className='mbb-cell mbb-logo'><NavLink to='/'><span className='mbb-text'>MicroApp<sup>&reg;</sup></span></NavLink></div>
                    <div className='mbb-cell mbb-toggle'><a className='mbb-toggler' onClick={props.toggle}><i className='big sidebar icon'></i><i className='big unordered list icon'></i><i className='remove big icon'></i></a></div>
                </div>
            </div>}
            <div className='mbb-cell mbb-toolbar'>
                <Menu size='huge' secondary>
                    <Menu.Item>
                        {!props.username && (<span>MicroApp<sup>&reg;</sup> PoC</span>)}

                        {!!props.username && (<Route path='/document' component={DocumentHeader} />)}
                        {!!props.username && (<Route path='/about' component={AboutHeader} />)}

                        {!!props.username && (<Route path='/' exact component={HomeHeader} />)}
                        {!!props.username && (<Route path='/profile' component={ProfileHeader} />)}
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Dropdown item trigger={!!props.username ? (<span> <Icon name='user'/>Hi, {props.username}</span>) : (<span><Icon size='large' name='user circle'/>Login</span>)}>
                            {!!props.username ?
                            (<Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to='/profile'><Icon name='id card outline'/>Profile</Dropdown.Item>
                                <Divider/>
                                <Dropdown.Item onClick={(e, d) => auth.logout().then(loggedout => loggedout ? location.reload() : alert('Failed to logout')).catch(alert)}><Icon name='sign out'/>Logout</Dropdown.Item>
                            </Dropdown.Menu>) :
                            (<Dropdown.Menu>
                                <Dropdown.Item onClick={(e, d) => auth.login().then(loggedin => loggedin ? location.reload() : alert('Failed to login')).catch(alert)}><Icon name='sign in'/>Login</Dropdown.Item>
                            </Dropdown.Menu>)}
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            </div>
        </header>
        <div className='mbb-body'>
            {!!props.username && <div className='mbb-menu'>
                <Menu size='massive' inverted secondary vertical fluid>
                    <Menu.Item>
                        <Menu.Header><span className='mbb-menu-header1'>Help</span><span className='mbb-menu-header2'>____</span></Menu.Header>
                        <Menu.Menu>
                            <Menu.Item as={NavLink} to='/document' name='document'><span className='mbb-menu-item1'><Icon name='help circle'/>Document</span><span className='mbb-menu-item2'><Popup trigger={<Icon name='help circle'/>} content='Document' position='right center' inverted/></span></Menu.Item>
                            <Menu.Item as={NavLink} to='/about' name='about'><span className='mbb-menu-item1'><Icon name='info'/>About</span><span className='mbb-menu-item2'><Popup trigger={<Icon name='info'/>} content='About' position='right center' inverted/></span></Menu.Item>
                            <Menu.Item as={NavLink} to='/' exact name='home'><span className='mbb-menu-item1'><Icon name='home'/>Home</span><span className='mbb-menu-item2'><Popup trigger={<Icon name='home'/>} content='Home' position='right center' inverted/></span></Menu.Item>
                        </Menu.Menu>
                    </Menu.Item>
                </Menu>
            </div>}
            {!!props.username && <div className='mbb-content'>
                <Route path='/document' component={Document} />
                <Route path='/about' component={About} />

                <Route exact path='/' component={Home} />
                <Route path='/profile' component={Profile} />
            </div>}
            {!props.username && <div className='mbb-content'>
                <Route exact path='/' component={Home} />
            </div>}
        </div>
    </div>
);